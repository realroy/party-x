import { DbPort } from 'src/ports'
import { Party } from 'src/models'

export const partyRepository = (dbAdapter: DbPort) => {
  return {
    create(data: Omit<Party, 'id' | 'createdAt' | 'updatedAt' | 'imgUrl' | 'deletedAt'>) {
      return dbAdapter.db.party.create({ data })
    },
    findManyAvailable() {
      return dbAdapter.db.party.findMany({
        include: {
          _count: {
            select: { partyParticipants: true }
          }
        }
      })
    }
  }
}

export type PartyRepositoryPort = ReturnType<typeof partyRepository>