import type { Party, User } from "src/models";
import {
  PartyParticipantRepositoryPort,
  PartyRepositoryPort,
} from "src/repositories";

export type GetAvailablePartiesArgs = {
  user: User;
  partyRepository: PartyRepositoryPort;
  options: Partial<Party>;
};

export const getAvailableParties = async (args: GetAvailablePartiesArgs) => {
  const parties = await args.partyRepository.findManyAvailable()

  const availableParties = parties.filter(party => party.maxPartyParticipant > party._count.partyParticipants)

  return availableParties
};
