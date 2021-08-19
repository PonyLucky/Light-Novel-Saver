// Global variables
var ln_title="", ln_content="";

var ln_lst = {
	"www.lightnovelstranslations.com": [
		function() {
			ln_type_www_lightnovelstranslations_com();
		},
		"Insert the root page of the Light Novel"
	],
	"www.lightnovelworld.com": [
		function() {
			ln_type_www_lightnovelworld_com();
		},
		"Insert the first chapter of the Light Novel"
	],
	"none": [
		function() {
			M.toast({html: "Select a website"});
		},
		"First choose a website"
	]
};

// The enable the select
// Necessary because of Materialize
$(document).ready(function(){
	$('select').formSelect();
});

// When cliking on the button 'LOAD'
function ln_load() {
	let type_ln = document.getElementById('ln_type').value;

	// If the selected domain is present in the URL
	if (document.getElementById('ln_url').value.includes(type_ln)) {

		// Just a check if I forgot to update 'ln_lst'
		if (ln_lst[type_ln]) {
			// And then load the novel with the allocated function
			ln_lst[type_ln][0];
		}
		else {
			console.error("ln_load() -> ln_lst[\""+type_ln+"\"]: invalid value");
			M.toast({
				html: "<i class='material-icons'>info</i>"
					+" This website isn't fully implemented yet",
				classes: "red"
			});
		}
	}
	else {
		if (document.getElementById('ln_url').value == "") M.toast({html: "Insert an URL"});
		else M.toast({html: "Insert a page of the chosen website"});
	}
}

// Triggered by the event 'onchange' of the select
// Used to change the placeholder of #ln_url
function ln_type() {
	let type_ln = document.getElementById('ln_type').value;

	// Just a check if I forgot to update 'ln_lst'
	if (ln_lst[type_ln]) {
		// Set the placehorder and the title in function of the website
		document.getElementById('ln_url').placeholder = ln_lst[type_ln][1];
		document.getElementById('ln_url').setAttribute('title', ln_lst[type_ln][1]);
	}
	else  console.error("ln_type() -> ln_lst[\""+type_ln+"\"]: invalid value");
}

function display_save_button() {
	// Authorize the download now that the proccess is finished
	var btn = document.createElement("BUTTON");
	btn.innerHTML = "Save the Light Novel";
	btn.className = "waves-effect waves-light btn";
	btn.setAttribute('onclick', 'ln_download();');
	document.getElementById('ln_download').appendChild(btn);
}

// To parse a formal String to an HTML document
// Makes it easier to move to the wanted content
function html_parser(str) {
	let parser = new DOMParser();
	return parser.parseFromString(str,"text/html");
}

// Prepare the file to download
function ln_download() {
	// Local variables
	let ln_author = document.getElementById('ln_author').value,
		ln_data, ln_download_triger, ln_file;

	// Format the file
	ln_data =
	"<!DOCTYPE html>\n<html>\n<head>\n<meta charset='utf-8'>"
		+(ln_title  != "" ? "\n<title>"+ln_title+"</title>"                  : "")
		+(ln_author != "" ? "\n<meta name='author' content='"+ln_author+"'>" : "")
		+"\n</head>\n<body>\n"
		+ln_content
		+"\n</body>\n</html>";
	ln_download_triger = document.createElement("a");
	ln_download_triger.download = ln_title+".html";

	ln_file = new Blob([ln_data], {
	type: "text/plain"
	});
	ln_download_triger.href = window.URL.createObjectURL(ln_file);
	ln_download_triger.click();
}