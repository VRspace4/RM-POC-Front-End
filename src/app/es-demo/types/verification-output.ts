export class VerificationOutput {
  constructor(
    public passed: boolean = true,
    public failedMessage: string = ''
  ) {}
}
