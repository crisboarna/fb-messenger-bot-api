import { ILogOutButton } from '../../interfaces';
import { LogOutButton } from '../../classes/buttons';
import { BUTTON_TYPE } from '../../enums';

/**
 * Represents a LogOut Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/logout
 */
export class LogOutButtonBuilder {
  private _type = BUTTON_TYPE.LOG_OUT;

  public constructor() {}

  public getType(): BUTTON_TYPE {
    return this._type;
  }

  public build(): ILogOutButton {
    return new LogOutButton(this);
  }
}
