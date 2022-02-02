import type { NextPage } from "next/types"
import NextHead from 'next/head'
import { SignInPage, SignInPageFormData, SignInPageProps, SkipAuthWrapper } from "src/views"
import { signIn } from "next-auth/react"

const SignInNextPage: NextPage<SignInPageProps> = (props) => {
  
  return (
    <SkipAuthWrapper>
      <NextHead>
        <title>เข้าสู่ระบบ</title>
      </NextHead>
      <SignInPage {...props} onSubmit={(data: SignInPageFormData) => signIn('credentials', data)} />
    </SkipAuthWrapper>
  )
}

export default SignInNextPage