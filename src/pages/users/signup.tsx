import type { NextPage } from "next/types"
import NextHead from 'next/head'
import { SignUpPage, SignUpPageProps, SkipAuthWrapper } from "src/views"

const SignUpNextPage: NextPage<SignUpPageProps> = (props) => {
  return (
    <SkipAuthWrapper>
      <NextHead>
        <title>สร้างบัญชีผู้ใช้</title>
      </NextHead>
      <SignUpPage {...props} />
    </SkipAuthWrapper>
  )
}

export default SignUpNextPage