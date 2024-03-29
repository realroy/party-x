import { PartyParticipantRepositoryPort } from "src/repositories";

export type JoinPartyArgs = {
  partyId: string;
  userId: string;
  partyParticipantRepository: PartyParticipantRepositoryPort;
};

export const joinParty = async (args: JoinPartyArgs) => {
  const { partyParticipantRepository } = args;
  const partyParticipant =
    await partyParticipantRepository.findByPartyIdAndUserId(
      args.partyId,
      args.userId
    );

  if (partyParticipant) {
    throw new Error('already joined party')
  }
  
  return partyParticipantRepository.create({ userId: args.userId, partyId: args.partyId });
};

// '$argon2i$v=19$m=4096,t=3,p=1$ipm7KpPY//ApqjQT34LDFA$Mp4k/hwQ26f5bYCkZhgraWuBctb980fF1ip3vDShDGQ'