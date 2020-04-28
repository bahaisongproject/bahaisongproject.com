import React from "react";

const SoundCloudEmbedder = ({ performance }) => (
    <iframe
        src={"https://w.soundcloud.com/player/?url=" + performance.content_url + "&color=%238bb6af"}
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"    
    />
);

export default SoundCloudEmbedder;
