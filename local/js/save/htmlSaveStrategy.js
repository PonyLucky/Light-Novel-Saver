import {saveStrategy} from "./saveStrategy";

export const htmlSaveStrategy = Object.freeze(
    Object.defineProperties(Object.create(saveStrategy), {
        start: (buffer) => {
            buffer.push('<!DOCTYPE html><html>');
        },
        end: (buffer) => {
            buffer.push('</html>');
        },
        startMetadata: (buffer) => {
            buffer.push("<head><meta charset='utf-8'>");
        },
        endMetadata: (buffer) => {
            buffer.push('</head>');
        },
        startAuthor: (buffer) => {
            buffer.push("<meta name='author' content='");
        },
        endAuthor: (buffer) => {
            buffer.push("'>");
        },
        startTitle: (buffer) => {
            buffer.push('<title>');
        },
        endTitle: (buffer) => {
            buffer.push('</title>');
        },
        startChapters: (buffer) => {
            buffer.push('<body>');
        },
        endChapters: (buffer) => {
            buffer.push('</body>');
        },
        startChapterTitle: (buffer) => {
            buffer.push('<h1>');
        },
        endChapterTitle: (buffer) => {
            buffer.push('</h1>');
        },
        startChapterParagraph: (buffer) => {
            buffer.push('<p>');
        },
        endChapterParagraph: (buffer) => {
            buffer.push('</p>');
        },
        fileExtension: () => {
            return '.html';
        },
    })
);
