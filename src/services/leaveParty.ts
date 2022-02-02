import { PartyParticipantRepositoryPort } from "src/repositories";

export type LeavePartyArgs = {
  partyId: string;
  userId: string;
  partyParticipantRepository: PartyParticipantRepositoryPort;
};

export const leaveParty = async (args: LeavePartyArgs) => {
  const { partyParticipantRepository } = args;
  
  const partyParticipant =
    await partyParticipantRepository.findByPartyIdAndUserId(
      args.partyId,
      args.userId
    );

  if (!partyParticipant) {
    return
  }
  
  return partyParticipantRepository.deleteById(partyParticipant.id);
};
