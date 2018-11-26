import {GenericTemplateBuilder} from "../../src/builders/templates";

describe('Client', () => {
    let client: any;
    let Client: any;
    const mockRequest = jest.fn();
    const TEST_ID = '0';
    const TEST_TOKEN = 'TEST_TOKEN';
    const TEST_TEXT = 'TEST_TEXT';
    const TEST_URL = 'http://www.google.com';
    const TEST_CALLBACK = () => {};
    const TEST_BUTTONS = [
        {
            'type': 'postback',
            'payload': TEST_TEXT,
            'title': TEST_TEXT
        },
        {
            'type': 'postback',
            'payload': TEST_TEXT,
            'title': TEST_TEXT
        }
    ];

    beforeEach(() => {
        jest.resetAllMocks();
        jest.mock('request', () => mockRequest);
        Client = require('../../src/client/Client').Client;
        client = new Client(TEST_TOKEN);
    });

    describe('markSeen', () => {
        const correctPayload = {
            json: {
                recipient: {
                    id: '0'
                },
                sender_action: 'mark_seen'
            },
            method: 'POST',
            qs: {
                access_token: 'TEST_TOKEN'
            },
            url: 'https://graph.facebook.com/v3.1/me/messages'
        };

        it('returns promise given no cb and generates correct payload', () => {
            const result = client.markSeen(TEST_ID);

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });

        it('given cb no promise returned and correct payload generated', () => {
            const result = client.markSeen(TEST_ID, TEST_CALLBACK);

            expect(result instanceof Promise).toEqual(true);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });
    });

    describe('toggleTyping', () => {
        describe('on', () => {
            const correctPayload = {
                json: {
                    recipient: {
                        id: "0"
                    },
                    sender_action: 'typing_on'
                },
                method: 'POST',
                qs: {
                    access_token: 'TEST_TOKEN'
                },
                url: 'https://graph.facebook.com/v3.1/me/messages'
            };

            it('returns promise given no cb and generates correct payload', () => {
                const result = client.toggleTyping(TEST_ID, true);

                expect(result.constructor).toEqual(Promise);
                expect(mockRequest).toHaveBeenCalled();
                expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
            });

            it('given cb no promise returned and correct payload generated', () => {
                const result = client.toggleTyping(TEST_ID, true, TEST_CALLBACK);

                expect(result instanceof Promise).toEqual(true);
                expect(mockRequest).toHaveBeenCalled();
                expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
            });
        });

        describe('off', () => {
            const correctPayload = {
                json: {
                    recipient: {
                        id: "0"
                    },
                    sender_action: 'typing_off'
                },
                method: 'POST',
                qs: {
                    access_token: 'TEST_TOKEN'
                },
                url: 'https://graph.facebook.com/v3.1/me/messages'
            };

            it('returns promise given no cb and generates correct payload', () => {
                const result = client.toggleTyping(TEST_ID, false);

                expect(result.constructor).toEqual(Promise);
                expect(mockRequest).toHaveBeenCalled();
                expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
            });

            it('given cb no promise returned and correct payload generated', () => {
                const result = client.toggleTyping(TEST_ID, false, TEST_CALLBACK);

                expect(result instanceof Promise).toEqual(true);
                expect(mockRequest).toHaveBeenCalled();
                expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
            });

            it('given cb no promise returned, no toggle provided and correct payload generated', () => {
                const result = client.toggleTyping(TEST_ID, TEST_CALLBACK);

                expect(result instanceof Promise).toEqual(true);
                expect(mockRequest).toHaveBeenCalled();
                expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
            });
        });
    });

    describe('getUserProfile', () => {
        const correctPayload = {
            method: 'GET',
            qs: {
                access_token: 'TEST_TOKEN',
                fields: `${TEST_TEXT},${TEST_TEXT}`
            },
            url: `https://graph.facebook.com/v3.1/${TEST_ID}`
        };

        it('returns promise given no cb and generates correct payload', () => {
            const result = client.getUserProfile(TEST_ID, [TEST_TEXT, TEST_TEXT]);

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });

        it('given cb no promise returned and correct payload generated', () => {
            const result = client.getUserProfile(TEST_ID, [TEST_TEXT, TEST_TEXT], TEST_CALLBACK);

            expect(result instanceof Promise).toEqual(true);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });

        it('returns promise given no cb and no fields and generates correct payload', () => {
            const correctPayload = {
                method: 'GET',
                qs: {
                    access_token: 'TEST_TOKEN',
                    fields: `first_name`
                },
                url: `https://graph.facebook.com/v3.1/${TEST_ID}`
            };

            const result = client.getUserProfile(TEST_ID);

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });
    });

    describe('sendTextMessage', () => {
        const correctPayload = {
            json: {
                message: {
                    text: TEST_TEXT
                },
                recipient: {
                    id: TEST_ID
                }
            },
            method: 'POST',
            qs: {
                access_token: 'TEST_TOKEN'
            },
            url: 'https://graph.facebook.com/v3.1/me/messages'
        };

        it('returns promise given no cb and generates correct payload', () => {
            const result = client.sendTextMessage(TEST_ID, TEST_TEXT);

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });

        it('given cb no promise returned and correct payload generated', () => {
            const result = client.sendTextMessage(TEST_ID, TEST_TEXT, TEST_CALLBACK);

            expect(result instanceof Promise).toEqual(true);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });
    });

    describe('sendImageMessage', () => {
        const correctPayloadId = {
            json: {
                message: {
                    attachment: {
                        payload: {
                            attachment_id: TEST_TEXT
                        },
                        type: 'image'
                    }
                },
                recipient: {
                    id: TEST_ID
                }
            },
            method: 'POST',
            qs: {
                access_token: 'TEST_TOKEN'
            },
            url: 'https://graph.facebook.com/v3.1/me/messages'
        };

        const correctPayloadUrl = {
            json: {
                message: {
                    attachment: {
                        payload: {
                            is_reusable: true,
                            url: TEST_URL
                        },
                        type: 'image'
                    }
                },
                recipient: {
                    id: TEST_ID
                }
            },
            method: 'POST',
            qs: {
                access_token: 'TEST_TOKEN'
            },
            url: 'https://graph.facebook.com/v3.1/me/messages'
        };

        it('returns promise given no cb, no url and generates correct payload', () => {
            const result = client.sendImageMessage(TEST_ID, TEST_TEXT);

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayloadId, expect.any(Function));
        });

        it('given cb no promise returned, no url and correct payload generated', () => {
            const result = client.sendImageMessage(TEST_ID, TEST_TEXT, TEST_CALLBACK);

            expect(result instanceof Promise).toEqual(true);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayloadId, expect.any(Function));
        });

        it('returns promise given no cb, url and generates correct payload', () => {
            const result = client.sendImageMessage(TEST_ID, TEST_URL);

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayloadUrl, expect.any(Function));
        });

        it('given cb no promise returned, url and correct payload generated', () => {
            const result = client.sendImageMessage(TEST_ID, TEST_URL, TEST_CALLBACK);

            expect(result instanceof Promise).toEqual(true);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayloadUrl, expect.any(Function));
        });
    });

    describe('sendAudioMessage', () => {
        const correctPayloadId = {
            json: {
                message: {
                    attachment: {
                        payload: {
                            attachment_id: TEST_TEXT
                        },
                        type: 'audio'
                    }
                },
                recipient: {
                    id: TEST_ID
                }
            },
            method: 'POST',
            qs: {
                access_token: 'TEST_TOKEN'
            },
            url: 'https://graph.facebook.com/v3.1/me/messages'
        };

        const correctPayloadUrl = {
            json: {
                message: {
                    attachment: {
                        payload: {
                            is_reusable: true,
                            url: TEST_URL
                        },
                        type: 'audio'
                    }
                },
                recipient: {
                    id: TEST_ID
                }
            },
            method: 'POST',
            qs: {
                access_token: 'TEST_TOKEN'
            },
            url: 'https://graph.facebook.com/v3.1/me/messages'
        };

        it('returns promise given no cb, no url and generates correct payload', () => {
            const result = client.sendAudioMessage(TEST_ID, TEST_TEXT);

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayloadId, expect.any(Function));
        });

        it('given cb no promise returned, no url and correct payload generated', () => {
            const result = client.sendAudioMessage(TEST_ID, TEST_TEXT, TEST_CALLBACK);

            expect(result instanceof Promise).toEqual(true);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayloadId, expect.any(Function));
        });

        it('returns promise given no cb, url and generates correct payload', () => {
            const result = client.sendAudioMessage(TEST_ID, TEST_URL);

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayloadUrl, expect.any(Function));
        });

        it('given cb no promise returned, url and correct payload generated', () => {
            const result = client.sendAudioMessage(TEST_ID, TEST_URL, TEST_CALLBACK);

            expect(result instanceof Promise).toEqual(true);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayloadUrl, expect.any(Function));
        });
    });

    describe('sendVideoMessage', () => {
        const correctPayloadId = {
            json: {
                message: {
                    attachment: {
                        payload: {
                            attachment_id: TEST_TEXT
                        },
                        type: 'video'
                    }
                },
                recipient: {
                    id: TEST_ID
                }
            },
            method: 'POST',
            qs: {
                access_token: 'TEST_TOKEN'
            },
            url: 'https://graph.facebook.com/v3.1/me/messages'
        };

        const correctPayloadUrl = {
            json: {
                message: {
                    attachment: {
                        payload: {
                            is_reusable: true,
                            url: TEST_URL
                        },
                        type: 'video'
                    }
                },
                recipient: {
                    id: TEST_ID
                }
            },
            method: 'POST',
            qs: {
                access_token: 'TEST_TOKEN'
            },
            url: 'https://graph.facebook.com/v3.1/me/messages'
        };

        it('returns promise given no cb, no url and generates correct payload', () => {
            const result = client.sendVideoMessage(TEST_ID, TEST_TEXT);

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayloadId, expect.any(Function));
        });

        it('given cb no promise returned, no url and correct payload generated', () => {
            const result = client.sendVideoMessage(TEST_ID, TEST_TEXT, TEST_CALLBACK);

            expect(result instanceof Promise).toEqual(true);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayloadId, expect.any(Function));
        });

        it('returns promise given no cb, url and generates correct payload', () => {
            const result = client.sendVideoMessage(TEST_ID, TEST_URL);

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayloadUrl, expect.any(Function));
        });

        it('given cb no promise returned, url and correct payload generated', () => {
            const result = client.sendVideoMessage(TEST_ID, TEST_URL, TEST_CALLBACK);

            expect(result instanceof Promise).toEqual(true);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayloadUrl, expect.any(Function));
        });
    });

    describe('sendFileMessage', () => {
        const correctPayloadId = {
            json: {
                message: {
                    attachment: {
                        payload: {
                            attachment_id: TEST_TEXT
                        },
                        type: 'file'
                    }
                },
                recipient: {
                    id: TEST_ID
                }
            },
            method: 'POST',
            qs: {
                access_token: 'TEST_TOKEN'
            },
            url: 'https://graph.facebook.com/v3.1/me/messages'
        };

        const correctPayloadUrl = {
            json: {
                message: {
                    attachment: {
                        payload: {
                            is_reusable: true,
                            url: TEST_URL
                        },
                        type: 'file'
                    }
                },
                recipient: {
                    id: TEST_ID
                }
            },
            method: 'POST',
            qs: {
                access_token: 'TEST_TOKEN'
            },
            url: 'https://graph.facebook.com/v3.1/me/messages'
        };

        it('returns promise given no cb, no url and generates correct payload', () => {
            const result = client.sendFileMessage(TEST_ID, TEST_TEXT);

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayloadId, expect.any(Function));
        });

        it('given cb no promise returned, no url and correct payload generated', () => {
            const result = client.sendFileMessage(TEST_ID, TEST_TEXT, TEST_CALLBACK);

            expect(result instanceof Promise).toEqual(true);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayloadId, expect.any(Function));
        });

        it('returns promise given no cb, url and generates correct payload', () => {
            const result = client.sendFileMessage(TEST_ID, TEST_URL);

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayloadUrl, expect.any(Function));
        });

        it('given cb no promise returned, url and correct payload generated', () => {
            const result = client.sendFileMessage(TEST_ID, TEST_URL, TEST_CALLBACK);

            expect(result instanceof Promise).toEqual(true);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayloadUrl, expect.any(Function));
        });
    });

    describe('sendButtonsMessage', () => {
        const correctPayload = {
            json: {
                message: {
                    attachment: {
                        payload: {
                            buttons: TEST_BUTTONS,
                            template_type: 'button',
                            text: TEST_TEXT
                        },
                        type: 'template'
                    }
                },
                recipient: {
                    id: TEST_ID
                }
            },
            method: 'POST',
            qs: {
                access_token: 'TEST_TOKEN'
            },
            url: 'https://graph.facebook.com/v3.1/me/messages'
        };

        it('returns promise given no cb and generates correct payload', () => {
            const result = client.sendButtonsMessage(TEST_ID, TEST_TEXT, TEST_BUTTONS);

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });

        it('given cb no promise returned and correct payload generated', () => {
            const result = client.sendButtonsMessage(TEST_ID, TEST_TEXT, TEST_BUTTONS, TEST_CALLBACK);

            expect(result instanceof Promise).toEqual(true);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });
    });

    describe('sendQuickReplyMessage', () => {
        const correctPayload = {
            json: {
                message: {
                    text: TEST_TEXT,
                    quick_replies: [TEST_TEXT]
                },
                recipient: {
                    id: TEST_ID
                }
            },
            method: 'POST',
            qs: {
                access_token: 'TEST_TOKEN'
            },
            url: 'https://graph.facebook.com/v3.1/me/messages'
        };

        it('returns promise given no cb and generates correct payload', () => {
            const result = client.sendQuickReplyMessage(TEST_ID, TEST_TEXT, [TEST_TEXT]);

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });

        it('given cb no promise returned and correct payload generated', () => {
            const result = client.sendQuickReplyMessage(TEST_ID, TEST_TEXT, [TEST_TEXT], TEST_CALLBACK);

            expect(result instanceof Promise).toEqual(true);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });

        it('returns promise given no cb, attachment payload and generates correct payload', () => {
            const correctPayload = {
                json: {
                    message: {
                        attachment: {
                            elements: undefined,
                            template_type: 'generic',
                            image_aspect_ratio: 'TEST_IMAGE_ASPECT',
                            sharable: true
                        },
                        quick_replies: [TEST_TEXT]
                    },
                    recipient: {
                        id: TEST_ID
                    }
                },
                method: 'POST',
                qs: {
                    access_token: 'TEST_TOKEN'
                },
                url: 'https://graph.facebook.com/v3.1/me/messages'
            };
            const builder = new GenericTemplateBuilder();
            builder.setSharable(true).setImageAspectRatio('TEST_IMAGE_ASPECT');
            const result = client.sendQuickReplyMessage(TEST_ID, builder.build(), [TEST_TEXT]);

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });
    });

    describe('sendTemplateMessage', () => {
        const correctPayload = {
            json: {
                message: {
                    attachment: {
                        payload: {
                            elements: undefined,
                            template_type: 'generic',
                            image_aspect_ratio: 'TEST_IMAGE_ASPECT',
                            sharable: true
                        },
                        type: 'template'
                    }
                },
                recipient: {
                    id: TEST_ID
                }
            },
            method: 'POST',
            qs: {
                access_token: 'TEST_TOKEN'
            },
            url: 'https://graph.facebook.com/v3.1/me/messages'
        };

        it('returns promise given no cb and generates correct payload', () => {
            const builder = new GenericTemplateBuilder();
            builder.setSharable(true).setImageAspectRatio('TEST_IMAGE_ASPECT');
            const result = client.sendTemplateMessage(TEST_ID, builder.build());

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });

        it('given cb no promise returned and correct payload generated', () => {
            const builder = new GenericTemplateBuilder();
            builder.setSharable(true).setImageAspectRatio('TEST_IMAGE_ASPECT');
            const result = client.sendTemplateMessage(TEST_ID, builder.build(), TEST_CALLBACK);

            expect(result instanceof Promise).toEqual(true);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });
    });
});