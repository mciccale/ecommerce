interface IUser {
  username: string;
  email: string;
}

export interface IRequestUser extends IUser {
  password: string;
}

export interface IDatabaseUser extends IUser {
  passwordHash: string;
}
