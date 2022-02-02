import styles from "./SignInPage.module.css";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import NextImage from "next/image";
import NextLink from "next/link";

import { Button } from "../Button";

export type SignInPageProps = {
  onSubmit: (data: SignInPageFormData) => any;
};

export type SignInPageFormData = {
  email: string;
  password: string;
};

export const SignInPage: FC<SignInPageProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInPageFormData>({ mode: "onChange" });
  const router = useRouter();

  return (
    <main className="container">
      <form
        className={styles["form"]}
        onSubmit={handleSubmit(props.onSubmit)}
      >
        <div className="flex justify-center">
          <NextImage
            src={"/logo.png"}
            alt="party-x"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>

        <div className={styles["form__item"]}>
          <label htmlFor="email">อีเมล์</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className={styles["form__error-text"]}>กรุณากรอก อีเมล์</p>
          )}
        </div>
        <div className={styles["form__item"]}>
          <label htmlFor="password">รหัสผ่าน</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && (
            <p className={styles["form__error-text"]}>กรุณากรอก รหัสผ่าน</p>
          )}
        </div>

        <div className="mx-auto">
          <Button>เข้าสู่ระบบ</Button>
        </div>
        <div className="mx-auto mt-2">
          <NextLink href={"/users/signup"}>
            <Button variant="outlined">สร้างบัญชีผู้ใช้</Button>
          </NextLink>
        </div>
      </form>
    </main>
  );
};
