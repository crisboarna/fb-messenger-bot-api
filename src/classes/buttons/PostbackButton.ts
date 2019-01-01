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
  readonly payload: string;
  readonly title: string;

  constructor(builder: PostbackButtonBuilder) {
    super(builder.getType());
    this.payload = builder.getPayload();
    this.title = builder.getTitle();
  }

  get Payload(): string {
    return this.payload;
  }

  get Title(): string {
    return this.title;
  }
}
