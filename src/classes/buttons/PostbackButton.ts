import { Button } from './Button';
import { IPostbackButton } from '../../interfaces';
import { PostbackButtonBuilder } from '../../builders/buttons';

/**
 * Represents a Postback Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/postback
 */
export class PostbackButton extends Button implements IPostbackButton {
  private _payload: string;
  private _title: string;

  constructor(builder: PostbackButtonBuilder) {
    super(builder.getType());
    this._payload = builder.getPayload();
    this._title = builder.getTitle();
  }

  get payload(): string {
    return this._payload;
  }

  get title(): string {
    return this._title;
  }
}
