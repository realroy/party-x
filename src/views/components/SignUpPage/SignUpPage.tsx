import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../Button";

import styles from "./SignUpPage.module.css";

export type SignUpPageProps = {};

export type SignUpFormData = {
  email: string;
  password: string;
  passwordConfirmation: string;
  consent: boolean;
};

export const SignUpPage: FC<SignUpPageProps> = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({ mode: "onChange" });
  const router = useRouter()

  const onSubmit = async (data: SignUpFormData) => {
    await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    router.push('/api/auth/signin');
  };

  const disableSubmit = !isValid;

  return (
    <main className="container">
      <h1 className={styles["title"]}>สร้างบัญชีผู้ใช้</h1>
      <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
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

        <div className={styles["form__item"]}>
          <label htmlFor="password-confirmation">ยืนยันรหัสผ่าน</label>
          <input
            type="password"
            id="password-confirmation"
            {...register("passwordConfirmation", {
              required: true,
              validate: {
                passwordMatch: (v) => v === watch("password"),
              },
            })}
          />
          {errors.passwordConfirmation?.type === "required" && (
            <p className={styles["form__error-text"]}>กรุณายืนยันรหัสผ่าน</p>
          )}
          {errors.passwordConfirmation?.type === "passwordMatch" && (
            <p className={styles["form__error-text"]}>รหัสผ่านไม่ตรงกัน</p>
          )}
        </div>

        <div className={styles["form__item"]}>
          <label htmlFor="consent">
            <input
              type="checkbox"
              id="consent"
              {...register("consent", { required: true })}
            />
            ยอมรับเงื่อนไขและข้อตกลงการใช้งาน
          </label>
        </div>

        <div className="mx-auto">
          <Button disabled={disableSubmit}>ยืนยัน</Button>
        </div>
      </form>
    </main>
  );
};
