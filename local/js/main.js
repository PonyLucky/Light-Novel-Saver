// Global variables
var ln_title="", ln_content="", ln_author= "",
ln_nb_chapters=0, ln_nb_chapters_loaded=1,
ln_type="";

lang_lst = {
	en: {
		1: "Select a website",
		2: "This website isn't fully implemented yet",
		3: "Insert an URL",
		4: "This website isn't implemented yet",
		5: "Save the Light Novel",
	},
	fr: {
		1: "Choisissez un site",
		2: "Ce site n'est encore complétement implémenté",
		3: "Insérez un URL",
		4: "Ce site n'est pas encore implémenté",
		5: "Sauvegarder le roman",
	}
}

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
		display_toast(lang_lst[lang][1]);
	}
};

let ln_supported = document.getElementsByClassName('ln_supported')[0];
$(document).ready(function(){
	// Fill .ln_supported
	let keys = Object.keys(ln_lst);
	for (let i = 0; i < keys.length-1; i++) {
		// Create an option from the supported websites
		let option = document.createElement("OPTION");
		option.innerHTML = keys[i];

		// Append it in the document
		$('.ln_supported').append(option);
	}

	// To enable the select
	// Necessary because of Materialize
	$('.ln_supported').formSelect();

	// Autofocus to the input .ln_url
	$('.ln_url').focus();

	// When pressing 'ENTER' on .ln_url,
	// consider the user wants to load the LN
	$('.ln_url').keydown(function(e) {
		if (e.which == 13) ln_load();
	});
});

// When cliking on the button 'LOAD'
function ln_load() {
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

	// If the URL is from a supported website
	if (is_website_supported()) {
		// Load the novel with the allocated function
		ln_lst[ln_type]();
	}
	else {
		if (document.getElementsByClassName('ln_url')[0].value == "")
			display_toast(lang_lst[lang][3]);
		else
			display_toast(lang_lst[lang][4]);
	}
}

// Displays the save button to download the LN
function display_save_button() {
	let elmt = document.getElementsByClassName('ln_download')[0];

	// Remove the progressBar
	remove_element('ln_progress_bar');

	// Show the save button
	elmt.classList.remove('d-none');

	// Authorize the download now that the proccess is finished
	var btn = document.createElement("BUTTON");
	btn.innerHTML = lang_lst[lang][5];
	btn.className = "waves-effect waves-light btn";
	btn.setAttribute('onclick', 'ln_download();');
	elmt.appendChild(btn);

	// Auto-launch the download
	btn.click();
}

// To parse a formal String to an HTML document
// Makes it easier to move to the wanted content
function html_parser(str) {
	let parser = new DOMParser();
	return parser.parseFromString(str,"text/html");
}

// Displays the progressBar
function display_progress_bar() {
	let elmt = document.getElementsByClassName('ln_progress_bar')[0];

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
function remove_element(class_of_element) {
	let elmt = document.getElementsByClassName(class_of_element)[0];

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

// Return 'true' if a supported website is recognised
function is_website_supported() {
	let ln_url = document.getElementsByClassName('ln_url')[0].value;
	let keys = Object.keys(ln_lst);

	for (let i = 0; i < keys.length; i++) {
		if (ln_url.includes(keys[i])) {
			ln_type = keys[i];
			console.log(ln_type);
			return true;
		}
	}
	return false;
}

function display_metadata() {
	document.getElementsByClassName('ln_matadata')[0].classList.remove('d-none');

	// Set the title if possible
	if (typeof ln_title == "string") {
		document.getElementsByClassName('ln_title')[0].value = ln_title;
	}

	// Set the author if possible
	if (typeof ln_author == "string") {
		document.getElementsByClassName('ln_author')[0].value = ln_author;
	}

	// Set the size of the inputs
	set_size_input('ln_title');
	set_size_input('ln_author');
}

// Set the size of the input depending of its content
function set_size_input(class_of_element) {
	let elmt = document.getElementsByClassName(class_of_element)[0];
	let dummy_span = document.getElementById('dummy_span');

	// If value insert it to the dummy span
	if (elmt.value.length > 0) {
		dummy_span.innerHTML = elmt.value;
	}
	else {
		dummy_span.innerHTML = elmt.placeholder;
	}

	// An element with 'display: none;' doesn't have a width
	// Hence we need to display him
	dummy_span.parentNode.classList.remove('d-none');

	elmt.setAttribute(
		'style',
		'width: ' + dummy_span.offsetWidth + 'px !important;'
	);

	dummy_span.parentNode.classList.add('d-none');
}
