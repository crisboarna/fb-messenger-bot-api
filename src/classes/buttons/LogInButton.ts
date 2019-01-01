import { Button } from './Button';
import { ILogInButton } from '../../interfaces';
import { LogInButtonBuilder } from '../../builders/buttons';

/**
 * Represents a LogIn Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/login
 */
export class LogInButton extends Button implements ILogInButton {
  readonly url: string;

  constructor(builder: LogInButtonBuilder) {
    super(builder.getType());
    this.url = builder.getUrl();
  }

  get Url(): string {
    return this.url;
  }
}
