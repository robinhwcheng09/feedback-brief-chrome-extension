import React from 'react';
import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignIn, SignUp, ClerkProvider, useUser, useAuth } from '@clerk/chrome-extension';
import { useNavigate, Routes, Route, MemoryRouter } from 'react-router-dom';
import './App.css';
import config from '../../../config.js';

function HelloUser() {
    const { isSignedIn, user } = useUser();
    const { getToken } = useAuth();
    const [sessionToken, setSessionToken] = useState("");

    useEffect(() => {
        const scheduler = setInterval(async() => {
            const token = await getToken();
            setSessionToken(token);
        }, 1000);

        return () => clearInterval(scheduler);
    }, [])

    if (!isSignedIn) {
        return null;
    }

    return (
        <div className="hello-user">
            <h1>Hi {user?.firstName}, welcome to Feedback Brief</h1>
            <h2>Submit your feedback</h2>
            <p>Your Clerk session Token: {sessionToken}</p>
        </div>
    );
}

const publishableKey = config.PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
    const navigate = useNavigate();

    return (
        <ClerkProvider
            publishableKey={publishableKey}
            routerPush={to => navigate(to)}
            routerReplace={to => navigate(to, { replace: true })}
            syncSessionWithTab
            routerDebug={true}
        >
            <div className="App">
                <header className="App-header">
                    <h5>Welcome to Feedback Brief Chrome Extension</h5>
                </header>
                <main className="App-main">
                    <div>
                        <Routes>
                            <Route
                                path='/sign-up/*'
                                element={<SignUp signUpUrl="/sign-up"/>}
                            />
                            <Route 
                                path='/'
                                element={
                                    <>
                                        <SignedIn>
                                            <HelloUser />
                                        </SignedIn>
                                        <SignedOut>
                                            <SignIn 
                                                signInUrl="/sign-in"
                                            />
                                        </SignedOut>
                                    </>
                                }
                            />
                        </Routes>
                    </div>
                </main>
            </div>
        </ClerkProvider>
    );
}

function App() {
    return (
        <MemoryRouter>
            <ClerkProviderWithRoutes />
        </MemoryRouter>
    )
}

export default App;