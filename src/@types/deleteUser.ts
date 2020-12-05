import { definitions } from './api.definitions';

export namespace deleteUser {
  export type deleteUser = {
    url: '/user/{username}';
    method: 'delete';

    inPath: {
      username: string;
    };

    responses: {
      400: 'Invalid username supplied';

      404: 'User not found';
    };
    responseType: 'application/json|application/xml';
  };
}
