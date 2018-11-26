describe('Profile', () => {
    let Profile: any;
    let client: any;
    const TEST_TOKEN = 'TEST_TOKEN';
    const TEST_TEXT = 'TEST_TEXT';
    const TEST_CALLBACK = () => {};
    const mockRequest = jest.fn();

    beforeEach(() => {
        jest.resetAllMocks();
        jest.mock('request', () => mockRequest);
        Profile = require('../../src/profile/Profile').Profile;
        client = new Profile(TEST_TOKEN);
    });

    describe('setGreetingMessage', () => {
        const correctPayload = {
            json: {
                greeting: {
                    text: TEST_TEXT
                },
                setting_type: 'greeting'
            },
            method: 'POST',
            qs: {
                access_token: TEST_TOKEN
            },
            url: 'https://graph.facebook.com/v3.1/me/thread_settings'
        };

        it('returns promise given no cb and generates correct request payload', () => {
            const result = client.setGreetingMessage(TEST_TEXT);

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });

        it('given cb no promise returned and correct payload generated', () => {
            const result = client.setGreetingMessage(TEST_TEXT, TEST_CALLBACK);

            expect(result instanceof Promise).toEqual(true);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });
    });

    describe('setGetStartedAction', () => {
        const correctPayload = {
            json: {
                call_to_actions: [
                    {
                        payload: TEST_TEXT
                    }
                ],
                setting_type: 'call_to_actions',
                thread_state: 'new_thread'
            },
            method: 'POST',
            qs: {
                access_token: TEST_TOKEN
            },
            url: 'https://graph.facebook.com/v3.1/me/thread_settings'
        };

        it('returns promise given no cb and generates correct payload', () => {
           const result = client.setGetStartedAction(TEST_TEXT);

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });

        it('given cb no promise returned and correct payload generated', () => {
            const result = client.setGetStartedAction(TEST_TEXT, TEST_CALLBACK);

            expect(result instanceof Promise).toEqual(true);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });
    });

    describe('setPersistentMenu', () => {
        const correctPayload = {
            json: {
                persistent_menu: [
                    {
                        call_to_actions: [TEST_TEXT],
                        locale: 'default'
                    }
                ],
                setting_type: 'call_to_actions',
                thread_state: 'existing_thread'
            },
            method: 'POST',
            qs: {
                access_token: TEST_TOKEN
            },
            url: 'https://graph.facebook.com/v3.1/me/messenger_profile'
        };

        it('returns promise given no cb and generates correct payload', () => {
            const result = client.setPersistentMenu([TEST_TEXT]);

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });

        it('given cb no promise returned and correct payload generated', () => {
            const result = client.setPersistentMenu([TEST_TEXT], TEST_CALLBACK);

            expect(result instanceof Promise).toEqual(true);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });
    });
});