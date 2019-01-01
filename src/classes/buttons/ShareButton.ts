import { Button } from './Button';
import { IGenericTemplate, IShareButton } from '../../interfaces';
import { ShareButtonBuilder } from '../../builders/buttons';

/**
 * Represents a Share Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/share
 */
export class ShareButton extends Button implements IShareButton {
  readonly share_contents: IGenericTemplate;

  constructor(builder: ShareButtonBuilder) {
    super(builder.getType());
    this.share_contents = builder.getShareContents();
  }

  get ShareContents(): IGenericTemplate {
    return this.share_contents;
  }
}
