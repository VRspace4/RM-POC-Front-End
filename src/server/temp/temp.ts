class TestClassA {
  constructor(
    public inputStr: string,
    public inputNumber = 123,
    public inputStr2 = 'abc'
  ) {}
}

const testObj = {
  inputStr: 'xxx',
  inputNumber: 999
};

const testClassA = new TestClassA(testObj.inputStr, 55, 'ddd');
