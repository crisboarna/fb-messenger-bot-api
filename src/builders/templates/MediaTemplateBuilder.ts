import { IMediaTemplate, IMediaTemplateElement } from '../../interfaces';
import { MESSAGE_TEMPLATE_TYPE } from '../../enums';
import { MediaTemplate } from '../../classes/templates';

/**
 * Represents a Media Template. Used to represent shape of Facebook API object. Type returned by builder and exposed t
 * o users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/media
 */
export class MediaTemplateBuilder {
  private _template_type = MESSAGE_TEMPLATE_TYPE.MEDIA;
  private _elements: IMediaTemplateElement[];
  private _sharable: boolean;

  public constructor() {}

  public getElements(): IMediaTemplateElement[] {
    return this._elements;
  }

  public setElements(value: IMediaTemplateElement[]) {
    this._elements = value;
    return this;
  }

  public getSharable(): boolean {
    return this._sharable;
  }

  public setSharable(value: boolean) {
    this._sharable = value;
    return this;
  }

  public getTemplateType(): MESSAGE_TEMPLATE_TYPE {
    return this._template_type;
  }

  public build(): IMediaTemplate {
    return new MediaTemplate(this);
  }
}
