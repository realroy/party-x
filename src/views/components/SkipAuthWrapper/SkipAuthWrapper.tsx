import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

export type SkipAuthWrapperProps = {};

export const SkipAuthWrapper: FC<SkipAuthWrapperProps> = (props) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.back();
    }
  }, [session.status, router]);

  return session.status === "unauthenticated" ? (
    <>{props.children}</>
  ) : (
    <div>Loading ...</div>
  );
};
