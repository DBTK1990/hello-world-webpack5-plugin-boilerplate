import webpackCore, { WebpackOptionsNormalized, EntryNormalized } from "webpack";
import path from "path";
export function compile(entry: any, options: any, callback: (...arg: any[]) => any) {
    const noOutputPath = !options.output || !options.output.path;
    const webpack = webpackCore;
    options = webpack.config.getNormalizedWebpackOptions(options);
    if (!options.mode) options.mode = "production";
    options.entry = entry;
    options.context = options.context ?? path.resolve(__dirname, "fixtures");
    if (noOutputPath) options.output.path = "/";
    options.output.pathinfo = true;
    options.optimization = {
        minimize: false
    };
    const logs = {
        mkdir: [],
        writeFile: []
    };

    const c = webpack(options);
    const files = {};
    // @ts-ignore
    c.outputFileSystem = {
        // @ts-ignore
        mkdir(path, callback) {
            // @ts-ignore
            logs.mkdir.push(path);
            const err = new Error();
            // @ts-ignore
            err.code = "EEXIST";
            callback(err);
        },
        // @ts-ignore
        writeFile(name, content, callback) {
            // @ts-ignore
            logs.writeFile.push(name, content);
            // @ts-ignore
            files[name] = content.toString("utf-8");
            callback();
        },
        // @ts-ignore
        stat(path, callback) {
            callback(new Error("ENOENT"));
        }
    };
    c.hooks.compilation.tap(
        "CompilerTest",
        // @ts-ignore
        compilation => (compilation.bail = true)
    );
    // @ts-ignore
    c.run((err, stats) => {
        if (err) throw err;
        expect(typeof stats).toBe("object");
        const compilation = stats!.compilation;
        // @ts-ignore
        stats = stats!.toJson({
            modules: true,
            reasons: true
        });
        expect(typeof stats).toBe("object");
        expect(stats).toHaveProperty("errors");
        // @ts-ignore
        expect(Array.isArray(stats.errors)).toBe(true);
        // @ts-ignore
        if (stats.errors.length > 0) {
            // @ts-ignore
            expect(stats.errors[0]).toBeInstanceOf(Error);
            // @ts-ignore
            throw stats.errors[0];
        }
        // @ts-ignore
        stats.logs = logs;
        // @ts-ignore
        c.close(err => {
            // @ts-ignore
            if (err) return callback(err);
            // @ts-ignore
            callback(stats, files, compilation);
        });
    });
}
