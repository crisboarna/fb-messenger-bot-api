import { RequestData, Utils } from '../util/Utils';
import { ProxyData } from '../interfaces';

export interface PagePost {}
export interface PagePostImage extends PagePost {
  caption: string;
  url: string;
}

export interface PagePostText extends PagePost {
  message: string;
  link: string;
}

export class FacebookPageAPIClient {

  private pageId: string;
  private requestData: RequestData;
  private url: string;
  private caption: string;
  private message: string;
  private link: string;

    /**
     * @param pageId
     * @param {string} token - Facebook FacebookPageAPIClient Token
     * @param {ProxyData} proxyData - Proxy information if behind proxy
     */
  public constructor(pageId: string, token: string, proxyData?: ProxyData) {
    this.pageId = pageId;
    this.requestData = { token };
    this.requestData = Utils.getProxyData(this.requestData, proxyData);
  }

    /**
     * Sets the url of the image to be added to the page.
     *
     * @param  imageUrl - The url of the image
     * @return {this}
     */
  public setImageUrl(imageUrl: string) {
    this.url = imageUrl;
    return this;
  }

    /**
     * Sets the caption for the image to be added.
     *
     * @param imageCaption - The caption text of the image
     * @return {this}
     */
  public setImageCaption(imageCaption: string) {
    this.caption = imageCaption;
    return this;
  }

    /**
     * Sets the text for post to be added to the page.
     *
     * @param text
     * @return {this}
     */
  public setPostText(text: string) {
    this.message = text;
    return this;
  }

    /**
     * Sets the link of the post to be added to the page.
     * @param postLink - The url to be added to a post on the page
     * @return {this}
     */
  public setPostLink(postLink: string) {
    this.link = postLink;
    return this;
  }

    /**
     * Adds image to Facebook FacebookPageAPIClient.
     *
     * @param {Function} cb - Optional callback for result. If no callback provided will return promise
     * @return
     */
  public sendImage(cb?: Function) {
    const options = Utils.getRequestOptions();
    options.url += `${this.pageId}/photos`;
    options.method = 'POST';
    options.json = <PagePostImage>{ caption: this.caption, url: this.url };
    return Utils.sendMessage(options, this.requestData, cb);
  }

    /**
     * Adds posts to Facebook FacebookPageAPIClient.
     * @param {Function} cb - Optional callback for the result. If no callback provided will return promise
     * @return
     */
  public sendPost(cb?: Function) {
    const options = Utils.getRequestOptions();
    options.url += `${this.pageId}/feed`;
    options.method = 'POST';
    options.json = <PagePostText>{ message: this.message, link: this.link };
    return Utils.sendMessage(options, this.requestData, cb);
  }
}
