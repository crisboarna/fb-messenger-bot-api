import { Button } from './Button';
import { ICallButton } from '../../interfaces';
import { CallButtonBuilder } from '../../builders/buttons';

/**
 * Represents a Call Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/call
 */
export class CallButton extends Button implements ICallButton {
  readonly payload: string;
  readonly title: string;

  constructor(builder: CallButtonBuilder) {
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
