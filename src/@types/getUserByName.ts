import { definitions } from './api.definitions';

export namespace getUserByName {
  export type getUserByName = {
    url: '/user/{username}';
    method: 'get';

    inPath: {
      username: string;
    };

    responses: {
      200: definitions['User'];

      400: 'Invalid username supplied';

      404: 'User not found';
    };
    responseType: 'application/json|application/xml';
  };
}
