import { ICreateSpaceState } from '../components/spaces/CreateSpace'
import { Space,User } from '../model/Model'
import { S3, config } from 'aws-sdk'
import { config as appConfig } from './config'
import { GenerateRandomId } from '../utils/Utils'
config.update({
  region: appConfig.REGION,
})

export class DataService {
  private user: User | undefined

  public setUser(user: User){
    this.user = user
  }
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
  private getUserIdToken(){
    if(this.user){
      return this.user.cognitoUser.getSignInUserSession()!.getIdToken().getJwtToken()
    }
    else{
      return ''
    }
  }
  public async getSpaces(): Promise<Space[]> {
    const requestUrl = appConfig.api.spacesUrl
    const requestResult = await fetch(requestUrl, {
      method: 'GET',
      headers:{
        'Authorization': this.getUserIdToken()
      }
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
