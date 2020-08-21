import chalk from 'chalk';
import figlet from 'figlet';
import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import defaultConfig from './config/swagger2ts.config.json';
import swaggerToTS from '@manifoldco/swagger-to-ts';
import { format } from 'prettier';

import { IConfig, CONFIG_FILE_NAME, CONFIG_DEFAULT_RESPONSE_TEMPLATE_PATH, CONFIG_DEFAULT_REQUEST_TEMPLATE_PATH } from './types';
import { SwaggerToTSOptions } from '@manifoldco/swagger-to-ts/dist-types/types';
import { renderFile } from 'ejs';

const Steps = require('cli-step');
 
const totalNumberOfSteps = 4;
const steps = new Steps(totalNumberOfSteps);

let prettierOptions = {};

console.clear();
console.log(
  chalk.blue(
    figlet.textSync('swagger2ts-helper', { horizontalLayout: 'fitted', verticalLayout: 'fitted' })
  )
);

const getCliOptions = (name: string): string => {
  name += '=';
  const index = process.argv.findIndex((v) => v.startsWith(name));
  if (process.argv[index]) {
    return process.argv[index].substring(name.length);
  } else {
    return '';
  }
}

export const readConfig = async(): Promise<IConfig> => {
  const step1 = steps.advance('Check Configs', 'mag').start();

  return new Promise((resolve, reject) => {
    const configPath = getCliOptions('config') || path.resolve(process.cwd(), CONFIG_FILE_NAME);
    let inputConfig = '';

    try {
      inputConfig = JSON.parse(readFileSync(configPath, { encoding: 'utf-8' }) || '');
    } catch (e) {
      console.log(e);
    }

    const config = Object.assign({}, defaultConfig, inputConfig);

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

    resolve(config as IConfig);
  });
}

export const fetchSwaggerJSON = async ({ protocol, entry }: IConfig): Promise<any> => {
  const step2 = steps.advance('Fetching Swagger', 'truck').start();

  const loader = protocol === 'https' ? require('https') : require('http');
  return new Promise((resolve, reject) => {
    loader
      .get(entry.definitions, (response: any) => {
        let data = '';
        response.on('data', (d: string) => (data += d));
        response.on('end', () => {
          data = JSON.stringify(data);
          // Page«T» 형태로 선언되어 있어, 치환 처리
          data = data.replace(/«/g, '<').replace(/»/g, '>');

          step2.success('Fetching Swagger', 'white_check_mark');

          resolve(JSON.parse(data));
        });
      })
      .on('error', (e: any) => {
        step2.error('Fetching Swagger', 'x');
        console.log(e);
        reject(e);
      });
  });
};

export const parseSwaggerToTS = (input: string, { options }: IConfig): Promise<string> => {
  const step3 = steps.advance('Parsing Swagger', 'link').start();
  return new Promise((resolve, reject) => {
    let output = '';
    try {
      output = swaggerToTS(JSON.parse(input), options as SwaggerToTSOptions);
    } catch (e) {
      step3.error('Parsing Swagger', 'x');
      console.error(e);
      reject(e);
      return;
    }
    step3.success('Parsing Swagger', 'white_check_mark');
    resolve(output);
  });
};

export const output = async (definitions: string, rawDefinitions: string, config: IConfig): Promise<boolean> => {
  const step4 = steps.advance('Generate Typescript', 'package').start();
  const rawData = JSON.parse(rawDefinitions);
  return new Promise(async (resolve, reject) => {
    try {
      writeFileSync(config.output.definitions, format(definitions, prettierOptions), 'utf-8');
  
      const definitionsRelPath = path.relative(
        path.relative(process.cwd(), config.output.response),
        config.output.definitions
      );
      const entryResponsePath = (() => {
        if (config.entry.response) {
          return path.relative(process.cwd(), config.entry.response);
        } else {
          return path.resolve(__dirname, CONFIG_DEFAULT_RESPONSE_TEMPLATE_PATH);
        }
      })();
      const responseRendered = await renderFile(entryResponsePath, {
        definitionsRelPath,
        definitions: Object.keys(rawData.definitions),
        rawDefinitions: rawData.definitions,
        rawData
      });
      writeFileSync(config.output.response, format(responseRendered.replace(/\n\n/g, '\n'), prettierOptions), 'utf-8');

      const entryRequestPath = (() => {
        if (config.entry.response) {
          return path.relative(process.cwd(), config.entry.request);
        } else {
          return path.resolve(__dirname, CONFIG_DEFAULT_REQUEST_TEMPLATE_PATH);
        }
      })();
      const requestRendered = await renderFile(entryRequestPath, {
        definitionsRelPath,
        paths: rawData.paths,
        rawData
      });
      writeFileSync(config.output.request, format(requestRendered, prettierOptions), 'utf-8');
  
      step4.success('Generate Typescript', 'white_check_mark');
      resolve(true);
    } catch (e) {
      step4.error('Generate Typescript', 'x');
      console.error(e);
      reject(e);
    }
  });
};

(async () => {
  steps.startRecording();

  const config = await readConfig();
  const rawDefinitions = await fetchSwaggerJSON(config);
  const definitions = await parseSwaggerToTS(rawDefinitions, config);
  await output(definitions, rawDefinitions, config);

  const nanoSecs = steps.stopRecording();
  console.log('');
  console.log(`  ${chalk.green('Success')} Saved Swagger definitions.`);
  console.log(`  ✨  Done in ${Math.round(nanoSecs / (1e9))}s.`);
})();
