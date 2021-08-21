// Global variables
var ln_title="", ln_content="", ln_author= "",
ln_nb_chapters=0, ln_nb_chapters_loaded=1;

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
		display_toast("Select a website");
	}
};

// The enable the select
// Necessary because of Materialize
$(document).ready(function(){
	$('select').formSelect();
});

// When cliking on the button 'LOAD'
function ln_load() {
	let type_ln = document.getElementById('ln_type').value;

	// Reset the global variables
	// Useful when reloading a novel right after another
	reset_global_variables();

	// Remove the save button if present
	remove_element('ln_download');

	// Remove requirements not completed
	let requirements_icon = document.getElementsByClassName('material-icons')[0];
	//// Remove the class spin
	requirements_icon.classList.remove('spin');
	//// Remove border to the parent div
	requirements_icon.parentNode.parentNode.classList.remove('border-red');

	// If the selected domain is present in the URL
	if (document.getElementById('ln_url').value.includes(type_ln)) {
		// Just a check if I forgot to update 'ln_lst'
		if (ln_lst[type_ln]) {
			// And then load the novel with the allocated function
			ln_lst[type_ln]();
		}
		else {
			console.error("ln_load() -> ln_lst[\""+type_ln+"\"]: invalid value");
			display_toast(
				"<i class='material-icons'>info</i>"
				+" This website isn't fully implemented yet",
				true
			);
		}
	}
	else {
		if (document.getElementById('ln_url').value == "")
			display_toast("Insert an URL");
		else
			display_toast("Insert a page of the chosen website");
	}
}

// Displays the save button to download the LN
function display_save_button() {
	let elmt = document.getElementById('ln_download');

	// Show the save button
	elmt.classList.remove('d-none');

	// Authorize the download now that the proccess is finished
	var btn = document.createElement("BUTTON");
	btn.innerHTML = "Save the Light Novel";
	btn.className = "waves-effect waves-light btn";
	btn.setAttribute('onclick', 'ln_download();');
	elmt.appendChild(btn);
}

// To parse a formal String to an HTML document
// Makes it easier to move to the wanted content
function html_parser(str) {
	let parser = new DOMParser();
	return parser.parseFromString(str,"text/html");
}

// Displays the progressBar
function display_progress_bar() {
	let elmt = document.getElementById('ln_progress_bar');

	// Show the progressBar
	elmt.classList.remove('d-none');

	// If the progressBar isn't here, create her
	if (!elmt.hasChildNodes()) {
		// Main progressBar
		let progress_bar = document.createElement("DIV");
		progress_bar.className = "progress";

		// Sub-progressBar
		let sub_progress_bar = document.createElement("DIV");
		sub_progress_bar.className = "determinate";
		sub_progress_bar.setAttribute(
			'style', 'width: '
			+((ln_nb_chapters_loaded / ln_nb_chapters)*100)
			+'%'
		);

		// Append in the document
		progress_bar.appendChild(sub_progress_bar);
		elmt.appendChild(progress_bar);
	}
	else document.querySelector('div.determinate').setAttribute(
		'style', 'width: '
		+((ln_nb_chapters_loaded / ln_nb_chapters)*100)
		+'%'
	);
}

// Prepare the file to download
function ln_download() {
	// Local variables
	let ln_data, ln_download_triger, ln_file;

	// If input author isn't null
	// If you want to force one because your ebook can't bear asian chars
	if (document.getElementById('ln_author').value != "") {
		ln_author = document.getElementById('ln_author').value;
	}

	// Remove the progressBar
	remove_element('ln_progress_bar');

	// Remove the save button if present
	remove_element('ln_download');

	// Show the SAVE button
	// 
	// In case the user cancel the download inadvertently
	// but don't want to reload everything
	display_save_button();

	// Format the file
	ln_data =
	"<!DOCTYPE html>\n<html>\n<head>\n<meta charset='utf-8'>"
		+(ln_title  != "" ? "\n<title>"+ln_title.trim()+"</title>"                  : "")
		+(ln_author != "" ? "\n<meta name='author' content='"+ln_author+"'>" : "")
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

function reset_global_variables() {
	ln_title="";
	ln_content="";
	ln_nb_chapters=0;
	ln_nb_chapters_loaded=1;
}

// Remove the element is present
function remove_element(id) {
	let elmt = document.getElementById(id);

	// Hide the element
	elmt.classList.add('d-none');

	if (elmt.hasChildNodes()) {
		elmt.firstChild.remove();
	}
}

// Display a toast
function display_toast(str, is_error=false) {
	let content = {html: str};

	// Add the class if error
	if (is_error) content.classes = "red";

	// Display it
	M.toast(content);
}

function bad_request(is_CORS_error=false) {
	if (is_CORS_error) {
		console.error("Install the extension");

		// Spin the requirements icon and scroll to it
		let requirements_icon =
			document.getElementsByClassName('material-icons')[0];

		// Scroll to the requirements icon
		requirements_icon.scrollIntoView();
		// Spin it so the user will understand
		requirements_icon.classList.add('spin');

		// Add border to the parent div
		requirements_icon.parentNode.parentNode.classList.add('border-red');
	}
	else console.error("The chapter couldn't be loaded");
}
