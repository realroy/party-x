import { DbPort } from "src/ports";

export type CreateUserArgs = {
  email: string,
  password: string
}

export const UserRepositoryAdapter = (db: DbPort) => {
  return {
    findOneByEmail(email: string) {
      return db.db.user.findFirst({
        where: {
          email,
        },
      });
    },
    create(args: CreateUserArgs) {
      return db.db.user.create({
        data: args
      })
    }
  };
};

export type UserRepositoryPort = ReturnType<
  typeof UserRepositoryAdapter
>;
