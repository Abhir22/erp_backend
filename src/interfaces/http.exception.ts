import { HttpStatus } from "../shared/enums/http-status.enum";

export class HttpException extends Error {
  public message: string;
  public status: number;
  public errors: string | string[] | undefined;

  constructor(
    status: number | HttpStatus,
    message: string,
    errors?: string | string[]
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;
  }
}
