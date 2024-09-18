import { SignedIn, SignedOut, SignIn, SignUp, ClerkProvider } from "@clerk/chrome-extension";
import { useNavigate, Routes, Route, MemoryRouter, useLocation } from "react-router-dom";
import React from "react";
import "./App.css";

// function HelloUser() {
//     return <p>Hello User</p>
// }

function HelloUser() {
    return (
        <p>Hello User</p>
    )
}

const publishableKey = process.env.CLERK_PUBLISHABLE_KEY || '';
const signUpUrl = process.env.SIGN_UP_URL;
const signInUrl = process.env.SIGN_IN_URL;

function ClerkProviderWithRoutes() {
    const navigate = useNavigate();
    const location = useLocation();

    console.log('location:', location);

    return (
        <ClerkProvider
            publishableKey={publishableKey}
            routerPush={to => navigate(to)}
            routerReplace={to => navigate(to, { replace: true })}
            proxyUrl=""
            syncSessionWithTab
        >
            <div className="App">
                <header className="App-header">
                    <h5>Welcome to Feedback Brief Chrome Extensions</h5>
                </header>
                <main className="App-main"> 
                    <div>
                        <SignedOut>
                            <SignIn 
                                signUpUrl={signUpUrl}
                            />
                        </SignedOut>
                        <SignedIn>
                            <HelloUser />
                        </SignedIn>
                    </div>
                </main>
            </div>
        </ClerkProvider>
    );
}

const App = () => {
    return (
        <MemoryRouter>
            <ClerkProviderWithRoutes />
        </MemoryRouter>
    );
};
export default App;