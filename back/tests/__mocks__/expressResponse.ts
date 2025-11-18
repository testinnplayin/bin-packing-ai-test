import { Response } from 'express';

/**
 * Creates a mocked Express Response object with jest spies
 * for `status` and `json`, allowing fluent chaining
 * (e.g. `res.status(200).json({...})`).
 */
type MockResponse = Response & {
  status: jest.Mock;
  json: jest.Mock;
};

export const createMockResponse = (): MockResponse => {
  const res = {} as MockResponse;

  res.status = jest
    .fn()
    .mockImplementation(function (this: Response, _statusCode: number) {
      return this;
    }) as jest.Mock;

  res.json = jest
    .fn()
    .mockImplementation(function (this: Response, _body: unknown) {
      return this;
    }) as jest.Mock;

  return res;
};
