/**
 * Interfaces representing webhook events messages received from Facebook platform.
 * Full documentation available at https://developers.facebook.com/docs/messenger-platform/reference/webhook-events
 */
import { ATTACHMENT_TYPE, REFERER_SOURCE } from '../enums';

export interface FacebookMessagePayload {
  object: string;
  entry: FacebookMessagePayloadEntry[];
}

export interface FacebookMessagePayloadEntry {
  id: string;
  time: number;
  messaging: FacebookMessagePayloadMessagingEntry[];
}

/**
 * Encompassing payload containing all variations of payload types. Only one of optional types present in every payload.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages
 */
export interface FacebookMessagePayloadMessagingEntry {
  sender: {
    id: string,
  };
  recipient: {
    id: string,
  };
  timestamp: number;
  message?: FacebookMessagePayloadMessageEntry;
  account_linking?: FacebookMessagePayloadAccountLinking;
  checkout_update?: FacebookMessagePayloadCheckoutUpdate;
  delivery?: FacebookMessagePayloadDelivery;
  game_play?: FacebookMessagePayloadGame;
  pass_thread_control?: FacebookMessageHandover;
  optin?: FacebookMessageOptin;
  payment?: FacebookMessagePayloadPayment;
  'policy-enforcement'?: FacebookMessagePayloadPolicyEnforcement;
  postback?: FacebookMessagePayloadPostback;
  payment_pre_checkout?: FacebookMessagePayloadPreCheckout;
  read?: FacebookMessagePayloadRead;
  referral?: FacebookMessagePayloadReferral;
  standby?: FacebookMessagePayloadStandbyChannel[];
}

/**
 * Represents a message incoming from Facebook.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages
 */
export interface FacebookMessagePayloadMessageEntry {
  mid: string;
  is_echo?: boolean;
  app_id?: number;
  metadata?: string;
  seq?: string;
  text?: string;
  attachments?: (FacebookMessagePayloadAttachments | FacebookMessagePayloadAttachmentsFallback)[];
  quick_reply?: {
    payload: string,
  };
}

/**
 * Represents a message multimedia attachment incoming from Facebook.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages
 */
export interface FacebookMessagePayloadAttachments {
  type: ATTACHMENT_TYPE;
  payload: FacebookMessagePayloadAttachmentMultimedia|FacebookMessagePayloadAttachmentLocation;
}

/**
 * Represents a message multimedia attachment payload incoming from Facebook.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages
 */
export interface FacebookMessagePayloadAttachmentMultimedia {
  url: string;
}

/**
 * Represents a message geolocation attachment payload incoming from Facebook.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages
 */
export interface FacebookMessagePayloadAttachmentLocation {
  'coordinates.lat': string;
  'coordinates.long': string;
}

/**
 * Represents a message fallback attachment payload incoming from Facebook.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages
 */
export interface FacebookMessagePayloadAttachmentsFallback {
  type: ATTACHMENT_TYPE;
  payload: null;
  url: string;
  title: string;
}

/**
 * Represents a postback payload incoming from Facebook.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
 */
export interface FacebookMessagePayloadPostback {
  title: string;
  payload: string;
  referral: FacebookMessagePayloadReferral;
}

/**
 * Represents a postback payload incoming from Facebook.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/webhook-reference/referral
 */
export interface FacebookMessagePayloadReferral {
  ref?: string;
  source: REFERER_SOURCE;
  type: string;
  ad_id?: string;
  referer_uri?: string;
}

/**
 * Represents a read payload incoming from Facebook.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-read
 */
export interface FacebookMessagePayloadRead {
  watermark: string;
  seq: string;
}

/**
 * Represents a delivery payload incoming from Facebook.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-read
 */
export interface FacebookMessagePayloadDelivery {
  mids: string[];
  watermark: number;
  seq: number;
}

/**
 * Represents a standby channel payload incoming from Facebook.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/standby
 */
export interface FacebookMessagePayloadStandbyChannel {
  sender: {
    id: string,
  };
  recipient: {
    id: string,
  };
  message?: FacebookMessagePayloadMessageEntry;
  postback?: FacebookMessagePayloadPostback;
  read?: FacebookMessagePayloadRead;
  delivery?: FacebookMessagePayloadDelivery;
}

/**
 * Represents a payment pre-checkout channel payload incoming from Facebook.
 *
 * Check link for content restrictions:
 * https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_pre_checkouts
 */
export interface FacebookMessagePayloadPreCheckout {
  payload: string;
  amount: {
    currency: string,
    amount: string,
  };
  requested_user_info: {
    shipping_address: FacebookMessagePayloadPaymentShipping
    contact_name: string,
  };
}

/**
 * Represents a payment shipping info sub-payload incoming from Facebook.
 *
 * Check link for content restrictions:
 * https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_pre_checkouts
 */
export interface FacebookMessagePayloadPaymentShipping {
  name?: string;
  id?: string;
  street_1: string;
  street_2: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

/**
 * Represents an account linking payload incoming from Facebook.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/webhook-reference/account-linking
 */
export interface FacebookMessagePayloadAccountLinking {
  status: string;
  authorization_code: string;
}

/**
 * Represents a payment checkout update payload incoming from Facebook.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/webhook-reference/checkout-update
 */
export interface FacebookMessagePayloadCheckoutUpdate {
  payload: string;
  shipping_address: FacebookMessagePayloadPaymentShipping;
}

/**
 * Represents a game play payload incoming from Facebook.
 *
 * Check link for content restrictions:
 * https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_game_plays/
 */
export interface FacebookMessagePayloadGame {
  game_id: string;
  player_id: string;
  context_type: string;
  context_id: string;
  score: number;
  payload: string;
}

/**
 * Represents a handover payload incoming from Facebook.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_handovers
 */
export interface FacebookMessageHandover {
  new_owner_app_id: string;
  metadata: string;
}

/**
 * Represents a optin payload incoming from Facebook.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_optins
 */
export interface FacebookMessageOptin {
  ref: string;
  user_ref: string;
}

/**
 * Represents a policy enforcement payload incoming from Facebook.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/webhook-reference/policy-enforcement
 */
export interface FacebookMessagePayloadPolicyEnforcement {
  action: string;
  reason: string;
}

/**
 * Represents a payment payload incoming from Facebook.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/webhook-reference/payment
 */
export interface FacebookMessagePayloadPayment {
  requested_user_info: {
    shipping_address: FacebookMessagePayloadPaymentShipping
    contact_name: string,
    contact_email: string,
    contact_phone: string,
  };
  payment_credential: {
    provider_type: string,
    charge_id: string,
    fb_payment_id: string
    tokenized_card?: string,
    tokenized_cvv?: string,
    token_expiry_month?: string,
    token_expiry_year?: string,
  };
  amount: {
    currency: string,
    amount: string,
  };
  shipping_option_id: string;
}
