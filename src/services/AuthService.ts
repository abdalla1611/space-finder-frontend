import { User } from "../model/Model";

export class AuthService {
  public async login(
    userName: string,
    password: string
  ): Promise<User | undefined> {
    return { userName: "abdalla", email: "abd@gmail.com" };
  }
}
