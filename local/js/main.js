// Global variables
var ln_title="", ln_content="";

// The enable the select
// Necessary because of Materialize
$(document).ready(function(){
	$('select').formSelect();
});

// When cliking on the button 'LOAD'
function ln_load() {
	let elmt = document.getElementById('ln_type').value;

	// If the selected domain is present in the URL
	if (document.getElementById('ln_url').value.includes(elmt)) {
		// And then load the novel with the allocated function
		switch (elmt) {
			case "www.lightnovelstranslations.com":
				ln_type_www_lightnovelstranslations_com();
				break;
			case "www.lightnovelworld.com":
				ln_type_www_lightnovelworld_com();
				break;
			default:
				M.toast({html: "Select a domain"});
		}
	}
	else {
		if (document.getElementById('ln_url').value == "") M.toast({html: "Insert an URL"});
		else M.toast({html: "Insert an URL with the right domain<br>(www.'domain'.com)"});
	}
}

// Triggered by the event 'onchange' of the select
// Used to change the placeholder of #ln_url
function ln_type() {
	let elmt = document.getElementById('ln_type').value;

	switch (elmt) {
		case "www.lightnovelstranslations.com":
			document.getElementById('ln_url').placeholder = "Insert the root page of the Light Novel";
			break;
		case "www.lightnovelworld.com":
			document.getElementById('ln_url').placeholder = "Insert the first chapter of the Light Novel";
			break;
		default:
			document.getElementById('ln_url').placeholder = "";
	}
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