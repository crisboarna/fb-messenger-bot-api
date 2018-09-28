import { QUICK_REPLY_TYPE } from '../enums';

/**
 * Represents a Quick Reply. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/send-api/quick-replies
 */
export interface IQuickReply {
  content_type: QUICK_REPLY_TYPE;
  title?: string;
  payload?: string|number;
  image_url?: string;
}
