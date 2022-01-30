import {u} from "../../../../vendors/umbrella/umbrella.min";
import {lightnovelstranslationsComWebsite} from "./lightnovelstranslationsComWebsite";
import {wwwLightnovelworldComWebsite} from "./wwwLightnovelworldComWebsite";
import {wwwNovelpubComWebsite} from "./wwwNovelpubComWebsite";

// TODO: Use of WebSocket to fasten the download
// https://javascript.info/websocket

/**
 * Supported websites.
 * @public
 */
export const SupportedWebsites = Object.freeze({
    "lightnovelstranslations.com": lightnovelstranslationsComWebsite,
    "www.lightnovelworld.com": wwwLightnovelworldComWebsite,
    "www.novelpub.com": wwwNovelpubComWebsite,
});

/**
 * Abstract website.
 * @type {{parser: (function(string): Document), load: ((function(): never)|*), ajax: website.ajax}}
 * @public
 */
export const website = {
    /**
     * Parse a string into DOM elements.
     * @param {string} content
     * @returns {Document}
     * @private
     */
    parser: (content) => {
        return (new DOMParser()).parseFromString(content,"text/html");
    },

    /**
     * AJAX queries to servers.
     * @param {string} url
     * @param {function} success
     * @protected
     */
    ajax: ({url, success}) => {
        // Check parameters
        if (url === undefined) throw('url must be declared');
        if (success === undefined) throw('success must be declared');

        const httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    success(this.parser(httpRequest.response));
                }
                else {
                    console.log('HTTP error code is: '+httpRequest.status);

                    // TODO: watch status error
                    if (httpRequest.status !== 200) {
                        console.error("Install the extension");

                        u('#requirement-icon').addClass('spin');
                        u('#requirement').addClass('border-red').scroll();
                    }
                }
            }
        };
        httpRequest.open('GET', url);
        httpRequest.send();
    },

    /**
     * Load from the website.
     * @public
     */
    load: () => {
        throw ('Website not supported');
    },
};
