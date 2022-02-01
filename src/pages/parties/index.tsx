import type { NextPage } from "next/types";
import NextHead from "next/head";
import { signOut } from "next-auth/react"


import { AuthWrapper, PartiesPage, PartiesPageProps } from "src/views";

const PartiesNextPage: NextPage<PartiesPageProps> = (props) => {
  return (
    <AuthWrapper>
      <NextHead>
        <title>ปาร์ตี้ทั้งหมด</title>
      </NextHead>
      <PartiesPage {...props} handleSignOut={() => signOut()} />
    </AuthWrapper>
  );
};

export default PartiesNextPage;
