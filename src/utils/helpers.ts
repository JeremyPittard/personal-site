/**
 * Cleans a string to create a URL-friendly slug:
 * - Converts to lowercase.
 * - Removes punctuation.
 * - Replaces spaces with hyphens.
 *
 * @param {string} str The input string to clean.
 * @returns {string} The cleaned, slug-ready string.
 */
export const createSlug = (string: string) => {
  if (!string) {
    return "";
  }

  return (
    string
      // 1. Convert to lowercase
      .toLowerCase()

      // 2. Remove all punctuation and symbols (using a common regex pattern)
      // The pattern /[.,\/#!$%\^&\*;:{}=\-_`~()]/g matches many symbols.
      // A broader approach like /\s/g (to handle accented chars later) is often better,
      // but the following is good for standard English.
      .replace(/[^\w\s-]/g, "") // Remove all non-word characters except hyphens and spaces

      // 3. Replace all remaining whitespace with a hyphen
      .replace(/\s+/g, "-")

      // 4. Trim leading/trailing hyphens/spaces (important if the original string started or ended with punctuation)
      .replace(/^-+|-+$/g, "")
  );
};
