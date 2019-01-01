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
  readonly url: string;
  readonly title: string;
  readonly messenger_extensions?: boolean;
  readonly fallback_url?: string;
  readonly webview_height_ratio?: string;
  readonly webview_share_button?: string;

  public constructor(builder: URLButtonBuilder) {
    super(builder.getType());
    this.url = builder.getUrl();
    this.title = builder.getTitle();
    this.messenger_extensions = builder.getMessengerExtensions();
    this.fallback_url = builder.getFallbackUrl();
    this.webview_share_button = builder.getWebviewShareButton();
    this.webview_height_ratio = builder.getWebviewHeightRatio();
  }

  public get Url(): string {
    return this.url;
  }

  public get Title(): string {
    return this.title;
  }

  public get MessengerExtensions(): boolean|undefined {
    return this.messenger_extensions;
  }

  public get FallbackUrl(): string|undefined {
    return this.fallback_url;
  }

  public get WebviewHeightRatio(): string|undefined {
    return this.webview_height_ratio;
  }

  public get WebviewShareButton(): string|undefined {
    return this.webview_share_button;
  }
}
