import type { NextPage } from "next/types";
import NextHead from "next/head";

import { PartiesPage, PartiesPageProps } from "src/views";

const PartiesNextPage: NextPage<PartiesPageProps> = (props) => {
  return (
    <>
      <NextHead>
        <title>ปาร์ตี้ทั้งหมด</title>
      </NextHead>
      <PartiesPage {...props} />
    </>
  );
};

export default PartiesNextPage;
