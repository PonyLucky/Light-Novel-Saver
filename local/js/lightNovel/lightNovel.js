import {u} from "../../../vendors/umbrella/umbrella.min";
import {SupportedWebsites} from "./website/website";

/**
 * Light novel class.
 */
export class LightNovel {
    /**
     * Instance of a light novel.
     * @public
     */
    constructor () {
        // Use 'Object.create()' to create a chapter
        this.chapter = {
            position: null,
            title: null,
            content: [],
        };
    }

    /**
     * Set URL of the light novel (the summary / info page).
     * @param {string} url Light novel's url.
     * @throws {TypeError} Invalid URL.
     * @public
     */
    setURL (url) {
        this.url = new URL(url);
        this.metadata = {
            author: null,
            title: null,
            numberOfChapters: null,
        };
        // List of chapter
        this.chapters = [];
    }

    /**
     * Add a chapter.
     * @param {Object} chapter
     * @param {boolean} isCheckingDuplicates
     * @throws {TypeError} Invalid parameters.
     * @public
     */
    addChapter (chapter, isCheckingDuplicates = true) {
        if (Object.getPrototypeOf(chapter) !== this.chapter) throw new TypeError('chapter is invalid');
        if (chapter.position === null) throw new TypeError('position is null');
        if (chapter.title === null) throw new TypeError('title is null');
        if (chapter.content.length === 0) throw new TypeError('content is empty');

        // This check can be fairly long with too many chapters
        if (isCheckingDuplicates) if (this.chapters.some(({position}) => position === chapter.position)) {
            throw new AggregateError('duplicate position');
        }
        this.chapters.push(chapter);
    }

    /**
     * Sort chapters by their position.
     * @public
     */
    sortChapters () {
        this.chapters.sort((a, b) => {
            return a.position - b.position;
        });
    }

    /**
     * Show and update metadata.
     * @throws {TypeError} Invalid parameters.
     * @public
     */
    showMetadata () {
        if (this.metadata.author === null) throw new TypeError('author is null');
        if (this.metadata.title === null) throw new TypeError('title is null');
        if (this.metadata.numberOfChapters === null) throw new TypeError('numberOfChapters is null');

        // Update metadata
        u('#ln-metadata-title').replace(this.metadata.title);
        u('#ln-metadata-author').replace(this.metadata.author);

        // TODO: UpdateSizeInput in CSS

        // Display metadata
        u('#ln-metadata').removeClass('d-none');
    }

    /**
     * Show progression.
     * @param {string} content Content to display alongside the progressbar.
     * @public
     */
    showProgress (content = '') {
        const progressText = u('#ln-progress-text');
        const progressBar = u('#ln-progress-bar');

        // Update
        progressText.replace(
            `<div class="center">${
                content.length === 0 ? `${this.chapters.length} / ${this.metadata.numberOfChapters}` : content
            }</div>`
        );
        progressBar.replace(
            `<div class="progress"><div class="determinate" style="width: ${
                (this.chapters.length / this.metadata.numberOfChapters) * 100
            }%"></div></div>`
        );

        // Show
        progressText.removeClass('d-none');
        progressBar.removeClass('d-none');
    }

    /**
     * Load the light novel.
     * @public
     */
    load () {
        const load = SupportedWebsites[this.url.hostname].load() ?? (() => {
            M.toast({html: 'Select a website'});
        })
        load();
    }
}
