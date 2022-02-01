import type { UserRepositoryPort } from "src/repositories";

export type AuthorizeUserArgs = {
  userRepository: UserRepositoryPort;
  email: string
  rawPassword: string
  verify: (hash: string, raw: string) => Promise<boolean> 
};

export const authorizeUser = async (args: AuthorizeUserArgs) => {
  const user = await args.userRepository.findOneByEmail(args.email)
  if (!user) {
    return null;
  }
  
  const isEqual = await args.verify(user.password, args.rawPassword)
  if (!isEqual) {
    return null;
  }

  return user;
};
