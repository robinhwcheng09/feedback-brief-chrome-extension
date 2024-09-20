import { SignUp } from '@clerk/chrome-extension'

export const SignUpPage = () => {
  return (
    <>
      <p>Sign Up</p>
        <SignUp 
          routing="virtual"
          signInUrl="https://beloved-civet-31.accounts.dev/sign-in"
          />
    </>
  )
}