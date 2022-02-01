import type { NextApiRequest, NextApiResponse } from "next";
import { DbTransaction } from "src/db";
import { DbPort } from "src/ports";

import {
  PartyParticipantRepositoryPort,
  PartyRepositoryPort,
} from "src/repositories";
import { getAvailableParties } from "src/services";
import { createParty } from "src/services/createParty";

export type PartiesControllerArgs = {
  partyRepository: (db: any) => PartyRepositoryPort;
  partyParticipantRepository: (db: any) => PartyParticipantRepositoryPort;
  db: DbPort;
};

export const partyParticipantsController = (args: PartiesControllerArgs) => {
  return {
    async create(req: NextApiRequest, res: NextApiResponse) {
      const { partyRepository, partyParticipantRepository } = args;

      try {
        args.db.transaction(async (txn: any) => {
          const party = await createParty({
            user: req.user,
            partyRepository: partyRepository(txn),
            partyParticipantRepository: partyParticipantRepository(txn),
          });

          return res.json({ data: party });
        });
      } catch (error) {
        return res.status(403).json({ message: error });
      }
    },
  };
};
