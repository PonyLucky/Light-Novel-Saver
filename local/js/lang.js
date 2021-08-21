var lang = ((navigator.languages && navigator.languages[0])
  || navigator.language || navigator.userLanguage || 'en').substr(0, 2);

// Choose the file to import depending of the user's language
$(document).ready(function() {
  var known = { en: true, fr: true };

  // If the language isn't know, english
  if(!known[lang]) lang = 'en';

  // Remove all 'main' who aren't the user's language
  $('main[lang!=' + lang + ']').remove();
});
