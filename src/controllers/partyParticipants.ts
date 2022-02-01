import type { NextApiRequest, NextApiResponse } from "next";

import {
  PartyParticipantRepositoryPort,
} from "src/repositories";
import { joinParty, leaveParty } from "src/services";

export type PartyParticipantsControllerArgs = {
  partyParticipantRepository: PartyParticipantRepositoryPort;
};

export const partyParticipantsController = (args: PartyParticipantsControllerArgs) => {
  return {
    async create(req: NextApiRequest, res: NextApiResponse) {
      let { id } = req.query;
      if (Array.isArray(id)) {
        id = id[0];
      }

      const { userId } = req.body;
      const { partyParticipantRepository } = args;

      try {
        const data = await joinParty({
          partyId: id,
          userId,
          partyParticipantRepository,
        });

        return res.status(201).json({ data });
      } catch (error) {
        return res.status(403).json({ message: error });
      }
    },

    async delete(req: NextApiRequest, res: NextApiResponse) {
      let { id } = req.query;
      if (Array.isArray(id)) {
        id = id[0];
      }

      const { userId, partyParticipantId } = req.body;
      const { partyParticipantRepository } = args;

      try {
        const data = await leaveParty({
          partyId: id,
          userId,
          partyParticipantId,
          partyParticipantRepository,
        });

        return res.json({ data });
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    },
  };
};
