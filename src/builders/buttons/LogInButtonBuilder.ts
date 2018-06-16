import { ILogInButton } from '../../interfaces';
import { LogInButton } from '../../classes/buttons';
import { BUTTON_TYPE } from '../../enums';

/**
 * Represents a LogIn Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/login
 */
export class LogInButtonBuilder {
  private _type = BUTTON_TYPE.LOG_IN;
  private _url: string;

  public constructor() {}

  public getType(): BUTTON_TYPE {
    return this._type;
  }

  public getUrl(): string {
    return this._url;
  }

  public setUrl(value: string) {
    this._url = value;
    return this;
  }

  public build(): ILogInButton {
    return new LogInButton(this);
  }
}
