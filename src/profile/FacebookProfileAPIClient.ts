import { ProxyData } from '../';
import { RequestData, Utils } from '../util/Utils';

export interface PageSettings {
  setting_type: string;
}

export interface GreetingSettings extends PageSettings{
  greeting: {
    text?: string,
  };
}

export interface GetStartedSettings extends PageSettings{
  thread_state: string;
  call_to_actions: [{
    payload?: string,
  }];
}

export interface PersistentMenuSettings extends PageSettings{
  thread_state: string;
  persistent_menu: [{
    locale: string,
    call_to_actions?: any[],
  }];
}

/**
 * Class used to set profile specific properties that are visible in Messenger such as Greeting Message, Get Started message
 * and Persistent Menu options.
 */
export class FacebookProfileAPIClient {

  private requestData: RequestData;

    /**
     * @param {string} token - Facebook FacebookPageAPIClient Token
     * @param {ProxyData} proxyData - Proxy information if behind proxy
     */
  public constructor(token: string, proxyData?: ProxyData) {
    this.requestData = { token };
    this.requestData = Utils.getProxyData(this.requestData, proxyData);
  }

    /**
     * Method that sets the Greeting Message that is visible when new user first opens chat with bot before any messages
     * are sent.
     * @param greetingMessage - The message to be set
     * @param cb - Optional callback to get result of setting, promise returned otherwise
     * @return
     */
  public setGreetingMessage(greetingMessage: string, cb?: Function) {
    const urlCrumb = 'me/thread_settings';
    const payload: GreetingSettings = { setting_type: 'greeting', greeting: { text: greetingMessage } };
    return this.sendConfigurationMessage(payload, urlCrumb, cb);
  }

    /**
     * Method that sets the Get Started button message that is visible when user first opens chat with bot before any messages
     * are sent.
     * @param getStartedPayload - The message to be set
     * @param cb - Optional callback to get result of settings, promise returned otherwise
     * @return
     */
  public setGetStartedAction(getStartedPayload: string, cb?: Function) {
    const urlCrumb = 'me/thread_settings';
    const payload: GetStartedSettings = {setting_type: 'call_to_actions', thread_state: 'new_thread',
      call_to_actions:[{ payload: getStartedPayload }]};
    return this.sendConfigurationMessage(payload, urlCrumb, cb);
  }

    /**
     * Method that sets the Persistent Menu options on the left side of the composer that is always visible.
     * @param menuEntries - Options that are to be set.
     * @param cb - Optional callback to get result of settings, promise returned otherwise
     * @return
     */
  public setPersistentMenu(menuEntries:Object[], cb?: Function) {
    const urlCrumb = 'me/messenger_profile';
    const payload: PersistentMenuSettings = {setting_type: 'call_to_actions', thread_state: 'existing_thread',
      persistent_menu:[{ locale:'default', call_to_actions: menuEntries }]};
    return this.sendConfigurationMessage(payload, urlCrumb, cb);
  }

  private sendConfigurationMessage(payload: PageSettings, urlCrumb: string, cb?: Function) {
    const options = Utils.getRequestOptions();
    options.url += urlCrumb;
    options.method = 'POST';
    options.json = payload;
    return Utils.sendMessage(options, this.requestData, cb);
  }
}
