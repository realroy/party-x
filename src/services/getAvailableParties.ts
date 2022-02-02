import {
  PartyRepositoryPort,
} from "src/repositories";

export type GetAvailablePartiesArgs = {
  userId: string;
  partyRepository: PartyRepositoryPort;
};

export const getAvailableParties = async (args: GetAvailablePartiesArgs) => {
  const parties = await args.partyRepository.findManyAvailable();

  const availableParties = parties
    .filter(
      (party) => party.maxPartyParticipant > party.partyParticipants.length
    )
    .map((party) => ({
      ...party,
      isJoined: !!party.partyParticipants.find(
        (partyParticipant) => partyParticipant.userId === args.userId
      ),
    }));

  return availableParties;
};
