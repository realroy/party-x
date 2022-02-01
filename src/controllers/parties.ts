import type { NextApiRequest, NextApiResponse } from "next";
import { db, DbTransaction } from "src/db";
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

export const partiesController = (args: PartiesControllerArgs) => {
  return {
    async getList(req: NextApiRequest, res: NextApiResponse) {
      const { partyRepository } = args;
      try {
        const parties = await getAvailableParties({
          user: {},
          partyRepository: partyRepository(args.db),
        });

        console.log({ parties })

        return res.json({ data: parties });
      } catch (error) {
        return res.status(403).json({ message: error });
      }
    },

    async create(req: NextApiRequest, res: NextApiResponse) {
      const { partyRepository, partyParticipantRepository } = args;

      const { maxPartyParticipant, name } = req.body;

      try {
        args.db.transaction(async (txn: any) => {
          const party = await createParty({
            user: { id: 1 },
            partyRepository: partyRepository(txn),
            partyParticipantRepository: partyParticipantRepository(txn),

            options: {
              name,
              maxPartyParticipant,
            },
          });

          return res.json({ data: party });
        });
      } catch (error) {
        return res.status(403).json({ message: error });
      }
    },
  };
};
