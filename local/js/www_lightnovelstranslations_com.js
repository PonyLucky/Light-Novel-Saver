function ln_type_www_lightnovelstranslations_com() {
	// Local variables
	var ln_link_chapters=new Array();

	// Load the summary of the chapters (for lightnovelstranslations.com)
	$.ajax({
		url: document.getElementsByClassName('ln_url')[0].value,
		success: function(response) {
			// Format the response
			let htmlDoc = html_parser(response);

			// Get the title of the Light Novel
			ln_title = htmlDoc.querySelector("h1.entry-title").innerHTML;
			
			// Get the number of chapters of the Light Novel
			ln_nb_chapters = htmlDoc.querySelector("div.entry-content")
				.getElementsByTagName('a').length;
			
			// Get the link of each chapter
			let tmp = htmlDoc.querySelector("div.entry-content")
				.getElementsByTagName('a');
			for (let i = 0; i < tmp.length; i++) {
				ln_link_chapters.push(tmp[i].getAttribute('href'));
			}

			// Show us that we got the right data
			console.log("Title: "+ln_title);
			console.log("Author: "+ln_author);
			console.log("Number of Links (may not be chapters): "+ln_nb_chapters);

			// Display the metadata
			display_metadata();

			// Load the content of each chapter
			ln_type_www_lightnovelstranslations_com_chapter(ln_link_chapters, 0);
		},
		error: function() {
			bad_request(true);
		}
	});
}

function ln_type_www_lightnovelstranslations_com_chapter(ln_link_chapters, i) {
	console.log(i);
	console.log(ln_link_chapters[i]);
	$.ajax({
		url: ln_link_chapters[i],
		success: function(response) {
			try {
				// Format the response
				let htmlDoc = html_parser(response);

				// Chapter variables
				let ln_chapter_title="", ln_chapter_content=new Array();

				// Get the title chapter
				ln_chapter_title = htmlDoc.querySelector("h1.entry-title")
					.innerHTML;

				// Get the title chapter
				let tmp = htmlDoc.querySelector("div.entry-content")
					.getElementsByTagName('p');
				for (let i = 0; i < tmp.length; i++) {
					if (tmp[i].className=="" && tmp[i].innerHTML!="&nbsp;") {
						ln_chapter_content.push(tmp[i].outerHTML);
					}
				}
				ln_chapter_content = ln_chapter_content.join("\n");

				// Update the loaded chapters
				console.log((ln_nb_chapters_loaded++)+"/"+ln_nb_chapters);

				// Then Put it in the content
				ln_content += "<h1>"+ln_chapter_title+"</h1>\n"
					+ln_chapter_content+"\n\n";
			}
			catch (error) {
				console.info("This link isn't a chapter");
				ln_nb_chapters--;
			}
		},
		error: function() {
			bad_request();
		},
		complete: function() {
			// Regardless of the success or error request
			// 
			// increment i
			i++;

			// Display/Update progress text
			display_progress_text((ln_nb_chapters_loaded++)+"/"+ln_nb_chapters);

			// Display/Update progressBar
			display_progress_bar();

			// Load the next chapter if there's one
			if (i < ln_link_chapters.length)
				ln_type_www_lightnovelstranslations_com_chapter(ln_link_chapters, i);
			else display_save_button();
		}
	});
}
