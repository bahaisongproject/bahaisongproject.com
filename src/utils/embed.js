function get_youtube_id(content_url) {
  if (typeof content_url !== "string" || content_url.trim() === "") {
    return false
  }

  try {
    var value = content_url.trim()
    var url = new URL(/^https?:\/\//i.test(value) ? value : "https://" + value)
    var hostname = url.hostname.toLowerCase().replace(/^www\./, "")
    var id

    if (hostname === "youtu.be") {
      id = url.pathname.split("/").filter(Boolean)[0]
    } else if (
      hostname === "youtube.com" ||
      hostname.endsWith(".youtube.com") ||
      hostname === "youtube-nocookie.com" ||
      hostname.endsWith(".youtube-nocookie.com")
    ) {
      if (url.pathname === "/watch") {
        id = url.searchParams.get("v")
      } else {
        var parts = url.pathname.split("/").filter(Boolean)
        if (["embed", "shorts", "live", "v"].includes(parts[0])) {
          id = parts[1]
        }
      }
    }

    return /^[A-Za-z0-9_-]{11}$/.test(id || "") ? id : false
  } catch (error) {
    return false
  }
}

module.exports = { get_youtube_id }
