export function getYouTubeId(contentUrl) {
  if (typeof contentUrl !== "string" || contentUrl.trim() === "") {
    return false
  }

  try {
    const value = contentUrl.trim()
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`)
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "")
    let id

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
        const parts = url.pathname.split("/").filter(Boolean)
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

export function isYouTube(contentUrl) {
  return getYouTubeId(contentUrl) !== false
}

export function isSoundCloud(contentUrl) {
  return typeof contentUrl === "string" && /soundcloud\.com/.test(contentUrl)
}

export function isBandcamp(contentUrl) {
  return typeof contentUrl === "string" && /bandcamp\.com/.test(contentUrl)
}
