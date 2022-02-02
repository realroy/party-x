import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { PartyParticipantRepositoryPort } from "src/repositories";
import { joinParty, leaveParty } from "src/services";

export type PartyParticipantsControllerArgs = {
  partyParticipantRepository: PartyParticipantRepositoryPort;
};

export const partyParticipantsController = (
  args: PartyParticipantsControllerArgs
) => {
  return {
    async create(req: NextApiRequest, res: NextApiResponse) {
      let { id } = req.query;
      if (Array.isArray(id)) {
        id = id[0];
      }
      const token = await getToken({ req, secret: process.env.SECRET ?? "" });
      const { partyParticipantRepository } = args;

      try {
        const data = await joinParty({
          partyId: id,
          userId: token?.sub ?? "",
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

      const token = await getToken({ req, secret: process.env.SECRET ?? "" });
      const { partyParticipantRepository } = args;

      try {
        const data = await leaveParty({
          partyId: id,
          userId: token?.sub ?? '',
          partyParticipantRepository,
        });

        return res.json({ data });
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    },
  };
};
