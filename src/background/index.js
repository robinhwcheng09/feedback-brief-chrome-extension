chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "addFeedback",
        title: "Add Feedback",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "addFeedback") {
        chrome.storage.local.set({ selectedText: info.selectionText });
        chrome.action.openPopup(); // Open the popup to submit feedback
    }
});