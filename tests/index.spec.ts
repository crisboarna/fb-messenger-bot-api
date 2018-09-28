describe('fb-messenger-bot-api', () => {
    it('exports FacebookMessagingAPIClient class', () => {
        const api = require('../src/index');
        expect(api.FacebookMessagingAPIClient).toBeDefined();
    });

    it('exports FacebookPageAPIClient class', () => {
        const api = require('../src/index');
        expect(api.FacebookPageAPIClient).toBeDefined();
    });

    it('exports FacebookProfileAPIClient class', () => {
        const api = require('../src/index');
        expect(api.FacebookProfileAPIClient).toBeDefined();
    });

    it('exports ValidateWebhook class', () => {
        const api = require('../src/index');
        expect(api.ValidateWebhook).toBeDefined();
    });

    it('exports enums classes', () => {
        const api = require('../src/index');
        expect(api.QUICK_REPLY_TYPE).toBeDefined();
        expect(api.LIST_TOP_ELEMENT_STYLE).toBeDefined();
        expect(api.BUTTON_PAYMENT_TYPE).toBeDefined();
        expect(api.MESSAGE_TEMPLATE_TYPE).toBeDefined();
        expect(api.BUTTON_TYPE).toBeDefined();
        expect(api.MEDIA_TYPE).toBeDefined();
        expect(api.AIRLINE_TRAVEL_CLASS).toBeDefined();
    });

    it('exports standard classes', () => {
        const api = require('../src/index');
        expect(api.Button).toBeDefined();
        expect(api.BuyButton).toBeDefined();
        expect(api.CallButton).toBeDefined();
        expect(api.GamePlayButton).toBeDefined();
        expect(api.LogInButton).toBeDefined();
        expect(api.LogOutButton).toBeDefined();
        expect(api.PostbackButton).toBeDefined();
        expect(api.ShareButton).toBeDefined();
        expect(api.URLButton).toBeDefined();

        expect(api.AbstractMessageTemplate).toBeDefined();
        expect(api.AirlineBoardingPassTemplate).toBeDefined();
        expect(api.AirlineCheckInTemplate).toBeDefined();
        expect(api.AirlineFlightUpdateTemplate).toBeDefined();
        expect(api.AirlineItineraryTemplate).toBeDefined();
        expect(api.ButtonTemplate).toBeDefined();
        expect(api.GenericTemplate).toBeDefined();
        expect(api.ListTemplate).toBeDefined();
        expect(api.MediaTemplate).toBeDefined();
        expect(api.OpenGraphTemplate).toBeDefined();
        expect(api.ReceiptTemplate).toBeDefined();
        expect(api.QuickReply).toBeDefined();
    });

    it('exports builder classes', () => {
        const api = require('../src/index');
        expect(api.BuyButtonBuilder).toBeDefined();
        expect(api.CallButtonBuilder).toBeDefined();
        expect(api.GamePlayButtonBuilder).toBeDefined();
        expect(api.LogInButtonBuilder).toBeDefined();
        expect(api.LogOutButtonBuilder).toBeDefined();
        expect(api.PostbackButtonBuilder).toBeDefined();
        expect(api.ShareButtonBuilder).toBeDefined();
        expect(api.URLButtonBuilder).toBeDefined();

        expect(api.AirlineBoardingPassTemplateBuilder).toBeDefined();
        expect(api.AirlineCheckInTemplateBuilder).toBeDefined();
        expect(api.AirlineFlightUpdateTemplateBuilder).toBeDefined();
        expect(api.AirlineItineraryTemplateBuilder).toBeDefined();
        expect(api.ButtonTemplateBuilder).toBeDefined();
        expect(api.GenericTemplateBuilder).toBeDefined();
        expect(api.ListTemplateBuilder).toBeDefined();
        expect(api.MediaTemplateBuilder).toBeDefined();
        expect(api.OpenGraphTemplateBuilder).toBeDefined();
        expect(api.ReceiptTemplateBuilder).toBeDefined();
        expect(api.QuickReplyBuilder).toBeDefined();
    });
});