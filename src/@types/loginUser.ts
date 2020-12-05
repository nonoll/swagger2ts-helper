import { definitions } from './api.definitions';

export namespace loginUser {
  export type loginUser = {
    url: '/user/login';
    method: 'get';

    params: {
      username: string;

      password: string;
    };

    responses: {
      200: 'successful operation';

      400: 'Invalid username/password supplied';
    };
    responseType: 'application/json|application/xml';
  };
}
