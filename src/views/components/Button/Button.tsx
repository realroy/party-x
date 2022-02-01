import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import styles from "./Button.module.css";

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {};

export const Button: FC<ButtonProps> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button {...restProps} className={styles["root"]}>
      {props.children}
    </button>
  );
};
