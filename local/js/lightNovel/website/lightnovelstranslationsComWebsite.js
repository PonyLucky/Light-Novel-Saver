import {website} from "./website.js";
import {lightNovel} from "../../main.js";

/**
 * Support of: 'lightnovelstranslations.com'.
 * @type {Readonly<{parser: function(string): Document, load: function(): never, ajax: function({url: string, success: Function}): void}>}
 * @public
 */
export const lightnovelstranslationsComWebsite = Object.freeze(
    Object.defineProperties(Object.create(website), {
        /**
         * Load from the website.
         * @public
         */
        load () {
            this.ajax({
                url: lightNovel.url.toString(),
                success: (response) => {

                }
            });

            let nextChapter = '';

            /**
             * Load a chapter
             * @param {string} path
             */
            let loadChapter =  (path) => {
                console.log('test: ' + path);
            }
            loadChapter(nextChapter);
        },
    })
);
