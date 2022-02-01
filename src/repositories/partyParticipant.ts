import { DbPort } from 'src/ports'
import { PartyParticipant } from 'src/models'

export const partyParticipantRepository = (dbAdapter: DbPort) => {
  return {
    async create(data: Omit<PartyParticipant, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>) {
      const party = await dbAdapter.db.partyParticipant.create({ data })
      
      return party
    }
  }
}

export type PartyParticipantRepositoryPort = ReturnType<typeof partyParticipantRepository>