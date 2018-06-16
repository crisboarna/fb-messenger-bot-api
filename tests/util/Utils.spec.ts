describe('Utils', () => {
    describe('sendMessage', () => {
        let mockRequest:any;
        const options = { qs: { access_token: undefined } };
        const requestData = { token: 0 };
        const TEST_ERROR = 'TEST_ERROR';
        const TEST_BODY = {success: 'SUCCESS_TEST'};
        const TEST_REQUEST = {};

        beforeEach(() => {
            jest.resetAllMocks();
            jest.resetModules();
            jest.mock('request', () => mockRequest);
        });

        describe('callbacks', () => {
            const mockCallback = jest.fn();

            it('adds proxy data if provided', () => {
                const TEST_PROXY = 'TEST_PROXY';
                const requestData = {token: 0, proxy: TEST_PROXY};
                mockRequest = (req: any, cb:any) => {
                    expect(req.proxy).toEqual(TEST_PROXY);
                    cb(TEST_ERROR)
                };
                const utils = require('../../src/util/Utils').Utils;

                const result = utils.sendMessage(options, requestData, mockCallback);

                expect(result).toEqual(undefined);
                expect(mockCallback).toBeCalled();
                expect(mockCallback).lastCalledWith(TEST_ERROR);
            });

            it('calls cb with error given error', () => {
                mockRequest = (_req: any, cb:any) => cb(TEST_ERROR);
                const utils = require('../../src/util/Utils').Utils;

                const result = utils.sendMessage(options, requestData, mockCallback);

                expect(result).toEqual(undefined);
                expect(mockCallback).toBeCalled();
                expect(mockCallback).lastCalledWith(TEST_ERROR);
            });

            it('calls cb with body error given no error and body with error', () => {
                mockRequest = (_req: any, cb: any) => cb(null, TEST_REQUEST, {error: TEST_ERROR});
                const utils = require('../../src/util/Utils').Utils;

                const result = utils.sendMessage(options, requestData, mockCallback);

                expect(result).toEqual(undefined);
                expect(mockCallback).toBeCalled();
                expect(mockCallback).lastCalledWith(TEST_ERROR);
            });

            it('calls cb with body given success body', () => {
                mockRequest = (_req: any, cb: any) => cb(null, TEST_REQUEST, TEST_BODY);
                const utils = require('../../src/util/Utils').Utils;

                const result = utils.sendMessage(options, requestData, mockCallback);

                expect(result).toEqual(undefined);
                expect(mockCallback).toBeCalled();
                expect(mockCallback).lastCalledWith(null, TEST_BODY);
            });
        });

        describe('promises', () => {
            it('rejected promise given error', async () => {
                mockRequest = (_req: any, cb: any) => cb(TEST_ERROR);
                const utils = require('../../src/util/Utils').Utils;

                const result = utils.sendMessage(options, requestData);

                expect(result.constructor).toEqual(Promise);
                await expect(result).rejects.toEqual(TEST_ERROR);
            });

            it('resolves body constructor object', async () => {
                mockRequest = (_req: any, cb: any) => cb(null, TEST_REQUEST, TEST_BODY);

                const utils = require('../../src/util/Utils').Utils;

                const result = utils.sendMessage(options, requestData);

                expect(result.constructor).toEqual(Promise);
                await expect(result).resolves.toEqual(TEST_BODY);
            });

            it('resolves body constructor object and rejects govem body error', async () => {
                const TEST_BODY = {error: {message: TEST_ERROR}};
                mockRequest = (_req: any, cb: any) => cb(null, TEST_REQUEST, TEST_BODY);

                const utils = require('../../src/util/Utils').Utils;

                const result = utils.sendMessage(options, requestData);

                expect(result.constructor).toEqual(Promise);
                await expect(result).rejects.toEqual(TEST_ERROR);
            });

            it('given json payload resolves body constructor object', async () => {
                mockRequest = (_req: any, cb: any) => cb(null, TEST_REQUEST, JSON.stringify(TEST_BODY));

                const utils = require('../../src/util/Utils').Utils;

                const result = utils.sendMessage(options, requestData);

                expect(result.constructor).toEqual(Promise);
                await expect(result).resolves.toEqual(TEST_BODY);
            });

            it('given json payload resolves body constructor object and rejects govem body error', async () => {
                const TEST_BODY = {error: {message: TEST_ERROR}};
                mockRequest = (_req: any, cb: any) => cb(null, TEST_REQUEST, JSON.stringify(TEST_BODY));

                const utils = require('../../src/util/Utils').Utils;

                const result = utils.sendMessage(options, requestData);

                expect(result.constructor).toEqual(Promise);
                await expect(result).rejects.toEqual(TEST_ERROR);
            });
        })
    });

    describe('getProxyData', () => {
        const utils = require('../../src/util/Utils').Utils;
        const TEST_REQUEST_DATA = {url: 'TEST_URL'};

        it('given no proxyData returns as is object', () => {
            expect(utils.getProxyData(TEST_REQUEST_DATA, undefined)).toEqual(TEST_REQUEST_DATA);
        });

        it('given invalid proxy parameter, throws error', () => {
            expect(() => utils.getProxyData(TEST_REQUEST_DATA, 'TEST')).toThrow('Invalid Proxy object given, expected hostname and port');
        });

        it('given invalid proxy object', () => {
            expect(() => utils.getProxyData(TEST_REQUEST_DATA, {dummy:true})).toThrow('Invalid Proxy object given, expected hostname and port');
        });

        it('given good proxy object with no http, sets values on request', () => {
            const TEST_PORT = 12345;
            const TEST_HOSTNAME = 'TEST_HOSTNAME';
            const TEST_PROXY_DATA = {hostname: TEST_HOSTNAME, port: TEST_PORT};
            const EXPECTED_RESULT = {...TEST_REQUEST_DATA, proxy: `http://${TEST_HOSTNAME}:${TEST_PORT}`};
            expect(utils.getProxyData(TEST_REQUEST_DATA, TEST_PROXY_DATA)).toEqual(EXPECTED_RESULT);
        });

        it('given good proxy object, sets values on request', () => {
            const TEST_PORT = 12345;
            const TEST_HOSTNAME = 'http://TEST_HOSTNAME';
            const TEST_PROXY_DATA = {hostname: TEST_HOSTNAME, port: TEST_PORT};
            const EXPECTED_RESULT = {...TEST_REQUEST_DATA, proxy: `${TEST_HOSTNAME}:${TEST_PORT}`};
            expect(utils.getProxyData(TEST_REQUEST_DATA, TEST_PROXY_DATA)).toEqual(EXPECTED_RESULT);
        });
    });

    describe('getRequestOptions', () => {
       it('returns request options', () => {
            const requestOptions = {
               url: 'https://graph.facebook.com/v3.0/',
               qs: {
                   access_token: undefined,
               },
               method: undefined,
           };
           const utils = require('../../src/util/Utils').Utils;

           expect(utils.getRequestOptions()).toEqual(requestOptions);
       });
    });
});