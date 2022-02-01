import type { NextApiRequest, NextApiResponse } from "next";
import { partiesController } from "src/controllers";
import { partyParticipantRepository, partyRepository } from "src/repositories";
import { db } from "src/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const connection = db();
  try {
    const controller = partiesController({
      partyParticipantRepository,
      partyRepository,
      db: connection,
    });

    switch (req.method) {
      case "GET":
        return controller.getList(req, res);
      case "POST":
        return controller.create(req, res);
      default:
        return res.status(404).json({
          status: 404,
        });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
