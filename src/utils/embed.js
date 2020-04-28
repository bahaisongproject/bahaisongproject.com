function is_youtube(url) {
    if (url != undefined && url != '') {        
        var regExp = /youtube.com/;
        var match = url.match(regExp);
        if (match) {
            return true  
        }
    } else {
        return false
    }
}

function is_soundcloud(url) {    
    if (url != undefined && url != '') {        
        var regExp = /soundcloud.com/;
        var match = url.match(regExp);
        if (match) {
            return true  
        }
    } else {
        return false
    }
}

export {
    is_youtube,
    is_soundcloud
}