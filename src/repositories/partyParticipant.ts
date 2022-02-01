import { DbPort } from "src/ports";
import { PartyParticipant } from "src/models";

export const partyParticipantRepository = (db: DbPort) => {
  return {
    async create(
      data: Omit<
        PartyParticipant,
        "id" | "createdAt" | "updatedAt" | "deletedAt"
      >
    ) {
      return db.db.partyParticipant.create({ data });
    },
    async findByPartyIdAndUserId(partyId: string, userId: string) {
      return db.db.partyParticipant.findFirst({
        where: {
          userId: userId,
          partyId: partyId,
        },
      });
    },
    async deleteById(id: string) {
      return db.db.partyParticipant.delete({ where: { id } });
    },
  };
};

export type PartyParticipantRepositoryPort = ReturnType<
  typeof partyParticipantRepository
>;
