describe('Utils', () => {
    let utils: any;
    let mockRequest: any;

    afterEach(() => {
        jest.resetAllMocks();
        jest.resetModules();
    });

    describe('getRequestOptions', () => {
        const requestOptions = {
            url: 'https://graph.facebook.com/v3.1/',
            qs: {
                access_token: undefined,
            },
            method: undefined,
        };

        it('returns expected request payload', () => {
            utils = require('../../src/util/Utils').Utils;
            expect(utils.getRequestOptions()).toEqual(requestOptions);
        });
    });

   describe('sendMessage', () => {
       const options = { qs: { access_token: undefined } };
       const requestData: any = { token: 0 };
       const TEST_ERROR = 'TEST_ERROR';
       const TEST_BODY = {success: 'SUCCESS_TEST'};
       const TEST_REQUEST = {};

       describe('callbacks', () => {
           const mockCallback = jest.fn();

           it('calls cb with error given error', () => {
               mockRequest = (_req:any, cb: any) => cb(TEST_ERROR);
               jest.mock('request', () => mockRequest);
               utils = require('../../src/util/Utils').Utils;

               const result = utils.sendMessage(options, requestData, mockCallback);

               expect(result instanceof Promise).toEqual(true);
               expect(mockCallback).toHaveBeenCalled();
               expect(mockCallback).toHaveBeenCalledWith(TEST_ERROR);
           });

           it('calls cb with body error given no error and body with error', () => {
               mockRequest = (_req:any, cb: any) => cb(null, TEST_REQUEST, {error: TEST_ERROR});
               jest.mock('request', () => mockRequest);
               utils = require('../../src/util/Utils').Utils;

               const result = utils.sendMessage(options, requestData, mockCallback);

               expect(result instanceof Promise).toEqual(true);
               expect(mockCallback).toHaveBeenCalled();
               expect(mockCallback).toHaveBeenCalledWith(TEST_ERROR);
           });

           it('calls cb with body given no error and body', () => {
               requestData.proxy = 'TEST_URL';
               mockRequest = (_req:any, cb: any) => cb(null, TEST_REQUEST, TEST_BODY);
               jest.mock('request', () => mockRequest);
               utils = require('../../src/util/Utils').Utils;

               const result = utils.sendMessage(options, requestData, mockCallback);

               expect(result instanceof Promise).toEqual(true);
               expect(mockCallback).toHaveBeenCalled();
               expect(mockCallback).toHaveBeenCalledWith(null, TEST_BODY);
           });
       });

       describe('promises', () => {
          it('rejected promise given error', async () => {
              mockRequest = (_req:any, cb: any) => cb(TEST_ERROR);
              jest.mock('request', () => mockRequest);
              utils = require('../../src/util/Utils').Utils;

              const result = utils.sendMessage(options, requestData);
              await expect(result).rejects.toEqual(TEST_ERROR);
          });

           it('resolves body object', async () => {
               mockRequest = (_req:any, cb: any) => cb(null, TEST_REQUEST, TEST_BODY);
               jest.mock('request', () => mockRequest);
               utils = require('../../src/util/Utils').Utils;

               const result = utils.sendMessage(options, requestData);
               await expect(result).resolves.toEqual(TEST_BODY);
           });

           it('resolves body string to object and resolves', async () => {
               mockRequest = (_req:any, cb: any) => cb(null, TEST_REQUEST, JSON.stringify(TEST_BODY));
               jest.mock('request', () => mockRequest);
               utils = require('../../src/util/Utils').Utils;

               const result = utils.sendMessage(options, requestData);
               await expect(result).resolves.toEqual(TEST_BODY);

           });

           it('resolves body string to object and rejects given body has error', async () => {
               const TEST_BODY = {error: {message: TEST_ERROR}};
               mockRequest = (_req:any, cb: any) => cb(null, TEST_REQUEST, JSON.stringify(TEST_BODY));
               jest.mock('request', () => mockRequest);
               utils = require('../../src/util/Utils').Utils;

               const result = utils.sendMessage(options, requestData);
               await expect(result).rejects.toEqual(TEST_ERROR);
           });
       });
   });

   describe('getProxyData', () => {
       const TEST_TOKEN = 'TEST_TOKEN';
       const TEST_URL = 'TEST_URL';
       const TEST_PORT = 'TEST_PORT';
       const requestData = {token: TEST_TOKEN};

       it('given bad proxy object throw error', () => {
           utils = require('../../src/util/Utils').Utils;
           expect(() => utils.getProxyData(requestData, TEST_URL)).toThrow('Invalid Proxy object given, expected hostname and port');
       });

       it('given bad proxy object host properties, throw error', () => {
           utils = require('../../src/util/Utils').Utils;
           expect(() => utils.getProxyData(requestData, {host: TEST_URL, port: TEST_PORT})).toThrow('Invalid Proxy object given, expected hostname and port');
       });

       it('given bad proxy object port properties, throw error', () => {
           utils = require('../../src/util/Utils').Utils;
           expect(() => utils.getProxyData(requestData, {hostname: TEST_URL, prt: TEST_PORT})).toThrow('Invalid Proxy object given, expected hostname and port');
       });

       it('given no proxy data, return request object as is', () => {

           utils = require('../../src/util/Utils').Utils;
           const result = utils.getProxyData(requestData);

           expect(result).toEqual(requestData);
       });

       it('given token and correct proxy data, return proper payload with proxy', () => {
           const EXPECTED_OUTPUT = {...requestData, proxy: `http://${TEST_URL}:${TEST_PORT}`};
           utils = require('../../src/util/Utils').Utils;

           const result = utils.getProxyData(requestData, {hostname: TEST_URL, port: TEST_PORT});

           expect(result).toEqual(EXPECTED_OUTPUT);
       });

       it('given token and correct proxy data with full http path, return proper payload with proxy', () => {
           const EXPECTED_OUTPUT = {...requestData, proxy: `http://${TEST_URL}:${TEST_PORT}`};
           utils = require('../../src/util/Utils').Utils;

           const result = utils.getProxyData(requestData, {hostname: `http://${TEST_URL}`, port: TEST_PORT});

           expect(result).toEqual(EXPECTED_OUTPUT);
       });
   });
});