import { IGenericTemplate, IShareButton } from '../../interfaces';
import { ShareButton } from '../../classes/buttons';
import { BUTTON_TYPE } from '../../enums';

/**
 * Represents a Share Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/share
 */
export class ShareButtonBuilder {
  private _type = BUTTON_TYPE.SHARE;
  private _share_contents: IGenericTemplate;

  public constructor() {}

  public getType(): BUTTON_TYPE {
    return this._type;
  }

  public getShareContents(): IGenericTemplate {
    return this._share_contents;
  }

  public setShareContents(value: IGenericTemplate) {
    this._share_contents = value;
    return this;
  }

  public build(): IShareButton {
    return new ShareButton(this);
  }
}
