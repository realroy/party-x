import type { NextApiRequest, NextApiResponse } from "next";

import { partyParticipantsController } from "src/controllers";
import { partyParticipantRepository } from "src/repositories";
import { db } from "src/db";

export default function handler(req: NextApiRequest, res: NextApiResponse<{}>) {
  const controller = partyParticipantsController({
    partyParticipantRepository: partyParticipantRepository(db()),
  });

  if (req.method === "DELETE") {
    return controller.delete(req, res);
  } else {
    return res.status(404).send({});
  }
}
