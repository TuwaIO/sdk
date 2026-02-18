'use client';

import dynamic from 'next/dynamic';

const ApiReferenceReact = dynamic(() => import('@scalar/api-reference-react').then((mod) => mod.ApiReferenceReact), {
  ssr: false,
});

export default function ApiReferencePage() {
  return (
    <div className="scalar-container">
      <ApiReferenceReact
        configuration={{
          url: '/openapi.yaml',
          agent: {
            disabled: true,
          },
        }}
      />
    </div>
  );
}
