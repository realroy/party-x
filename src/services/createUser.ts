import { UserRepositoryPort } from "src/repositories";

export type CreateUserArgs = {
  userRepository: UserRepositoryPort;
  email: string;
  password: string;
  encrypt: (password: string) => Promise<string>;
};

export const createUser = async (args: CreateUserArgs) => {
  const { userRepository } = args

  const user = await userRepository.findOneByEmail(args.email)
  if (user) {
    throw new Error('user is already existed!')
  }

  const newUser = {
    email: args.email,
    password: await args.encrypt(args.password),
  };



  return userRepository.create(newUser);
};
