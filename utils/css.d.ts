/**
 * @returns {AsyncGenerator<string>}
 */
export function cssTextGenerator(): AsyncGenerator<string>;
export function css(strings: TemplateStringsArray, ...keys: (string | number | boolean | undefined)[]): string;
