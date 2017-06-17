var TestClassA = (function () {
    function TestClassA(inputStr, inputNumber, inputStr2) {
        if (inputNumber === void 0) { inputNumber = 123; }
        if (inputStr2 === void 0) { inputStr2 = 'abc'; }
        this.inputStr = inputStr;
        this.inputNumber = inputNumber;
        this.inputStr2 = inputStr2;
    }
    return TestClassA;
}());
var testObj = {
    inputStr: 'xxx',
    inputNumber: 999
};
var testClassA = new TestClassA(testObj.inputStr, 55, 'ddd');
//# sourceMappingURL=temp.js.map