chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "send-highlighted-text",
        title: "Send highlighted text to Feedback Brief",
        contexts: ["selection"]
    })
})