import { UserRepositoryPort } from "src/repositories";

export type CreateUserArgs = {
  userRepository: UserRepositoryPort;
  email: string;
  password: string;
  encrypt: (password: string) => Promise<string>;
};

export const createUser = async (args: CreateUserArgs) => {
  const newUser = {
    email: args.email,
    password: await args.encrypt(args.password),
  };

  return args.userRepository.create(newUser);
};
