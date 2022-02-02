import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { DbPort } from "src/ports";

import {
  PartyParticipantRepositoryPort,
  PartyRepositoryPort,
} from "src/repositories";
import { getAvailableParties } from "src/services";
import { createParty } from "src/services/createParty";

export type PartiesControllerArgs = {
  partyRepository: PartyRepositoryPort;
  partyParticipantRepository: PartyParticipantRepositoryPort;
};

export const partiesController = (args: PartiesControllerArgs) => {
  return {
    async getList(req: NextApiRequest, res: NextApiResponse) {
      const token = await getToken({ req, secret: process.env.SECRET ?? "" });

      const { partyRepository } = args;
      try {
        const parties = await getAvailableParties({
          userId: token?.sub ?? "",
          partyRepository,
        });

        return res.json({ data: parties });
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    },

    async create(req: NextApiRequest, res: NextApiResponse) {
      const token = await getToken({ req, secret: process.env.SECRET ?? "" });

      const { partyRepository, partyParticipantRepository } = args;

      const { maxPartyParticipant, partyName } = req.body;

      try {
        const party = await createParty({
          userId: token?.sub ?? '',
          partyRepository,
          partyParticipantRepository,
          options: {
            name: partyName,
            maxPartyParticipant: +maxPartyParticipant,
          },
        });

        return res.json({ data: party });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
      }
    },
  };
};
