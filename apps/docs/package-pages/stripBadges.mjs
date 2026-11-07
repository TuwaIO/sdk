// @ts-check
/**
 * @file Removes the badges of the package READMEs from the generated pages.
 *
 * A README starts with badge images (`img.shields.io`). GitHub and npm show them through their own image proxies, but
 * on the docs site every reader's browser would load them from the badge host, which then gets the reader's IP address
 * (Cookie and Privacy policies). The READMEs keep their badges; only the generated pages drop them.
 */

/** A line holding only linked badge images from a badge host. */
const BADGE_LINE_PATTERN =
  /^(?:\[!\[[^\]]*\]\(https:\/\/(?:img\.shields\.io|badge\.socket\.dev|socket\.dev)\/[^)]*\)\]\([^)]*\)\s*)+\n(?:\s*\n)?/gm;

/**
 * Removes the lines of badge images from Markdown, with the blank line after them.
 *
 * @param {string} contents - Markdown of a page or a README.
 * @returns {string} The Markdown without badge lines.
 */
export function stripBadges(contents) {
  return contents.replace(BADGE_LINE_PATTERN, '');
}
