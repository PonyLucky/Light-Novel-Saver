import {website} from "./website.js";
import {lightNovel} from "../../main.js";

/**
 * Support of: 'www.novelpub.com'.
 * @type {Readonly<{parser: function(string): Document, load: function(): never, ajax: function({url: string, success: Function}): void}>}
 * @public
 */
export const wwwNovelpubComWebsite = Object.freeze(
    Object.defineProperties(Object.create(website), {
        /**
         * Load from the website.
         * @public
         */
        load () {
            /**
             * Load a chapter
             * @param {string} path
             */
            let loadChapter = (path) => {
                // TODO: Complete loadChapter()
                console.log('test: ' + path);
            }

            // Load the summary
            this.ajax({
                url: document.getElementsByClassName('ln_url')[0].value,
                success: (response) => {
                    // Get the title of the Light Novel
                    lightNovel.metadata.title = response.querySelector("h1.novel-title").textContent;
                    console.log("Title: "+ln_title);
                    console.log('Test title: '+response.u('h1.novel-title').text())

                    // Get the author
                    lightNovel.metadata.author = response.querySelector('div.author').lastElementChild.firstElementChild.textContent;
                    console.log("Author: "+ln_author);

                    // Get the number of chapters
                    lightNovel.metadata.numberOfChapters = parseInt(
                        response.querySelector('div.header-stats')
                            .querySelector('i.icon-book-open')
                            .nextSibling.nodeValue.trim()
                    );
                    console.log("Number of chapters: "+ln_nb_chapters);

                    // Get the link of the first chapter
                    const nextChapter = response.getElementById('readchapterbtn')
                        .getAttribute('href');

                    // Display the metadata
                    lightNovel.showMetadata();

                    // Load the first chapter
                    loadChapter(nextChapter);
                }
            });
        },
    })
);
