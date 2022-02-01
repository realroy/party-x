import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"
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
      const session = await getSession({ req })
      console.log({ session })
      const { partyRepository } = args;
      try {
        const parties = await getAvailableParties({
          userId: '1',
          partyRepository: partyRepository(args.db),
        });

        return res.json({ data: parties });
      } catch (error) {
        return res.status(403).json({ message: error });
      }
    },

    async create(req: NextApiRequest, res: NextApiResponse) {
      const { partyRepository, partyParticipantRepository } = args;

      const { maxPartyParticipant, partyName } = req.body;

      try {
          const party = await createParty({
            userId: '1',
            partyRepository: partyRepository(args.db),
            partyParticipantRepository: partyParticipantRepository(args.db),
            options: {
              name: partyName,
              maxPartyParticipant: +maxPartyParticipant,
            },
          });

          return res.json({ data: party });
      } catch (error) {
        console.log(error)
        return res.status(403).json({ message: error });
      }
    },
  };
};
