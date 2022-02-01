import { FC, MouseEventHandler } from "react";

import styles from './PartyCard.module.css'

export type PartyCardProps = {
  partyId: string;
  partyImgSrc: string
  partyName: string;
  currentPartyParticipant: number;
  maxPartyParticipant: number;
  onJoinClick: (partyId: string) => any;
};

export const PartyCard: FC<PartyCardProps> = (props) => {
  const handleJoin: MouseEventHandler<HTMLButtonElement> = (e) => {
    props.onJoinClick(props.partyId);

    e.preventDefault();
  };

  return (
    <div className={styles['card']}>
      <div>
        {!props.partyImgSrc && (
          <div className={styles['card__img-placeholder']}></div>
        )}
        {props.partyImgSrc && <img src={props.partyImgSrc} alt={props.partyName} />}
      </div>
      <h3 className={styles['card__name']}>{props.partyName}</h3>
      <div className={styles['card__bottom']}>
        <div>
          <span>{props.currentPartyParticipant}</span>/
          <span>{props.maxPartyParticipant}</span>
        </div>

        <button onClick={handleJoin} className={styles['card__join-btn']}>Join</button>
      </div>
    </div>
  );
};
