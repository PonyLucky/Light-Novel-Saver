export const OutputFormat = Object.freeze({
    html: 0,
    markdown: 1,
});

// Abstract object
export const saveStrategy = {
    start: (buffer) => {},
    end: (buffer) => {},
    startMetadata: (buffer) => {},
    endMetadata: (buffer) => {},
    startAuthor: (buffer) => {},
    endAuthor: (buffer) => {},
    startTitle: (buffer) => {},
    endTitle: (buffer) => {},
    startChapters: (buffer) => {},
    endChapters: (buffer) => {},
    startChapterTitle: (buffer) => {},
    endChapterTitle: (buffer) => {},
    startChapterParagraph: (buffer) => {},
    endChapterParagraph: (buffer) => {},
    fileExtension: () => { return ''; },
}
