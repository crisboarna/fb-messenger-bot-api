describe('fb-messenger-api', () => {
    it('exports Client', () => {
        const index = require('../src/index');
        expect(index.Client).toBeDefined();
    });

   it('exports Page', () => {
      const index = require('../src/index');
      expect(index.Page).toBeDefined();
   });

    it('exports Profile', () => {
        const index = require('../src/index');
        expect(index.Profile).toBeDefined();
    });

    it('exports ValidateWebhook', () => {
        const index = require('../src/index');
        expect(index.ValidateWebhook).toBeDefined();
    });

});