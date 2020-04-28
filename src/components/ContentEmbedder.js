import React from "react";
import { Link } from "gatsby";
import ResponsiveEmbed from "react-responsive-embed"
import YouTubeEmbedder from "./YouTubeEmbedder";
import SoundCloudEmbedder from "./SoundCloudEmbedder"

function is_youtube(url) {    
    if (url != undefined || url != '') {        
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
    if (url != undefined || url != '') {        
        var regExp = /soundcloud.com/;
        var match = url.match(regExp);
        if (match) {
            return true  
        }
    } else {
        return false
    }
}

const ContentEmbedder = ({ performance }) => (
  <div className="mt-8" key="0">
    {(() => {
      if (is_youtube(performance.content_url))
        return (
            <YouTubeEmbedder performance={performance}/>
        );
      if (is_soundcloud(performance.content_url)) {
        return (
            <SoundCloudEmbedder performance={performance}/>
        );
      } else return null;
    })()}
  </div>
);

export default ContentEmbedder;
