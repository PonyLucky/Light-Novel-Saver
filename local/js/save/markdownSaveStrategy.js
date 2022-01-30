import {saveStrategy} from "./saveStrategy";

export const markdownSaveStrategy = Object.freeze(
    Object.defineProperties(Object.create(saveStrategy), {
        startAuthor: (buffer) => {
            buffer.push('By ');
        },
        endAuthor: (buffer) => {
            buffer.push('\n');
        },
        startTitle: (buffer) => {
            buffer.push('# ');
        },
        endTitle: (buffer) => {
            buffer.push('\n');
        },
        startChapters:(buffer) => {
            buffer.push('\n');
        },
        endChapters: (buffer) => {
            buffer.push('---');
        },
        startChapterTitle: (buffer) => {
            buffer.push('## ');
        },
        endChapterTitle: (buffer) => {
            buffer.push('\n');
        },
        endChapterParagraph: (buffer) => {
            buffer.push('\n');
        },
        fileExtension: () => {
            return '.md';
        },
    })
);
