import type { NextPage } from "next/types";
import NextHead from "next/head";

import { CreatePartyPageProps, CreatePartyPage } from "src/views/components";

const CreatePartyNextPage: NextPage<CreatePartyPageProps> = (props) => {
  return (
    <>
      <NextHead>
        <title>สร้างปาร์ตี้</title>
      </NextHead>
      <CreatePartyPage {...props} />
    </>
  );
};

export default CreatePartyNextPage;
