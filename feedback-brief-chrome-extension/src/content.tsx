import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

import { CountButton } from "~features/count-button"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

// Create context menu item
try {
  chrome.contextMenus.create({
    id: "send-highlighted-text",
    title: "Send highlighted text",
    contexts: ["selection"]
  })
} catch (e) {
  // Menu might already exist
  console.log("Context menu may already exist:", e)
}

// Handle context menu click 
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "send-highlighted-text" && info.selectionText) {
    try {
      // TODO: Replace with add feedback API endpoint
      await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: info.selectionText })
      })
    }
    catch (error) {
      console.error('Failed to send highlighted text:', error)
    }
  }
})

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return (
    <div className="plasmo-z-50 plasmo-flex plasmo-fixed plasmo-top-32 plasmo-right-8">
      <CountButton />
    </div>
  )
}

export default PlasmoOverlay
