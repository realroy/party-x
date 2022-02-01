import type { Party, User } from "src/models";
import {
  PartyParticipantRepositoryPort,
  PartyRepositoryPort,
} from "src/repositories";

export type CreatePartyArgs = {
  user: User;
  partyRepository: PartyRepositoryPort;
  partyParticipantRepository: PartyParticipantRepositoryPort;
  options: Partial<Party>;
};

export const createParty = async (args: CreatePartyArgs) => {
  const { name, maxPartyParticipant = 2 } = args?.options ?? {};

  const party = await args.partyRepository.create({
    name: name ?? `Party@${new Date().getTime()}`,
    maxPartyParticipant,
  });

  const partyParticipant = { userId: args.user.id, partyId: party.id };

  await args.partyParticipantRepository.create(partyParticipant);

  return party;
};
