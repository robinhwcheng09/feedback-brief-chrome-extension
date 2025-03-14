import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from '@clerk/chrome-extension'
import React from "react"
import '~style.css'
import { callWebAppAPI } from '~background'


const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY
const SYNC_HOST = process.env.PLASMO_PUBLIC_CLERK_SYNC_HOST
const EXTENSION_URL = chrome.runtime.getURL('.')

if (!PUBLISHABLE_KEY || !SYNC_HOST) {
  throw new Error('Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY and PLASMO_PUBLIC_CLERK_SYNC_HOST to the .env.development file')
}

function FeedbackForm() {
  const [feedbackText, setFeedbackText] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const { userId: clerkUserId, getToken } = useAuth()

  const handleSubmit = async () => {
    if (!feedbackText.trim()) {
      return;
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const token = await getToken();
      
      // TODO: Replace with add feedback API endpoint
      await callWebAppAPI('/feedback/process', 'POST', token, {
        feedbackContent: feedbackText.trim(),
        userClerkId: clerkUserId,
      })
      setFeedbackText("")
    } catch (error) {
      console.error('Failed to submit feedback:', error)
      setError('Failed to submit feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="plasmo-flex plasmo-flex-col plasmo-gap-4">
      <textarea 
        className="plasmo-w-full plasmo-h-32 plasmo-p-2 plasmo-border plasmo-rounded"
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        placeholder="Enter feedback here..."
        disabled={isSubmitting}
      />
      {error && (
        <div className="plasmo-text-red-500 plasmo-text-sm">{error}</div>
      )}
      <button
        disabled={!feedbackText.trim() || isSubmitting}
        onClick={handleSubmit}
        className="plasmo-bg-blue-500 plasmo-text-white plasmo-px-4 plasmo-py-2 plasmo-rounded hover:plasmo-bg-blue-600 disabled:plasmo-opacity-50 disabled:plasmo-cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </div>
  )
}

function IndexPopup() {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl={`${EXTENSION_URL}/popup.html`}
      signInFallbackRedirectUrl={`${EXTENSION_URL}/popup.html`}
      signUpFallbackRedirectUrl={`${EXTENSION_URL}/popup.html`}
      syncHost={SYNC_HOST}
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
            <FeedbackForm />
          </SignedIn>
        </main>
      </div>
    </ClerkProvider>
  )
}

export default IndexPopup