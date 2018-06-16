import { IURLButton } from '../../interfaces';
import { Button } from './Button';
import { URLButtonBuilder } from '../../builders/buttons';

/**
 * Represents a URL Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/url
 */
export class URLButton extends Button implements IURLButton {
  public url: string;
  public title: string;
  public messenger_extensions?: boolean;
  public fallback_url?: string;
  public webview_height_ratio?: string;
  public webview_share_button?: string;

  public constructor(builder: URLButtonBuilder) {
    super(builder.getType());
    this.url = builder.getUrl();
    this.title = builder.getTitle();
    this.messenger_extensions = builder.getMessengerExtensions();
    this.fallback_url = builder.getFallbackUrl();
    this.webview_share_button = builder.getWebviewShareButton();
    this.webview_height_ratio = builder.getWebviewHeightRatio();
  }
}
