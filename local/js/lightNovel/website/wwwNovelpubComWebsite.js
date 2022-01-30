import {website} from "./website";

export const wwwNovelpubComWebsite = Object.freeze(
    Object.defineProperties(Object.create(website), {
        load: () => {
            // TODO: Complete load()
            console.log('test');

            let nextChapter = '';

            // function to load chapter
            let loadChapter =  (path) => {
                console.log('test: ' + path);
            }
            loadChapter(nextChapter);
        },
    })
);
