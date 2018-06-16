import { IGenericTemplate } from './Templates';
import { BUTTON_PAYMENT_TYPE, BUTTON_TYPE } from '../enums';

/**
 * Base type for all buttons.
 */
export interface IButton {
  type: BUTTON_TYPE;
}

/**
 * Represents a URL Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/url
 */
export interface IURLButton extends IButton {
  url: string;
  title: string;
  messenger_extensions?: boolean;
  fallback_url?: string;
  webview_height_ratio?: string;
  webview_share_button?: string;
}

/**
 * Represents a Postback Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/postback
 */
export interface IPostbackButton extends IButton {
  title: string;
  payload: string;
}

/**
 * Represents a Share Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/share
 */
export interface IShareButton extends IButton {
  share_contents?: IGenericTemplate;
}

export interface IPaymentSummary {
  currency: string;
  is_test_payment?: boolean;
  payment_type: BUTTON_PAYMENT_TYPE;
  merchant_name: string;
  requested_user_info: string[];
  price_list: [{
    label: string,
    amount: string,
  }];
}
/**
 * Represents a Buy Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/buy
 */
export interface IBuyButton extends IButton {
  title: string;
  payload: string;
  payment_summary: IPaymentSummary;
}

/**
 * Represents a Call Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/call
 */
export interface ICallButton extends IButton {
  title: string;
  payload: string;
}

/**
 * Represents a LogIn Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/login
 */
export interface ILogInButton extends IButton {
  url: string;
}

/**
 * Represents a LogOut Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/logout
 */
export interface ILogOutButton extends IButton {
}

/**
 * Represents a GamePlay Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/game-play
 */
export interface IGamePlayButton extends IButton {
  title: string;
  payload?: string;
  game_metadata?: {
    player_id?: string,
    context_id?: string,
  };
}
