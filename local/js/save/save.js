import {OutputFormat} from "./saveStrategy";
import {htmlSaveStrategy} from "./htmlSaveStrategy";
import {markdownSaveStrategy} from "./markdownSaveStrategy";
import {lightNovel} from "../main";

export const save = Object.freeze({
    setOutputFormat: (format) => {
        switch (format) {
            case OutputFormat.html:
                this.saveStrategy = htmlSaveStrategy;
                break;
            case OutputFormat.markdown:
                this.saveStrategy = markdownSaveStrategy;
                break;
        }
    },
    download: async () => {
        this.clear();

        if (this.hasOwnProperty('saveStrategy')) {
            this.saveStrategy.start(this.buffer);

            this.saveStrategy.startMetadata(this.buffer);
            this.saveStrategy.startTitle(this.buffer);
            this.buffer.push(lightNovel.metadata.title);
            this.saveStrategy.endTitle(this.buffer);
            this.saveStrategy.startAuthor(this.buffer);
            this.buffer.push(lightNovel.metadata.author);
            this.saveStrategy.endAuthor(this.buffer);
            this.saveStrategy.endMetadata(this.buffer);

            this.saveStrategy.startChapters(this.buffer);
            for (const chapter of lightNovel.chapters) {
                this.saveStrategy.startChapterTitle(this.buffer);
                this.buffer.push(chapter.title);
                this.saveStrategy.endChapterTitle(this.buffer);

                for (const paragraph of chapter.content) {
                    this.saveStrategy.startChapterParagraph(this.buffer);
                    this.buffer.push(paragraph);
                    this.saveStrategy.endChapterParagraph(this.buffer);
                }
            }
            this.saveStrategy.endChapters(this.buffer);

            this.saveStrategy.end(this.buffer);

            // Create a button to trigger the download
            const dlTrigger = document.createElement("a");
            dlTrigger.download = lightNovel.metadata.title + this.saveStrategy.fileExtension();
            dlTrigger.href = URL.createObjectURL(new Blob([this.buffer.join()], {type: "text/plain"}));
            dlTrigger.click();
        }
        else throw('Property error: no outputFormat');
    },
    clear: () => {
        this.buffer = [];
    },
});
