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
  private _url: string;
  private _title: string;
  private _messenger_extensions?: boolean;
  private _fallback_url?: string;
  private _webview_height_ratio?: string;
  private _webview_share_button?: string;

  public constructor(builder: URLButtonBuilder) {
    super(builder.getType());
    this._url = builder.getUrl();
    this._title = builder.getTitle();
    this._messenger_extensions = builder.getMessengerExtensions();
    this._fallback_url = builder.getFallbackUrl();
    this._webview_share_button = builder.getWebviewShareButton();
    this._webview_height_ratio = builder.getWebviewHeightRatio();
  }

  public get url(): string {
    return this._url;
  }

  public get title(): string {
    return this._title;
  }

  public get messenger_extensions(): boolean|undefined {
    return this._messenger_extensions;
  }

  public get fallback_url(): string|undefined {
    return this._fallback_url;
  }

  public get webview_height_ratio(): string|undefined {
    return this._webview_height_ratio;
  }

  public get webview_share_button(): string|undefined {
    return this._webview_share_button;
  }
}
