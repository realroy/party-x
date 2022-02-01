import { FC, Fragment, useEffect, useState } from "react";
import NextLink from "next/link";

import { Party } from "src/models";

import style from "./PartiesPage.module.css";
import { PartyCard } from "./PartyCard/PartyCard";
import { Navbar } from "../Navbar";
import { Button } from "../Button";

export type PartiesPageProps = {
  handleSignOut: () => void;
};

export type PartyWithPartyParticipantCount = Party & {
  _count?: {
    partyParticipant?: number;
  };
};

export const PartiesPage: FC<PartiesPageProps> = (props) => {
  const [parties, setParties] = useState<PartyWithPartyParticipantCount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/parties");
        const { data } = await res.json();
        setParties(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleJoinClick = (partyId: string) => {};

  return (
    <Fragment>
      <Navbar
        center={<div>ปาร์ตี้ทั้งหมด</div>}
        right={
          <div className={'flex justify-end'}>
            <Button variant="outlined" onClick={props.handleSignOut}>
              ออกจากระบบ
            </Button>
          </div>
        }
      />
      <main className="container">
        <div>
          <NextLink href={"/parties/create"}>
            <a>
              <div className={style["create-btn"]}>สร้างใหม่ +</div>
            </a>
          </NextLink>
        </div>

        <div className={style["parties__container"]}>
          {parties.map((party) => (
            <PartyCard
              key={party.id}
              partyId={party.id}
              partyName={party.name}
              partyImgSrc={party.imgUrl ?? ""}
              currentPartyParticipant={party._count?.partyParticipant ?? 0}
              maxPartyParticipant={party.maxPartyParticipant}
              onJoinClick={handleJoinClick}
            />
          ))}
        </div>
      </main>
    </Fragment>
  );
};
