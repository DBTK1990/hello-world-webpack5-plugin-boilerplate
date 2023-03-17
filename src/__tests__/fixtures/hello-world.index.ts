const test = 'hello world';
class testClass {
    testMethod() {
        console.log(test,"from class");
    }
}
function testFunction() {
    console.log(test,"from function");
}

export const constProp = DynamicExport<typeof test>(test);
export const classProp = DynamicExport<testClass>(testClass);
export const functionProp = DynamicExport<typeof testFunction>(testFunction);