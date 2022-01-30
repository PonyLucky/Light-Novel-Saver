import {u} from "../../vendors/umbrella/umbrella.min";
import {LightNovel} from "./lightNovel/lightNovel";
import {save} from "./save/save";
import {SupportedWebsites} from "./lightNovel/website/website";

// Global variables
export const lightNovel = new LightNovel();

// TODO: Remove everything not useful anymore

u(document).ready(() => {
	// Fill #ln-supported
	u('#ln-supported').append(
		ws => `<option>${ws}</option>`,
		Object.keys(SupportedWebsites)
	);

	// To enable the select.
	// Necessary because of Materialize
	//supportedInput.first().formSelect();

	let urlInput = u('#ln-url');

	// Autofocus to the input .ln_url
	urlInput.focus();

	// When pressing 'ENTER' on .ln_url,
	// consider the user wants to load the LN
	urlInput.on('keydown', (e) => {
		if (e.which === 13) ln_load();
	});

	u('#btn-load').on('click', () => {
		ln_load();
	});
});

// When cliking on the button 'LOAD'
function ln_load() {
	// Reset the global variables
	// Useful when reloading a novel right after another
	reset_global_variables();

	// Remove the save button if present
	u('#ln-download').addClass('d-none').empty();

	// Reset display of requirement
	u('#requirement-icon').removeClass('spin');
	u('#requirement').removeClass('border-red').scroll();

	// If the URL is from a supported website
	if (is_website_supported()) {
		// Load the novel with the allocated function
		ln_lst[ln_type]();
	}
	else {
		if (u('#ln-url').attr('value') === '') toast('Insert an URL');
		else toast("This website isn't implemented yet");
	}
}

// Displays the save button to download the LN
function display_save_button() {
	let elm = u('.ln-download');

	// Remove the progress text
	let progress = u('#ln-progress-text #ln-progress-bar');
	progress.addClass('d-none').empty();

	// Show the save button
	elm.removeClass('d-none');

	// Authorize the download now that the proccess is finished
	const btn = u('<button class="waves-effect waves-light btn">Save the Light Novel</button>');
	btn.on('click', () => {
		ln_download();
	});
	elm.append(btn);

	// Auto-launch the download
	btn.click();
}

// Display a toast
function toast (str, is_error = false) {
	M.toast({
		html: str,
		classes: is_error ? 'red' : '',
	});
}
