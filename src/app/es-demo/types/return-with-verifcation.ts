import {VerificationOutput} from "./verification-output";

export class ReturnWithVerification<T> {
  constructor(
    public verificationResult: VerificationOutput = null,
    public output: T = null
  ) {}
}
