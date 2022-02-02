import { FC, MouseEventHandler } from "react";
import { Button } from "../../Button";

import styles from "./PartyCard.module.css";

export type PartyCardProps = {
  partyId: string;
  partyImgSrc: string;
  partyName: string;
  currentPartyParticipant: number;
  maxPartyParticipant: number;
  onJoinClick: (partyId: string) => any;
  onLeaveClick: (partyId: string) => any;
  isJoined: boolean;
};

export const PartyCard: FC<PartyCardProps> = (props) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (props.isJoined) {
      props.onLeaveClick(props.partyId);
    } else {
      props.onJoinClick(props.partyId);
    }

    e.preventDefault();
  };

  return (
    <div className={styles["card"]}>
      <div>
        {!props.partyImgSrc && (
          <div className={styles["card__img-placeholder"]}></div>
        )}
        {props.partyImgSrc && (
          <img src={props.partyImgSrc} alt={props.partyName} />
        )}
      </div>
      <h3 className={styles["card__name"]}>{props.partyName}</h3>
      <div className={styles["card__bottom"]}>
        <div>
          <span>{props.currentPartyParticipant}</span>/
          <span>{props.maxPartyParticipant}</span>
        </div>
        {props.isJoined ? (
          <Button variant={"outlined"} onClick={handleClick}>
            Leave
          </Button>
        ) : (
          <Button variant={"contained"} onClick={handleClick}>
            Join
          </Button>
        )}
      </div>
    </div>
  );
};
