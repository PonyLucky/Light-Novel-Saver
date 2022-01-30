import {u} from "../../../../vendors/umbrella/umbrella.min";

// Abstract website
export const website = {
    parser: (content) => {
        return (new DOMParser()).parseFromString(content,"text/html");
    },
    errRequest: (status) => {
        console.log(status);

        // TODO: watch status error
        if (status) {
            console.error("Install the extension");

            u('#requirement-icon').addClass('spin');
            u('#requirement').addClass('border-red').scroll();
        }
    },
    load: () => {
        throw ('Website not supported');
    },
};
