import {ValidateWebhook} from "../../src";

describe('ValidateWebhook', () => {
    const TEST_CORRECT_TOKEN = 'TEST_CORRECT';
    const TEST_INCORRECT_TOKEN = 'TEST_INCORRECT';
    const TEST_CHALLENGE = 'TEST_CHALLENGE';
    const mockSend = jest.fn();
    const mockStatus = jest.fn();
    const mockSendStatus = jest.fn();
    const res = {
        send: mockSend,
        sendStatus: mockSendStatus,
        status: mockStatus
    };
    const req = {
        query: {
            'hub.verify_token': TEST_CORRECT_TOKEN,
            'hub.challenge': TEST_CHALLENGE
        }
    };

    beforeEach(() => {
       jest.resetAllMocks();
    });

    describe('validate', () => {
       it('send 403 given no token', () => {
          ValidateWebhook.validate(req, res);

          expect(mockSendStatus).toBeCalled();
          expect(mockSendStatus.mock.calls.length).toEqual(1);
          expect(mockStatus.mock.calls.length).toEqual(0);
       });

       it('send 404 given no req verify token', () => {
           const req = {
               query: {
                   'hub.challenge': TEST_CHALLENGE
               }
           };
           process.env.FB_VERIFICATION_TOKEN = TEST_CORRECT_TOKEN;

           ValidateWebhook.validate(req, res);

           expect(mockSendStatus).toBeCalled();
           expect(mockSendStatus).lastCalledWith(403);
           expect(mockStatus.mock.calls.length).toEqual(0);
           expect(mockSend.mock.calls.length).toEqual(0);
       });

       it('send 403 given token mismatch', () => {
           process.env.FB_VERIFICATION_TOKEN = TEST_INCORRECT_TOKEN;

           ValidateWebhook.validate(req, res);

           expect(mockSendStatus).toBeCalled();
           expect(mockSendStatus).lastCalledWith(403);
           expect(mockStatus.mock.calls.length).toEqual(0);
           expect(mockSend.mock.calls.length).toEqual(0);
       });

       it('send 200 given correct verification', () => {
           process.env.FB_VERIFICATION_TOKEN = TEST_CORRECT_TOKEN;
           mockStatus.mockReturnValue(res);

           ValidateWebhook.validate(req, res);

           expect(mockSend).toBeCalled();
           expect(mockStatus).toBeCalled();
           expect(mockStatus).lastCalledWith(200);
           expect(mockSendStatus.mock.calls.length).toEqual(0);
       });
    });

    describe('validateWithToken', () => {
       it('send 403 given invalid token', () => {
          ValidateWebhook.validateWithToken(req, res, TEST_INCORRECT_TOKEN);

          expect(mockSendStatus).toBeCalled();
          expect(mockSendStatus).lastCalledWith(403);
          expect(mockStatus.mock.calls.length).toEqual(0);
          expect(mockSend.mock.calls.length).toEqual(0);
       });

       it('send 403 given no req verify_token', () => {
           const req = {
               query: {
                   'hub.challenge': TEST_CHALLENGE
               }
           };

           ValidateWebhook.validateWithToken(req, res, TEST_CORRECT_TOKEN);

           expect(mockSendStatus).toBeCalled();
           expect(mockSendStatus).lastCalledWith(403);
           expect(mockStatus.mock.calls.length).toEqual(0);
           expect(mockSend.mock.calls.length).toEqual(0);
       });

       it('send 403 given token mismatch', () => {
          ValidateWebhook.validateWithToken(req, res, TEST_INCORRECT_TOKEN);

           expect(mockSendStatus).toBeCalled();
           expect(mockSendStatus).lastCalledWith(403);
           expect(mockStatus.mock.calls.length).toEqual(0);
           expect(mockSend.mock.calls.length).toEqual(0);
       });

       it('send 200 given correct verification', () => {
           mockStatus.mockReturnValue(res);

           ValidateWebhook.validateWithToken(req, res, TEST_CORRECT_TOKEN);

           expect(mockSend).toBeCalled();
           expect(mockStatus).toBeCalled();
           expect(mockStatus).lastCalledWith(200);
           expect(mockSendStatus.mock.calls.length).toEqual(0);
       });
    });
});