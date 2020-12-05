import { definitions } from './api.definitions';

export namespace getOrderById {
  export type getOrderById = {
    url: '/store/order/{orderId}';
    method: 'get';

    inPath: {
      orderId: number;
    };

    responses: {
      200: definitions['Order'];

      400: 'Invalid ID supplied';

      404: 'Order not found';
    };
    responseType: 'application/json|application/xml';
  };
}
