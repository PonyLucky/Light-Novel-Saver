import {saveStrategy} from "./saveStrategy.js";

/**
 * Strategy for MarkDown
 * @public
 */
export const markdownSaveStrategy = Object.freeze(
    Object.defineProperties(Object.create(saveStrategy), {
        /**
         * Strategy to start the author.
         * @param {Array} buffer
         * @public
         */
        startAuthor (buffer) {
            buffer.push('By ');
        },

        /**
         * Strategy to end the author.
         * @param {Array} buffer
         * @public
         */
        endAuthor (buffer) {
            buffer.push('\n');
        },

        /**
         * Strategy to start the title.
         * @param {Array} buffer
         * @public
         */
        startTitle (buffer) {
            buffer.push('# ');
        },

        /**
         * Strategy to end the title.
         * @param {Array} buffer
         * @public
         */
        endTitle (buffer) {
            buffer.push('\n');
        },

        /**
         * Strategy to start the chapters.
         * @param {Array} buffer
         * @public
         */
        startChapters(buffer) {
            buffer.push('\n');
        },

        /**
         * Strategy to end the chapters.
         * @param {Array} buffer
         * @public
         */
        endChapters (buffer) {
            buffer.push('---');
        },

        /**
         * Strategy to start the title of a chapter.
         * @param {Array} buffer
         * @public
         */
        startChapterTitle (buffer) {
            buffer.push('## ');
        },

        /**
         * Strategy to end the title of a chapter.
         * @param {Array} buffer
         * @public
         */
        endChapterTitle (buffer) {
            buffer.push('\n');
        },

        /**
         * Strategy to end a paragraph.
         * @param {Array} buffer
         * @public
         */
        endChapterParagraph (buffer) {
            buffer.push('\n');
        },

        /**
         * Extension of the file (with the dot '.').
         * @return {string}
         * @public
         */
        fileExtension () {
            return '.md';
        },
    })
);
