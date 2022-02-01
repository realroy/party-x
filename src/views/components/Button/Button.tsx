import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import styles from "./Button.module.css";

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: 'contained' | 'outlined'
};

export const Button: FC<ButtonProps> = (props) => {
  const { children, ...restProps } = props;
  const { variant = 'contained' } = props

  let className = 'btn-contained'
  if (variant === 'outlined') {
    className = 'btn-outlined'
  }

  return (
    <button {...restProps} className={styles[className]}>
      {props.children}
    </button>
  );
};
