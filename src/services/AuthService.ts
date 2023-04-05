import { User, UserAttribute } from "../model/Model";

export class AuthService {
  public async login(
    userName: string,
    password: string
  ): Promise<User | undefined> {
    return { userName: "abdalla", email: "abd@gmail.com" };
  }

  public async getUserAttributes(user: User): Promise<UserAttribute[]> {
    const result: UserAttribute[] = [];
    result.push(
      {
        name: "description",
        value: "test",
      },
      {
        name: "job",
        value: "engineer",
      },
      {
        name: "age",
        value: "23",
      },
      {
        name: "experience",
        value: "entry level",
      }
    );
    return result;
  }
}
