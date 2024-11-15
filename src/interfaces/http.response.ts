import { HttpStatus } from '../shared/enums/http-status.enum';

export class HttpResponse {
  message: string;
  data: any;
  statusCode: number;

  constructor(message: string, data: any, statusCode = HttpStatus.OK) {
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
}