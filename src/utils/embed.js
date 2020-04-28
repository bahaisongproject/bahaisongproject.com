function is_youtube(content_url) {
    if (content_url != undefined && content_url != '') {        
        var regExp = /youtube.com/;
        var match = content_url.match(regExp);
        if (match) {
            return true  
        } else {
          return false
        }
    } else {
        return false
    }
}

function is_soundcloud(content_url) {    
  if (content_url != undefined && content_url != '') {        
      var regExp = /soundcloud.com/;
      var match = content_url.match(regExp);
      if (match) {
          return true  
      }
  }
  return false
}

export {
    is_youtube,
    is_soundcloud
}