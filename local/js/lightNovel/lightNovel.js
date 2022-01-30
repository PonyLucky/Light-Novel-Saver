import {u} from "../../../vendors/umbrella/umbrella.min";
import {toast} from "../main";
import {lightnovelstranslationsComWebsite} from "./website/lightnovelstranslationsComWebsite";
import {wwwLightnovelworldComWebsite} from "./website/wwwLightnovelworldComWebsite";
import {wwwNovelpubComWebsite} from "./website/wwwNovelpubComWebsite";

// TODO: class to object
export class LightNovel {
    constructor () {
        // Use 'Object.create()' to create a chapter
        this.chapter = {
            position: null,
            title: null,
            content: [],
        };
    }
    setURL (url) {
        this.url = new URL(url.toString());
        this.metadata = {
            author: null,
            title: null,
            numberOfChapters: null,
        };
        // List of chapter
        this.chapters = [];
    }
    addChapter (chapter, isCheckingDuplicates = true) {
        if (Object.getPrototypeOf(chapter) !== this.chapter) {
            throw('Invalid parameter: not prototype of chapter');
        }
        if (chapter.position === null) throw('Invalid property: position is null');
        if (chapter.title === null) throw('Invalid property: title is null');
        if (chapter.content.length === 0) throw('Invalid property: content is null');

        // This check can be fairly long with too many chapters
        if (isCheckingDuplicates) if (this.chapters.some(({position}) => position === chapter.position)) {
            throw('Invalid property: duplicate position');
        }
        this.chapters.push(chapter);
    }
    sortChapters () {
        this.chapters.sort((a, b) => {
            return a.position - b.position;
        });
    }
    showMetadata () {
        if (this.metadata.author === null) throw('Invalid property: author is null');
        if (this.metadata.title === null) throw('Invalid property: title is null');
        if (this.metadata.numberOfChapters === null) throw('Invalid property: numberOfChapters is null');

        // Update metadata
        u('#ln-metadata-title').replace(this.metadata.title);
        u('#ln-metadata-author').replace(this.metadata.author);

        // TODO: UpdateSizeInput in CSS

        // Display metadata
        u('#ln-metadata').removeClass('d-none');
    }
    showProgress (content = null) {
        const progressText = u('#ln-progress-text');
        const progressBar = u('#ln-progress-bar');

        // Update
        progressText.replace(
            `<div class="center">${
                content === null ? `${this.chapters.length} / ${this.metadata.numberOfChapters}` : content
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
    load () {
        switch (this.url.hostname) {
            case 'lightnovelstranslations.com':
                lightnovelstranslationsComWebsite.load();
                break;
            case 'www.lightnovelworld.com':
                wwwLightnovelworldComWebsite.load();
                break;
            case 'www.novelpub.com':
                wwwNovelpubComWebsite.load();
                break;
            default:
                toast('Select a website');
        }
    }
}
