chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "send-highlighted-text",
        title: "Send highlighted text to Feedback Brief",
        contexts: ["selection"]
    })
})

export async function callWebAppAPI(endpoint: string, method = "POST", token: string, data: any = null) {
    if (!process.env.PLASMO_PUBLIC_FEEDBACK_BRIEF_API_URL) {
        throw new Error('PLASMO_PUBLIC_FEEDBACK_BRIEF_API_URL environment variable is not set');
    }

    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: data ? JSON.stringify(data) : null
        };

        const response = await fetch(`${process.env.PLASMO_PUBLIC_FEEDBACK_BRIEF_API_URL}${endpoint}`, options);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(
                errorData?.message || 
                `API request failed with status ${response.status}`
            );
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error calling web app API:', error);
        throw error;
    }
}