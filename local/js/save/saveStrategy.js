import {htmlSaveStrategy} from "./htmlSaveStrategy";
import {markdownSaveStrategy} from "./markdownSaveStrategy";

/**
 * Supported output format.
 * @public
 */
export const OutputFormat = Object.freeze({
    html: htmlSaveStrategy,
    markdown: markdownSaveStrategy,
});

/**
 * Abstract strategy for save file.
 * @constructor
 * @type {{endChapters: saveStrategy.endChapters, startChapterTitle: saveStrategy.startChapterTitle, endChapterParagraph: saveStrategy.endChapterParagraph, endAuthor: saveStrategy.endAuthor, endTitle: saveStrategy.endTitle, endMetadata: saveStrategy.endMetadata, startChapterParagraph: saveStrategy.startChapterParagraph, start: saveStrategy.start, endChapterTitle: saveStrategy.endChapterTitle, startTitle: saveStrategy.startTitle, startMetadata: saveStrategy.startMetadata, startAuthor: saveStrategy.startAuthor, fileExtension: (function(): string), end: saveStrategy.end, startChapters: saveStrategy.startChapters}}
 * @public
 */
export const saveStrategy = {
    /**
     * Strategy to start the file.
     * @param {Array} buffer
     * @public
     */
    start: (buffer) => {},

    /**
     * Strategy to end the file.
     * @param {Array} buffer
     * @public
     */
    end: (buffer) => {},

    /**
     * Strategy to start the metadata.
     * @param {Array} buffer
     * @public
     */
    startMetadata: (buffer) => {},

    /**
     * Strategy to end the metadata.
     * @param {Array} buffer
     * @public
     */
    endMetadata: (buffer) => {},

    /**
     * Strategy to start the author.
     * @param {Array} buffer
     * @public
     */
    startAuthor: (buffer) => {},

    /**
     * Strategy to end the author.
     * @param {Array} buffer
     * @public
     */
    endAuthor: (buffer) => {},

    /**
     * Strategy to start the title.
     * @param {Array} buffer
     * @public
     */
    startTitle: (buffer) => {},

    /**
     * Strategy to end the title.
     * @param {Array} buffer
     * @public
     */
    endTitle: (buffer) => {},

    /**
     * Strategy to start the chapters.
     * @param {Array} buffer
     * @public
     */
    startChapters: (buffer) => {},

    /**
     * Strategy to end the chapters.
     * @param {Array} buffer
     * @public
     */
    endChapters: (buffer) => {},

    /**
     * Strategy to start the title of a chapter.
     * @param {Array} buffer
     * @public
     */
    startChapterTitle: (buffer) => {},

    /**
     * Strategy to end the title of a chapter.
     * @param {Array} buffer
     * @public
     */
    endChapterTitle: (buffer) => {},

    /**
     * Strategy to start a paragraph.
     * @param {Array} buffer
     * @public
     */
    startChapterParagraph: (buffer) => {},

    /**
     * Strategy to end a paragraph.
     * @param {Array} buffer
     * @public
     */
    endChapterParagraph: (buffer) => {},

    /**
     * Extension of the file (with the dot '.').
     * @return {string}
     * @public
     */
    fileExtension: () => { return ''; },
}
