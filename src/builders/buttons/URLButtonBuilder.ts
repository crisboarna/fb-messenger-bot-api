import { IURLButton } from '../../interfaces';
import { URLButton } from '../../classes/buttons';
import { BUTTON_TYPE } from '../../enums';

/**
 * Represents a URL Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/url
 */
export class URLButtonBuilder {
  private _type = BUTTON_TYPE.URL;
  private _url: string;
  private _title: string;
  private _messenger_extensions?: boolean;
  private _fallback_url?: string;
  private _webview_height_ratio?: string;
  private _webview_share_button?: string;

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

  public getTitle(): string {
    return this._title;
  }

  public setTitle(value: string) {
    this._title = value;
    return this;
  }

  public getMessengerExtensions(): boolean|undefined {
    return this._messenger_extensions;
  }

  public setMessengerExtensions(value: boolean) {
    this._messenger_extensions = value;
    return this;
  }

  public getFallbackUrl(): string|undefined {
    return this._fallback_url;
  }

  public setFallbackUrl(value: string) {
    this._fallback_url = value;
    return this;
  }

  public getWebviewHeightRatio(): string|undefined {
    return this._webview_height_ratio;
  }

  public setWebviewHeightRatio(value: string) {
    this._webview_height_ratio = value;
    return this;
  }

  public getWebviewShareButton(): string|undefined {
    return this._webview_share_button;
  }

  public setWebviewShareButton(value: string) {
    this._webview_share_button = value;
    return this;
  }

  public build(): IURLButton {
    return new URLButton(this);
  }
}
