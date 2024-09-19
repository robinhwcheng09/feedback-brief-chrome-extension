import { RouterProvider, createMemoryRouter } from 'react-router-dom'

// Import the layouts
import { RootLayout } from './layouts/root-layout'

// Import the components
import { SignInPage } from "./routes/sign-in"
import { SignUpPage } from "./routes/sign-up"
import { Index } from './routes/index'

// Create the router
const router = createMemoryRouter([
    {
        element: <RootLayout />,
        children: [
                { path: '/', element: <Index /> },
                { path: '/sign-in', element: <SignInPage /> },
                { path: '/sign-up', element: <SignUpPage /> },
            ],
        },
])

export default function PopupIndex() {
    return <RouterProvider router={router} />
}