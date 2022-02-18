import {OutputFormat} from "./outputFormat.js";
import {lightNovel} from "../main.js";

export const save = Object.freeze({
    /**
     * Set outputFormat.
     * 'html' by default.
     * @param {number} format
     * @public
     */
    setOutputFormat (format) {
        this.saveStrategy = OutputFormat[format] ?? OutputFormat.html;
    },
    /**
     * Download the loaded light novel.
     * @return {Promise<void>}
     * @throws {TypeError} No outputFormat.
     * @public
     */
     async download () {
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
        else throw new TypeError('no outputFormat');
    },
    /**
     * Clear the buffer.
     * @private
     */
    clear () {
        this.buffer = [];
    },
});
