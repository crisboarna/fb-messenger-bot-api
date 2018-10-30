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

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('validate', () => {
        const req = {
            query: {
                'hub.verify_token': TEST_CORRECT_TOKEN,
                'hub.challenge': TEST_CHALLENGE
            }
        };

        it('send 403 given no token', () => {
            ValidateWebhook.validateServer(req, res);

            expect(mockSendStatus).toHaveBeenCalled();
            expect(mockSendStatus).toHaveBeenCalledTimes(1);
            expect(mockSendStatus).toHaveBeenCalledWith(403);
            expect(mockStatus).toHaveBeenCalledTimes(0);
        });

        it('send 403 given no req verify token', () => {
            const req = {
                query: {
                    'hub.challenge': TEST_CHALLENGE
                }
            };
            process.env.FB_VERIFICATION_TOKEN = TEST_CORRECT_TOKEN;

            ValidateWebhook.validateServer(req, res);

            expect(mockSendStatus).toHaveBeenCalled();
            expect(mockSendStatus).toHaveBeenCalledTimes(1);
            expect(mockSendStatus).toHaveBeenCalledWith(403);
            expect(mockStatus).toHaveBeenCalledTimes(0);
        });

        it('should send 403 given token mismatch', () => {
            process.env.FB_VERIFICATION_TOKEN = TEST_INCORRECT_TOKEN;

            ValidateWebhook.validateServer(req, res);

            expect(mockSendStatus).toHaveBeenCalled();
            expect(mockSendStatus).toHaveBeenCalledTimes(1);
            expect(mockSendStatus).toHaveBeenCalledWith(403);
            expect(mockStatus).toHaveBeenCalledTimes(0);
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

            ValidateWebhook.validateServer(req, res);

            expect(mockStatus).toHaveBeenCalled();
            expect(mockStatus).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockSend).toHaveBeenCalled();
            expect(mockSend).toHaveBeenCalledTimes(1);
            expect(mockSend).toHaveBeenCalledWith(TEST_CHALLENGE);
            expect(mockSendStatus).toHaveBeenCalledTimes(0);
        });

        it('should send 200 given correct verification and token', () => {
            const req = {
                query: {
                    'hub.verify_token': TEST_CORRECT_TOKEN,
                    'hub.challenge': TEST_CHALLENGE
                }
            };
            mockStatus.mockReturnValue(res);

            ValidateWebhook.validateServer(req, res, TEST_CORRECT_TOKEN);

            expect(mockStatus).toHaveBeenCalled();
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockStatus).toHaveBeenCalledTimes(1);
            expect(mockSend).toHaveBeenCalled();
            expect(mockSend).toHaveBeenCalledWith(TEST_CHALLENGE);
            expect(mockSend).toHaveBeenCalledTimes(1);
            expect(mockSendStatus).toHaveBeenCalledTimes(0);
        });
    });

    describe('validateLambda', () => {
        const mockCallback = jest.fn();
        const req = {
            queryStringParameters: {
                'hub.verify_token': TEST_CORRECT_TOKEN,
                'hub.challenge': TEST_CHALLENGE
            }
        };

        const res = {body: 403, isBase64Encoded: false, statusCode: 403};

        it('should send 403 given invalid token', () => {
            ValidateWebhook.validateLambda(req, mockCallback, TEST_INCORRECT_TOKEN);

            expect(mockStatus).toHaveBeenCalledTimes(0);
            expect(mockSendStatus).toHaveBeenCalledTimes(0);
            expect(mockCallback).toHaveBeenCalled();
            expect(mockCallback).toHaveBeenCalledTimes(1);
            expect(mockCallback).toHaveBeenCalledWith(null, res);
        });

        it('send 403 given no req verify token', () => {
            const req = {
                queryStringParameters: {
                    'hub.challenge': TEST_CHALLENGE
                }
            };
            ValidateWebhook.validateLambda(req, mockCallback, TEST_CORRECT_TOKEN);

            expect(mockCallback).toHaveBeenCalled();
            expect(mockCallback).toHaveBeenCalledWith(null, res);
            expect(mockSendStatus).toHaveBeenCalledTimes(0);
            expect(mockStatus).toHaveBeenCalledTimes(0);
        });

        it('should send 403 given token mismatch', () => {
            ValidateWebhook.validateLambda(req, mockCallback, TEST_INCORRECT_TOKEN);

            expect(mockCallback).toHaveBeenCalled();
            expect(mockCallback).toHaveBeenCalledWith(null, res);
            expect(mockSendStatus).toHaveBeenCalledTimes(0);
            expect(mockStatus).toHaveBeenCalledTimes(0);
        });

        it('should send 200 given correct verification', () => {
            const req = {
                queryStringParameters: {
                    'hub.verify_token': TEST_CORRECT_TOKEN,
                    'hub.challenge': TEST_CHALLENGE
                }
            };
            process.env.FB_VERIFICATION_TOKEN = TEST_CORRECT_TOKEN;
            const res = {body: "TEST_CHALLENGE", isBase64Encoded: false, statusCode: 200};

            ValidateWebhook.validateLambda(req, mockCallback);

            expect(mockCallback).toHaveBeenCalled();
            expect(mockCallback).toHaveBeenCalledWith(null, res);
            expect(mockSendStatus).toHaveBeenCalledTimes(0);
            expect(mockStatus).toHaveBeenCalledTimes(0);
        });
    });

    describe('validateMessageIntegrity', () => {
        const sha1Signature = `sha1=7327d5f32362a5d38e8eb7e52d6d8f77cf6e952e`;

        it('given no xhubsignature return false', () => {
            const result = ValidateWebhook.validateMessageIntegrity(0 as any);
            expect(result).toEqual(false);
        });

        it('given invalid xhubsignature return false', () => {
            const result = ValidateWebhook.validateMessageIntegrity([] as any);
            expect(result).toEqual(false);
        });

        it('given invalid xhubsignature sha1 format return false', () => {
            const invalidSignature = 'sha1wegedrfdgvwsrdgv';
            const result = ValidateWebhook.validateMessageIntegrity(invalidSignature);
            expect(result).toEqual(false);
        });

        it('given no FB_APP_SECRET return false', () => {
            const result = ValidateWebhook.validateMessageIntegrity(sha1Signature);
            expect(result).toEqual(false);
        });

        it('given parameter FB_APP_SECRET and invalid signature return false', () => {
            const result = ValidateWebhook.validateMessageIntegrity(sha1Signature, TEST_INCORRECT_TOKEN);
            expect(result).toEqual(false);
        });

        it('given parameter FB_APP_SECRET and valid signature return true', () => {
            const result = ValidateWebhook.validateMessageIntegrity(sha1Signature, TEST_CORRECT_TOKEN);
            expect(result).toEqual(true);
        });

        it('given environment FB_APP_SECRET and invalid signature return false', () => {
            const incorrectSignature = "sha1=32t4gerdsdfsd";
            process.env.FB_APPLICATION_SECRET = TEST_CORRECT_TOKEN;
            const result = ValidateWebhook.validateMessageIntegrity(incorrectSignature);
            expect(result).toEqual(false);
            delete process.env.FB_APPLICATION_SECRET;
        });

        it('given environment FB_APP_SECRET and valid signature return true', () => {
            process.env.FB_APPLICATION_SECRET = TEST_CORRECT_TOKEN;
            const result = ValidateWebhook.validateMessageIntegrity(sha1Signature);
            expect(result).toEqual(true);
            delete process.env.FB_APPLICATION_SECRET;
        });
    });
});