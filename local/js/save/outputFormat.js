import {htmlSaveStrategy} from "./htmlSaveStrategy.js";
import {markdownSaveStrategy} from "./markdownSaveStrategy.js";

/**
 * Supported output format.
 * @public
 */
export const OutputFormat = Object.freeze({
    html: htmlSaveStrategy,
    markdown: markdownSaveStrategy,
});