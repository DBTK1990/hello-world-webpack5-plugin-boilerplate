import { Compiler, Resolver } from 'webpack';
import HelloWorldPlugin from '../index.plugin';
import { compile } from './webpack-mock/compiler.mock';
import path from 'path';
describe('HelloWorldPlugin', () => {


    it("should compile a single file to deep output", done => {
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

        compile(
            "./hello-world.index.ts",
            {
                context: path.resolve(__dirname, "fixtures"),
                output: {
                    path: "/what",
                    filename: "the/hell.js"
                },
                plugins: [
                    new HelloWorldPlugin()
                ]
            },
            (stats, files) => {
                expect(consoleLogSpy).toHaveBeenCalledWith('Hello World');
                done();
            }
        );
    });

});