import {saveStrategy} from "./saveStrategy.js";

/**
 * Strategy for HTML.
 * @public
 */
export const htmlSaveStrategy = Object.freeze(
    Object.defineProperties(Object.create(saveStrategy), {
        /**
         * Strategy to start the file.
         * @param {Array} buffer
         * @public
         */
        start (buffer) {
            buffer.push('<!DOCTYPE html><html>');
        },

        /**
         * Strategy to end the file.
         * @param {Array} buffer
         * @public
         */
        end (buffer) {
            buffer.push('</html>');
        },

        /**
         * Strategy to start the metadata.
         * @param {Array} buffer
         * @public
         */
        startMetadata (buffer) {
            buffer.push("<head><meta charset='utf-8'>");
        },

        /**
         * Strategy to end the metadata.
         * @param {Array} buffer
         * @public
         */
        endMetadata (buffer) {
            buffer.push('</head>');
        },

        /**
         * Strategy to start the author.
         * @param {Array} buffer
         * @public
         */
        startAuthor (buffer) {
            buffer.push("<meta name='author' content='");
        },

        /**
         * Strategy to end the author.
         * @param {Array} buffer
         * @public
         */
        endAuthor (buffer) {
            buffer.push("'>");
        },

        /**
         * Strategy to start the title.
         * @param {Array} buffer
         * @public
         */
        startTitle (buffer) {
            buffer.push('<title>');
        },

        /**
         * Strategy to end the title.
         * @param {Array} buffer
         * @public
         */
        endTitle (buffer) {
            buffer.push('</title>');
        },

        /**
         * Strategy to start the chapters.
         * @param {Array} buffer
         * @public
         */
        startChapters (buffer) {
            buffer.push('<body>');
        },

        /**
         * Strategy to end the chapters.
         * @param {Array} buffer
         * @public
         */
        endChapters (buffer) {
            buffer.push('</body>');
        },

        /**
         * Strategy to start the title of a chapter.
         * @param {Array} buffer
         * @public
         */
        startChapterTitle (buffer) {
            buffer.push('<h1>');
        },

        /**
         * Strategy to end the title of a chapter.
         * @param {Array} buffer
         * @public
         */
        endChapterTitle (buffer) {
            buffer.push('</h1>');
        },

        /**
         * Strategy to start a paragraph.
         * @param {Array} buffer
         * @public
         */
        startChapterParagraph (buffer) {
            buffer.push('<p>');
        },

        /**
         * Strategy to end a paragraph.
         * @param {Array} buffer
         * @public
         */
        endChapterParagraph (buffer) {
            buffer.push('</p>');
        },

        /**
         * Extension of the file (with the dot '.').
         * @return {string}
         * @public
         */
        fileExtension () {
            return '.html';
        },
    })
);
