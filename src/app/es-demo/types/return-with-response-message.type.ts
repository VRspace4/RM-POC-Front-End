import {ResponseMessage} from "./response-message";

export class ReturnWithResponseMsg<T> {
  constructor(
    public responseMessage: ResponseMessage = null,
    public output: T = null
  ) {}
}
