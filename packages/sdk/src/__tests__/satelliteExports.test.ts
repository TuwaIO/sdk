import { fileURLToPath } from 'node:url';

import ts from 'typescript';
import { describe, expect, it } from 'vitest';

const satelliteEntry = fileURLToPath(new URL('../satellite.ts', import.meta.url));

/**
 * Reads the export names of `src/satellite.ts` and of `@tuwaio/satellite-react` (the module of its named re-export)
 * with the TypeScript type checker, so type-only exports are compared too.
 */
function readExports(): { sdk: string[]; satelliteReact: string[] } {
  const program = ts.createProgram([satelliteEntry], {
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ES2022,
    jsx: ts.JsxEmit.ReactJSX,
    skipLibCheck: true,
    noEmit: true,
  });
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(satelliteEntry);
  if (!sourceFile) throw new Error('src/satellite.ts not found');

  const sdkModule = checker.getSymbolAtLocation(sourceFile);
  const reactExport = sourceFile.statements.find(
    (statement): statement is ts.ExportDeclaration =>
      ts.isExportDeclaration(statement) &&
      !!statement.moduleSpecifier &&
      ts.isStringLiteral(statement.moduleSpecifier) &&
      statement.moduleSpecifier.text === '@tuwaio/satellite-react',
  );
  const reactModule = reactExport?.moduleSpecifier && checker.getSymbolAtLocation(reactExport.moduleSpecifier);
  if (!sdkModule || !reactModule) throw new Error('could not resolve the modules');

  return {
    sdk: checker.getExportsOfModule(sdkModule).map((symbol) => symbol.getName()),
    satelliteReact: checker.getExportsOfModule(reactModule).map((symbol) => symbol.getName()),
  };
}

describe('@tuwaio/sdk/satellite', () => {
  it('re-exports every export of @tuwaio/satellite-react (Connector as SatelliteReactConnector)', () => {
    const { sdk, satelliteReact } = readExports();

    expect(satelliteReact.length).toBeGreaterThan(0);
    const expected = satelliteReact.map((name) => (name === 'Connector' ? 'SatelliteReactConnector' : name));
    expect(expected.filter((name) => !sdk.includes(name))).toEqual([]);
  });
});
