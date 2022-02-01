import type { NextPage } from "next/types";
import NextHead from "next/head";

import { CreatePartyPageProps, CreatePartyPage, AuthWrapper } from "src/views";

const CreatePartyNextPage: NextPage<CreatePartyPageProps> = (props) => {
  return (
    <AuthWrapper>
      <NextHead>
        <title>สร้างปาร์ตี้</title>
      </NextHead>
      <CreatePartyPage {...props} />
    </AuthWrapper>
  );
};

export default CreatePartyNextPage;
