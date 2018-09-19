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
           expect(mockSendStatus).toBeCalledWith(403);
           expect(mockSendStatus.mock.calls.length).toEqual(1);
          expect(mockStatus.mock.calls.length).toEqual(0);
       });

       it('send 403 given no req verify token', () => {
           const req = {
               query: {
                   'hub.challenge': TEST_CHALLENGE
               }
           };
           ValidateWebhook.validate(req, res);
           process.env.FB_VERIFICATION_TOKEN = TEST_CORRECT_TOKEN;
           expect(mockSendStatus).toBeCalled();
           expect(mockSendStatus).toBeCalledWith(403);
           expect(mockSendStatus.mock.calls.length).toEqual(1);
           expect(mockStatus.mock.calls.length).toEqual(0);
       });

        it('should send 403 given token mismatch', () => {
            process.env.FB_VERIFICATION_TOKEN = TEST_INCORRECT_TOKEN;
            ValidateWebhook.validate(req, res);
            expect(mockSendStatus).toBeCalled();
            expect(mockSendStatus).toBeCalledWith(403);
            expect(mockSendStatus.mock.calls.length).toEqual(1);
            expect(mockStatus.mock.calls.length).toEqual(0);
        });

        it('should send 200 given correct verification', () => {
            const req = {
                query: {
                    'hub.verify_token': TEST_CORRECT_TOKEN,
                    'hub.challenge': TEST_CHALLENGE
                }
            };
            mockStatus.mockReturnValue(res);
            process.env.FB_VERIFICATION_TOKEN = TEST_CORRECT_TOKEN;
            ValidateWebhook.validate(req, res);
            expect(mockStatus).toBeCalled();
            expect(mockStatus).toBeCalledWith(200);
            expect(mockStatus.mock.calls.length).toEqual(1);
            expect(mockSend).toBeCalled();
            expect(mockSend).toBeCalledWith(TEST_CHALLENGE);
            expect(mockSend.mock.calls.length).toEqual(1);
            expect(mockSendStatus.mock.calls.length).toEqual(0);
        });
    });

    describe('validateWithToken', () => {
        it('should send 403 given invalid token', () => {
            ValidateWebhook.validateWithToken(req, res, TEST_INCORRECT_TOKEN);
            expect(mockSendStatus).toBeCalled();
            expect(mockSendStatus).toBeCalledWith(403);
            expect(mockSendStatus.mock.calls.length).toEqual(1);
            expect(mockStatus.mock.calls.length).toEqual(0);
        });

        it('send 403 given no req verify token', () => {
            const req = {
                query: {
                    'hub.challenge': TEST_CHALLENGE
                }
            };
            ValidateWebhook.validateWithToken(req, res, TEST_CORRECT_TOKEN);
            expect(mockSendStatus).toBeCalled();
            expect(mockSendStatus).toBeCalledWith(403);
            expect(mockSendStatus.mock.calls.length).toEqual(1);
            expect(mockStatus.mock.calls.length).toEqual(0);
        });

        it('should send 403 given token mismatch', () => {
            ValidateWebhook.validateWithToken(req, res, TEST_INCORRECT_TOKEN);
            expect(mockSendStatus).toBeCalled();
            expect(mockSendStatus).toBeCalledWith(403);
            expect(mockSendStatus.mock.calls.length).toEqual(1);
            expect(mockStatus.mock.calls.length).toEqual(0);
        });

        it('should send 200 given correct verification', () => {
            const req = {
                query: {
                    'hub.verify_token': TEST_CORRECT_TOKEN,
                    'hub.challenge': TEST_CHALLENGE
                }
            };
            mockStatus.mockReturnValue(res);
            ValidateWebhook.validateWithToken(req, res, TEST_CORRECT_TOKEN);
            expect(mockStatus).toBeCalled();
            expect(mockStatus).toBeCalledWith(200);
            expect(mockStatus.mock.calls.length).toEqual(1);
            expect(mockSend).toBeCalled();
            expect(mockSend).toBeCalledWith(TEST_CHALLENGE);
            expect(mockSend.mock.calls.length).toEqual(1);
            expect(mockSendStatus.mock.calls.length).toEqual(0);
        });
    });
});