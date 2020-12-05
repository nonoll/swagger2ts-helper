import { definitions } from './api.definitions';

export namespace placeOrder {
  export type placeOrder = {
    url: '/store/order';
    method: 'post';

    responses: {
      200: definitions['Order'];

      400: 'Invalid Order';
    };
    responseType: 'application/json|application/xml';
  };
}
