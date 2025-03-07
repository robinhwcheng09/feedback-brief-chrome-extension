import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/chrome-extension'
import React from "react"

import '~style.css'

const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY
const EXTENSION_URL = chrome.runtime.getURL('.')

if (!PUBLISHABLE_KEY) {
  throw new Error('Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.development file')
}

function IndexPopup() {
  const [feedbackText, setFeedbackText] = React.useState("")

  const handleSubmit = async () => {
    try {
      // TODO: Replace with add feedback API endpoint
      await fetch('API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: feedbackText })
      })
      setFeedbackText("")
    } catch (error) {
      console.error('Failed to submit feedback:', error)
    }
  }

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl={`${EXTENSION_URL}/popup.html`}
      signInFallbackRedirectUrl={`${EXTENSION_URL}/popup.html`}
      signUpFallbackRedirectUrl={`${EXTENSION_URL}/popup.html`}
    >
      <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-[600px] plasmo-w-[800px] plasmo-flex-col">
        <header className="plasmo-w-full">
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
        <main className="plasmo-grow">
          <SignedIn>
            <div className="plasmo-flex plasmo-flex-col plasmo-gap-4">
              <textarea 
                className="plasmo-w-full plasmo-h-32 plasmo-p-2 plasmo-border plasmo-rounded"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Enter feedback here..."
              />
              <button
                disabled={!feedbackText}
                onClick={handleSubmit}
                className="plasmo-bg-blue-500 plasmo-text-white plasmo-px-4 plasmo-py-2 plasmo-rounded hover:plasmo-bg-blue-600"
              >
                Submit Feedback
              </button>
            </div>
          </SignedIn>
        </main>
      </div>
    </ClerkProvider>
  )
}

export default IndexPopup