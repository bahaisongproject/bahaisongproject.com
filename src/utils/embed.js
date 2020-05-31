function is_youtube(content_url) {
  if (content_url != undefined && content_url != "") {
    var regExp = /youtube.com/;
    var match = content_url.match(regExp);
    if (match) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function is_soundcloud(content_url) {
  if (content_url != undefined && content_url != "") {
    var regExp = /soundcloud.com/;
    var match = content_url.match(regExp);
    if (match) {
      return true;
    }
  }
  return false;
}

function is_bandcamp(content_url) {
  if (content_url != undefined && content_url != "") {
    var regExp = /bandcamp.com/;
    var match = content_url.match(regExp);
    if (match) {
      return true;
    }
  }
  return false;
}

function get_youtube_id(content_url) {
  if (is_youtube(content_url)) {
    return content_url.substring(content_url.length - 11);
  } else {
    return false;
  }
}



export { is_youtube, is_soundcloud, is_bandcamp, get_youtube_id };
