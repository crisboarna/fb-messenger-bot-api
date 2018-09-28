import { ILogOutButton } from '../../interfaces';
import { Button } from './Button';
import { LogOutButtonBuilder } from '../../builders/buttons';

/**
 * Represents a LogOut Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/logout
 */
export class LogOutButton extends Button implements ILogOutButton {
  constructor(builder: LogOutButtonBuilder) {
    super(builder.getType());
  }
}
