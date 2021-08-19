function ln_type_www_lightnovelworld_com() {
	// Local variables
	var ln_link_next_chapter="", isNextChapter = true;

	// Load the first chapter (for lightnovelworld.com)
	$.ajax({
		url: document.getElementById('ln_url').value,
		success: function(response,status) {
			// Format the response
			let htmlDoc = html_parser(response);

			// Get the title of the Light Novel
			ln_title = htmlDoc.querySelector("div.titles")
				.getElementsByTagName('a')[0].innerHTML;

			console.log("Title: "+ln_title);

			//------------------------------------------------------------------------
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
			ln_content += "<h1>"+ln_chapter_title+"</h1>\n"+ln_chapter_content+"\n\n";

			ln_link_next_chapter = htmlDoc.querySelector("a.chnav.next")
				.getAttribute('href');
			//------------------------------------------------------------------------

			// Then until there's a next chapter
			while (isNextChapter) {
				// Load the chapter
				$.ajax({
					url: "https://www.lightnovelworld.com"+ln_link_next_chapter,
					async: false,
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

						if (
							htmlDoc.querySelector("a.chnav.next").classList
								.contains('isDisabled')
						) isNextChapter = false;
						//------------------------------------------------------------------
					},
					error: function () {
						console.error("The chapter couldn't be loaded");
					}
				});
			}

			display_save_button();
		}
	});
}