import { ICreateSpaceState } from '../components/spaces/CreateSpace'
import { Space } from '../model/Model'
export class DataService {
  public async createSpace(icreateSpace: ICreateSpaceState) {
    return '123'
    // throw new Error('Method not implemented.')
  }

  public async getSpaces(): Promise<Space[]> {
    const result: Space[] = []
    result.push(
      { location: 'beer sheva', name: 'ben gurion', spaceId: '123' },
      { location: 'beer sheva', name: 'ben gurion', spaceId: '456' },
      { location: 'beer sheva', name: 'ben gurion', spaceId: '789' }
    )
    return result
  }

  public async reserveSpace(spaceId: string): Promise<string | undefined> {
    if (spaceId == '123') {
      return '5555'
    } else {
      return undefined
    }
  }
}
