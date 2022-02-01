import type { NextApiRequest, NextApiResponse } from "next";

import { usersController } from "src/controllers";
import { db } from "src/db";
import { UserRepositoryAdapter } from "src/repositories";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  try {
    const connection = db();
    const controller = usersController({
      userRepository: UserRepositoryAdapter(connection),
    });

    switch (req.method) {
      case "POST":
        return controller.create(req, res);
      default:
        return res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
