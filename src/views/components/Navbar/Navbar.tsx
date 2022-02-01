import { FC, ReactNode } from "react";
import styles from "./Navbar.module.css";

export type NavbarProps = {
  left?: ReactNode | null;
  center?: ReactNode | null;
  right?: ReactNode | null;
};

export const Navbar: FC<NavbarProps> = (props) => {
  return (
    <nav className={styles["root"]}>
      <div className="container">
        <div className={styles['container']}>
          <div>{props.left}</div>
          <div>{props.center}</div>
          <div>{props.right}</div>
        </div>
      </div>
    </nav>
  );
};
