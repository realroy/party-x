import type { Party, User } from "src/models";
import {
  PartyParticipantRepositoryPort,
  PartyRepositoryPort,
} from "src/repositories";

export type CreatePartyArgs = {
  userId: string;
  partyRepository: PartyRepositoryPort;
  partyParticipantRepository: PartyParticipantRepositoryPort;
  options: Partial<Party>;
};

export const createParty = async (args: CreatePartyArgs) => {
  const { name, maxPartyParticipant = 2 } = args?.options ?? {};

  const party = await args.partyRepository.create({
    name: name ?? `Party@${new Date().getTime()}`,
    maxPartyParticipant,
  }).catch(err => {
    console.log('create party error!', err)
    throw err
  });

  const partyParticipant = { userId: args.userId, partyId: party.id };

  await args.partyParticipantRepository.create(partyParticipant).catch(err => {
    console.log('create party party participant error!', err)
    args.partyRepository.deleteById(party.id)
    throw err
  });

  return party;
};
