export const joinParty = async (user, savePartyParticipant, findPartyParticipantByUserId, party) => {
  const partyParticipant = await findPartyParticipantByUserId(party.id, user.id)
  if (partyParticipant) {
    throw new Error('duplicate join!')
  }

  return savePartyParticipant(party, user);
};
