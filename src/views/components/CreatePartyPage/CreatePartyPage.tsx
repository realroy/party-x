import { FC, Fragment } from "react";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import NextLink from "next/link";
import { useForm } from "react-hook-form";

import styles from "./CreatePartyPage.module.css";

import { Navbar } from "../Navbar";
import { Button } from "../Button";

export type CreatePartyPageProps = {};

export type CreatePartyFormData = {
  partyName: string;
  maxPartyParticipant: number;
};

export const CreatePartyPage: FC<CreatePartyPageProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePartyFormData>();
  
  const onSubmit = async (data: CreatePartyFormData) => {
    await fetch("/api/parties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  console.log({ errors });

  return (
    <Fragment>
      <Navbar
        left={
          <NextLink href={"/parties"}>
            <a>
              <div style={{ width: 24, height: 24 }}>
                <ArrowLeftIcon />
              </div>
            </a>
          </NextLink>
        }
        center={<div>สร้างปาร์ตี้</div>}
      />
      <main className="container">
        <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["form__item"]}>
            <label htmlFor="">ชื่อปาร์ตี้</label>
            <input type="text" {...register("partyName", { required: true })} />
            {errors.partyName && (
              <p className={styles["form__error-text"]}>
                กรุณากรอก ชื่อปาร์ตี้
              </p>
            )}
          </div>
          <div className={styles["form__item"]}>
            <label htmlFor="">จำนวนคนที่ขาด</label>
            <input
              type="number"
              {...register("maxPartyParticipant", { required: true, min: 2 })}
            />
            {errors.maxPartyParticipant?.type === "required" && (
              <p className={styles["form__error-text"]}>
                กรุณากรอก จำนวนคนที่ขาด
              </p>
            )}
            {errors.maxPartyParticipant?.type === "min" && (
              <p className={styles["form__error-text"]}>
                จำนวนคนที่ขาดน้อยเกินไป
              </p>
            )}
          </div>
          <div className="mx-auto">
            <Button>สร้างปาร์ตี้</Button>
          </div>
        </form>
      </main>
    </Fragment>
  );
};
