export interface IConfigEntry {
  definitions: string;
  response: string;
  request: string;
}

export interface IConfigOptions {
  wrapper: true;
  camelcase: true;
}

export interface IConfigOutput {
  definitions: string;
  response: string;
  request: string;
}

export interface IConfig {
  protocol: 'http' | 'https' | '',
  entry: IConfigEntry;
  options: IConfigOptions;
  output: IConfigOutput;
  prettier: any;
}

export const CONFIG_FILE_NAME = 'swagger2ts.config.json';
// lib/index.js 을 실행 기준으로
export const CONFIG_DEFAULT_RESPONSE_TEMPLATE_PATH = '../src/templates/response.template.ejs';
export const CONFIG_DEFAULT_REQUEST_TEMPLATE_PATH = '../src/templates/request.template.ejs';
