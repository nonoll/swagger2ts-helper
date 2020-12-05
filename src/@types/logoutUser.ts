import { definitions } from './api.definitions';

export namespace logoutUser {
  export type logoutUser = {
    url: '/user/logout';
    method: 'get';

    responses: {
      default: 'successful operation';
    };
    responseType: 'application/json|application/xml';
  };
}
