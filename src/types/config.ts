export interface IConfigEntry {
  definitions: string;
  types: string;
}

export interface IConfigOptions {
  wrapper: true;
  camelcase: true;
}

export interface IConfigOutput {
  definitions: string;
  namespace: string;
  types: string;
}

export interface IConfig {
  protocol: 'http' | 'https' | '',
  entry: IConfigEntry;
  options: IConfigOptions;
  output: IConfigOutput;
}

export const CONFIG_FILE_NAME = 'swagger2ts.config.json';
// lib/index.js 을 실행 기준으로
export const CONFIG_DEFAULT_TEMPLATE_PATH = '../src/templates/types.template.ejs';
