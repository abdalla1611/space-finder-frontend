import { ICreateSpaceState } from '../components/spaces/CreateSpace'
import { Space } from '../model/Model'
import { S3, config } from 'aws-sdk'
import { config as appConfig } from './config'
import { GenerateRandomId } from '../utils/Utils'
config.update({
  region: appConfig.REGION,
})

export class DataService {
  public async createSpace(icreateSpace: ICreateSpaceState) {
    if (icreateSpace.photo) {
      const photoURL = await this.uploadPublicFile(
        icreateSpace.photo,
        appConfig.SPACES_PHOTO_BUCKET
      )
      console.log(photoURL)
      icreateSpace.photoURL = photoURL
      icreateSpace.photo = undefined
    }
    const requestUrl = appConfig.api.spacesUrl
    const requestOptions: RequestInit = {
      method: 'POST',
      body: JSON.stringify(icreateSpace),
    }
    const result = await fetch(requestUrl, requestOptions)
    const resultJSON = await result.json()

    return JSON.stringify(resultJSON.id)
    // throw new Error('Method not implemented.')
  }

  private async uploadPublicFile(file: File, bucketName: string) {
    const fileName = GenerateRandomId() + file.name
    const uploadResult = await new S3({ region: appConfig.REGION })
      .upload({
        Bucket: bucketName,
        Key: fileName,
        Body: file,
        ACL: 'public-read',
      })
      .promise()
    return uploadResult.Location
  }

  public async getSpaces(): Promise<Space[]> {
    const requestUrl = appConfig.api.spacesUrl
    const requestResult = await fetch(requestUrl, {
      method: 'GET',
    })
    const responseJSON = await requestResult.json()
    return responseJSON
  }

  public async reserveSpace(spaceId: string): Promise<string | undefined> {
    if (spaceId == '123') {
      return '5555'
    } else {
      return undefined
    }
  }
}
