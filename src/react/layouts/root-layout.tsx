import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, UserButton, useUser } from '@clerk/chrome-extension'
import "./root-layout.css"

const PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Please add the CLERK_PUBLISHABLE_KEY to the .env.development file')
}

function HelloUser() {
  const { user } = useUser(); 
  return (
      <p>Hello ${user?.firstName}</p>
  )
}

export const RootLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  console.log('location', location)
  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
      syncSessionWithTab
    >
      <div className="App">
        <main className="App-main">
          <Outlet />
        </main>
        <footer className="App-footer">
          <SignedIn>
            <HelloUser />
          </SignedIn>
          <SignedOut>
            <Link to="/">Home</Link>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </SignedOut>
        </footer>
      </div>
    </ClerkProvider>
  )
}