"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.output = exports.parseSwaggerToTS = exports.fetchSwaggerJSON = exports.readConfig = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const figlet_1 = tslib_1.__importDefault(require("figlet"));
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = require("fs");
const swagger2ts_config_json_1 = tslib_1.__importDefault(require("./config/swagger2ts.config.json"));
const openapi_typescript_1 = tslib_1.__importDefault(require("openapi-typescript"));
const prettier_1 = require("prettier");
const types_1 = require("./types");
const ejs_1 = require("ejs");
const Steps = require('cli-step');
const totalNumberOfSteps = 4;
const steps = new Steps(totalNumberOfSteps);
let prettierOptions = {};
console.clear();
console.log(chalk_1.default.blue(figlet_1.default.textSync('swagger2ts-helper', { horizontalLayout: 'fitted', verticalLayout: 'fitted' })));
const getCliOptions = (name) => {
    name += '=';
    const index = process.argv.findIndex((v) => v.startsWith(name));
    if (process.argv[index]) {
        return process.argv[index].substring(name.length);
    }
    else {
        return '';
    }
};
exports.readConfig = async () => {
    const step1 = steps.advance('Check Configs', 'mag').start();
    return new Promise((resolve, reject) => {
        const configPath = getCliOptions('config') || path_1.default.resolve(process.cwd(), types_1.CONFIG_FILE_NAME);
        let inputConfig = '';
        try {
            inputConfig = JSON.parse(fs_1.readFileSync(configPath, { encoding: 'utf-8' }) || '');
        }
        catch (e) {
            console.log(e);
        }
        const config = Object.assign({}, swagger2ts_config_json_1.default, inputConfig);
        if (!config.entry.definitions) {
            step1.error('Check Configs', 'x');
            console.error('entry.definitions required. e.g: "definitions": "https://petstore.swagger.io/v2/swagger.json"');
            reject(new Error('entry.definitions required. e.g: "definitions": "https://petstore.swagger.io/v2/swagger.json"'));
            return;
        }
        if (!config.output.definitions) {
            step1.error('Check Configs', 'x');
            console.error('output.definitions required. e.g: "definitions": "./src/@types/api.definitions.ts"');
            reject(new Error('output.definitions required. e.g: "definitions": "./src/@types/api.definitions.ts"'));
            return;
        }
        if (!config.output.response) {
            step1.error('Check Configs', 'x');
            console.error('output.response required. e.g: "response": "./src/@types/api.response.ts"');
            reject(new Error('output.response required. e.g: "response": "./src/@types/api.response.ts"'));
            return;
        }
        if (!config.output.request) {
            step1.error('Check Configs', 'x');
            console.error('output.request required. e.g: "request": "./src/@types/api.request.ts"');
            reject(new Error('output.request required. e.g: "request": "./src/@types/api.request.ts"'));
            return;
        }
        config.protocol = config.protocol || config.entry.definitions.startsWith('https://') ? 'https' : 'http';
        prettierOptions = Object.assign({}, config.prettier || {}, { parser: 'typescript' });
        step1.success('Check Configs', 'white_check_mark');
        resolve(config);
    });
};
exports.fetchSwaggerJSON = async ({ protocol, entry }) => {
    const step2 = steps.advance('Fetching Swagger', 'truck').start();
    if (entry.jsonFile) {
        return new Promise((resolve, reject) => {
            try {
                const filePath = path_1.default.resolve(process.cwd(), entry.jsonFile);
                const output = fs_1.readFileSync(filePath, 'utf8').replace(/«/g, '<').replace(/»/g, '>');
                step2.success('Fetching Swagger', 'white_check_mark');
                resolve(output);
            }
            catch (e) {
                step2.error('Fetching Swagger', 'x');
                console.log(e);
                reject(e);
            }
        });
    }
    const loader = protocol === 'https' ? require('https') : require('http');
    return new Promise((resolve, reject) => {
        loader
            .get(entry.definitions, (response) => {
            let data = '';
            response.on('data', (d) => (data += d));
            response.on('end', () => {
                data = JSON.stringify(data);
                data = data.replace(/«/g, '<').replace(/»/g, '>');
                step2.success('Fetching Swagger', 'white_check_mark');
                resolve(JSON.parse(data));
            });
        })
            .on('error', (e) => {
            step2.error('Fetching Swagger', 'x');
            console.log(e);
            reject(e);
        });
    });
};
exports.parseSwaggerToTS = (input, { options }) => {
    const step3 = steps.advance('Parsing Swagger', 'link').start();
    return new Promise((resolve, reject) => {
        let output = '';
        try {
            output = openapi_typescript_1.default(JSON.parse(input), options);
        }
        catch (e) {
            step3.error('Parsing Swagger', 'x');
            console.error(e);
            reject(e);
            return;
        }
        step3.success('Parsing Swagger', 'white_check_mark');
        resolve(output);
    });
};
exports.output = async (definitions, rawDefinitions, config) => {
    const step4 = steps.advance('Generate Typescript', 'package').start();
    const rawData = JSON.parse(rawDefinitions);
    return new Promise(async (resolve, reject) => {
        try {
            fs_1.writeFileSync(config.output.definitions, prettier_1.format(definitions, prettierOptions), 'utf-8');
            const definitionsRelPath = path_1.default.relative(path_1.default.relative(process.cwd(), config.output.response), config.output.definitions);
            const entryResponsePath = (() => {
                if (config.entry.response) {
                    return path_1.default.relative(process.cwd(), config.entry.response);
                }
                else {
                    return path_1.default.resolve(__dirname, types_1.CONFIG_DEFAULT_RESPONSE_TEMPLATE_PATH);
                }
            })();
            const responseRendered = await ejs_1.renderFile(entryResponsePath, {
                definitionsRelPath,
                definitions: Object.keys(rawData.definitions),
                rawDefinitions: rawData.definitions,
                rawData
            });
            fs_1.writeFileSync(config.output.response, prettier_1.format(responseRendered.replace(/\n\n/g, '\n'), prettierOptions), 'utf-8');
            const entryRequestPath = (() => {
                if (config.entry.request) {
                    return path_1.default.relative(process.cwd(), config.entry.request);
                }
                else {
                    return path_1.default.resolve(__dirname, types_1.CONFIG_DEFAULT_REQUEST_TEMPLATE_PATH);
                }
            })();
            const requestRendered = await ejs_1.renderFile(entryRequestPath, {
                definitionsRelPath,
                paths: rawData.paths,
                rawData
            });
            fs_1.writeFileSync(config.output.request, prettier_1.format(requestRendered, prettierOptions), 'utf-8');
            step4.success('Generate Typescript', 'white_check_mark');
            resolve(true);
        }
        catch (e) {
            step4.error('Generate Typescript', 'x');
            console.error(e);
            reject(e);
        }
    });
};
(async () => {
    steps.startRecording();
    const config = await exports.readConfig();
    const rawDefinitions = await exports.fetchSwaggerJSON(config);
    const definitions = await exports.parseSwaggerToTS(rawDefinitions, config);
    await exports.output(definitions, rawDefinitions, config);
    const nanoSecs = steps.stopRecording();
    console.log('');
    console.log(`  ${chalk_1.default.green('Success')} Saved Swagger definitions.`);
    console.log(`  ✨  Done in ${Math.round(nanoSecs / (1e9))}s.`);
})();
