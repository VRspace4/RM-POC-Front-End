export enum ResponseMessageType {
  success,
  information,
  warning,
  error
}
export class ResponseMessage {
  constructor(
    public type: string = ResponseMessageType[ResponseMessageType.success],
    public title: string = '',
    public message: string = ''
  ) {}
}
