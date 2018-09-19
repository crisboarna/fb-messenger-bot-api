import { IGenericTemplate, IGenericTemplateElement } from '../../interfaces';
import { MESSAGE_TEMPLATE_TYPE } from '../../enums';
import { GenericTemplate } from '../../classes/templates';

/**
 * Represents a Generic Template. Used to represent shape of Facebook API object. Type returned by builder and
 * exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/generic
 */
export class GenericTemplateBuilder {
  private _template_type = MESSAGE_TEMPLATE_TYPE.GENERIC;
  private _elements: IGenericTemplateElement[];
  private _image_aspect_ratio: string;
  private _sharable: boolean;

  public constructor() {}

  public getElements(): IGenericTemplateElement[] {
    return this._elements;
  }

  public setElements(value: IGenericTemplateElement[]) {
    this._elements = value;
    return this;
  }

  public getImageAspectRatio(): string {
    return this._image_aspect_ratio;
  }

  public setImageAspectRatio(value: string) {
    this._image_aspect_ratio = value;
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

  public build(): IGenericTemplate {
    return new GenericTemplate(this);
  }
}
