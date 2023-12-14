class UserError {
  name: string;
  message: string;
  status: number;

  constructor(message: string, status: number) {
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
  }
}

export default UserError;
