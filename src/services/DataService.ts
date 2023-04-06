import { Space } from "../model/Model"

export class DataService {
  public async getSpaces(): Promise<Space[]> {
    const result: Space[] = []
    result.push(
      { location: "beer sheva", name: "ben gurion", spaceId: "123" },
      { location: "beer sheva", name: "ben gurion", spaceId: "456" },
      { location: "beer sheva", name: "ben gurion", spaceId: "789" }
    )
    return result
  }

  public async reserveSpace(spaceId: string): Promise<string | undefined> {
    if (spaceId == "123") {
      return "5555"
    } else {
      return undefined
    }
  }
}
