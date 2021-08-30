function ln_type_www_lightnovelworld_com() {
	// Local variables
	var ln_link_next_chapter="";

	// Load the summary (for lightnovelworld.com)
	$.ajax({
		url: document.getElementsByClassName('ln_url')[0].value,
		success: function(response,status) {
			// Format the response
			let htmlDoc = html_parser(response);

			// Get the title of the Light Novel
			ln_title = htmlDoc.querySelector("h1.novel-title").innerHTML;
			console.log("Title: "+ln_title);

			// Get the author
			ln_author = htmlDoc.querySelector('div.author').lastElementChild.firstElementChild.innerHTML;
			console.log("Author: "+ln_author);

			// Get the number of chapters
			ln_nb_chapters = parseInt(
				htmlDoc.querySelector('div.header-stats')
				.querySelector('i.icon-book-open')
				.nextSibling.nodeValue.trim()
			);
			console.log("Number of chapters: "+ln_nb_chapters);

			// Get the link of the first chapter
			ln_link_next_chapter = htmlDoc.getElementById('readchapterbtn')
				.getAttribute('href');

			// Display the metadata
			display_metadata();

			// Load the first chapter
			ln_type_www_lightnovelworld_com_chapter(ln_link_next_chapter);
		},
		error: function() {
			bad_request(true);
		}
	});
}

function ln_type_www_lightnovelworld_com_chapter(ln_link_next_chapter) {
	$.ajax({
		url: "https://www.lightnovelworld.com"+ln_link_next_chapter,
		success: function(response) {
			// Format the response
			let htmlDoc = html_parser(response);

			//------------------------------------------------------------------
			// Chapter variables
			let ln_chapter_title="", ln_chapter_content=new Array();

			// Get the title chapter
			ln_chapter_title = htmlDoc.querySelector("div.titles")
				.getElementsByTagName('H2')[0].innerHTML;

			// Get the content of the chapter
			let tmp = htmlDoc.getElementById('chapter-container')
				.getElementsByTagName('p');
			for (let i = 0; i < tmp.length; i++) {
				if (tmp[i].className=="") {
					ln_chapter_content.push(tmp[i].outerHTML);
				}
			}
			ln_chapter_content = ln_chapter_content.join("\n");
			console.log(ln_chapter_title);

			// Then Put it in the content
			ln_content += "<h1>"+ln_chapter_title+"</h1>\n"
				+ln_chapter_content+"\n\n";

			ln_link_next_chapter = htmlDoc.querySelector("a.chnav.next")
				.getAttribute('href');

			// If it is the last chapter
			if (
				htmlDoc.querySelector("a.chnav.next").classList
					.contains('isDisabled')
			) display_save_button();
			else {
				// Display/Update progress text
				display_progress_text(ln_chapter_title);

				// Display/Update progressBar
				display_progress_bar();

				// Increment the numbers of loaded chapters
				ln_nb_chapters_loaded++;

				// Load the next chapter
				ln_type_www_lightnovelworld_com_chapter(ln_link_next_chapter);
			}
			//------------------------------------------------------------------
		},
		error: function() {
			bad_request();
		}
	});
}
