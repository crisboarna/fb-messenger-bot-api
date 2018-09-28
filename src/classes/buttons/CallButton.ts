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
  private _payload: string;
  private _title: string;

  constructor(builder: CallButtonBuilder) {
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
