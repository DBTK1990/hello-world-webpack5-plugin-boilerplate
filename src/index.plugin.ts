import { Compiler } from 'webpack';

class HelloWorldPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.shutdown.tap(HelloWorldPlugin.name, () => {
      console.log('Hello World');
    });
  }
}

export default HelloWorldPlugin;

