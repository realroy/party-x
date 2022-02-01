import type { NextApiRequest, NextApiResponse } from "next";
import { partiesController } from "src/controllers";
import { partyParticipantRepository, partyRepository } from "src/repositories";
import { db } from 'src/db'

export default function partyJoinHandler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const controller = partiesController({
    partyParticipantRepository,
    partyRepository,
    db: db,
    // @ts-ignore
    transaction: db.db.$transaction
  })

  if (req.method === "POST") {
    return controller.create(req, res)
  } else {
    return res.status(404).send({});
  }
}
