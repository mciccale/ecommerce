class LoginError extends Error {
  name: string;
  message: string;
  status: number;

  constructor(message: string, status: number) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
  }
}

export default LoginError;
