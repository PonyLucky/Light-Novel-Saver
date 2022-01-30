// Global variables
import {u} from "../../vendors/umbrella/umbrella.min";
import {LightNovel} from "./lightNovel/lightNovel";

export const lightNovel = new LightNovel();

// TODO: Remove everything not useful anymore

// ln_lst[website]
// Dict to call the right function depending of the website
const ln_lst = {
	"lightnovelstranslations.com": function() {
		ln_type_www_lightnovelstranslations_com();
	},
	"www.lightnovelworld.com": function() {
		ln_type_www_lightnovelworld_com();
	},
	"www.novelpub.com": function() {
		// The same so I won't write a second time
		ln_type_www_lightnovelworld_com();
	},
	"none": function() {
		display_toast('Select a website');
	}
};

u(document).ready(() => {
	// Fill .ln-supported
	let keys = Object.keys(ln_lst);
	for (let i = 0; i < keys.length-1; i++) {
		// Create an option from the supported websites
		let option = document.createElement("OPTION");
		option.textContent = keys[i];

		// Append it in the document
		u('.ln-supported').append(option);
	}

	// To enable the select
	// Necessary because of Materialize
	u('.ln-supported').formSelect();

	// Autofocus to the input .ln_url
	u('.ln-url').focus();

	// When pressing 'ENTER' on .ln_url,
	// consider the user wants to load the LN
	u('.ln-url').on('keydown', (e) => {
		if (e.which === 13) ln_load();
	});
	u('.btn-load').on('click', () => {
		ln_load();
	});
});

// When cliking on the button 'LOAD'
function ln_load() {
	// Reset the global variables
	// Useful when reloading a novel right after another
	reset_global_variables();

	// Remove the save button if present
	hideAndEmpty('.ln_download');

	// Remove requirements not completed
	let requirements_icon = 
		document.getElementsByClassName('material-icons')[0];
	//// Remove the class spin
	requirements_icon.classList.remove('spin');
	//// Remove border to the parent div
	requirements_icon.parentNode.parentNode.classList.remove('border-red');

	// If the URL is from a supported website
	if (is_website_supported()) {
		// Load the novel with the allocated function
		ln_lst[ln_type]();
	}
	else {
		if (document.getElementsByClassName('ln_url')[0].value === "")
			display_toast('Insert an URL');
		else
			display_toast("This website isn't implemented yet");
	}
}

// Displays the save button to download the LN
function display_save_button() {
	let elm = u('.ln-download');

	// Remove the progress text
	hideAndEmpty('#ln-progress-text #ln-progress-bar');

	// Show the save button
	elm.removeClass('d-none');

	// Authorize the download now that the proccess is finished
	const btn = document.createElement("BUTTON");
	btn.innerText = 'Save the Light Novel';
	btn.className = "waves-effect waves-light btn";
	btn.setAttribute('onclick', 'ln_download();');
	elm.append(btn);

	// Auto-launch the download
	btn.click();
}

// Displays the progressBar
function display_progress_bar() {
	const elm = u('#ln-progress-bar');

	// Update progress
	elm.replace(
		`<div class="progress"><div class="determinate" style="width: ${
			(lightNovel.chapters.length / lightNovel.metadata.numberOfChapters) * 100
		}%"></div></div>`
	);

	// Show the progressBar
	elm.removeClass('d-none');
}

// Prepare the file to download
function ln_download() {
	// Local variables
	let ln_data, ln_download_triger, ln_file;

	// To take what the user wrote in the inputs
	let ln_title = u('#ln-metadata-title').attr('value');
	let ln_author = u('#ln-metadata-author').attr('value');

	// Format the file
	ln_data =
	"<!DOCTYPE html>\n<html>\n<head>\n<meta charset='utf-8'>"
		+(ln_title  != "" ? "\n<title>"+ln_title.trim()+"</title>" : "")
		+(ln_author != "" ? "\n<meta name='author' content='"
			+ln_author+"'>" : "")
		+"\n</head>\n<body>\n"
		+ln_content
		+"\n</body>\n</html>";
	ln_download_triger = document.createElement("a");
	ln_download_triger.download = ln_title.trim()+".html";

	ln_file = new Blob([ln_data], {
	type: "text/plain"
	});
	ln_download_triger.href = window.URL.createObjectURL(ln_file);
	ln_download_triger.click();
}

// Remove the element is present
function hideAndEmpty (cssSelector) {
	let elm = u(cssSelector);
	elm.addClass('d-none');
	elm.empty();
}

// Display a toast
export function toast (str, is_error = false) {
	M.toast({
		html: str,
		classes: is_error ? 'red' : '',
	});
}
