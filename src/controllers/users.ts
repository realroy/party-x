import type { NextApiRequest, NextApiResponse } from "next";
import * as argon2 from "argon2";

import { UserRepositoryPort } from "src/repositories";
import { createUser } from "src/services";

export type UsersControllerArgs = {
  userRepository: UserRepositoryPort;
};

export const usersController = (args: UsersControllerArgs) => {
  return {
    async create(req: NextApiRequest, res: NextApiResponse) {
      const { email, password } = req.body;

      try {
        const user = await createUser({
          userRepository: args.userRepository,
          email,
          password,
          encrypt: argon2.hash,
        });

        res.status(201).json({ id: user.id, email: user.email });
      } catch (error) {
        res.status(500).json({ message: error })
      }
    },
  };
};
