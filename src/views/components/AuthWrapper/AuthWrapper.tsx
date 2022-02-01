import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

export type AuthWrapperProps = {};

export const AuthWrapper: FC<AuthWrapperProps> = (props) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [session.status, router]);

  return session.status === "authenticated" ? (
    <>{props.children}</>
  ) : (
    <div>Loading ...</div>
  );
};
