import { AbstractMessageTemplate } from './AbstractMessageTemplate';
import { IGenericTemplate, IGenericTemplateElement } from '../../interfaces';
import { GenericTemplateBuilder } from '../../builders/templates';

/**
 * Represents a Generic Template. Used to represent shape of Facebook API object. Type returned by builder and exposed
 * to users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/generic
 */
export class GenericTemplate extends AbstractMessageTemplate implements IGenericTemplate {
  private _elements: IGenericTemplateElement[];
  private _image_aspect_ratio?: string;
  private _sharable?: boolean;

  constructor(builder: GenericTemplateBuilder) {
    super(builder.getTemplateType());
    this._elements = builder.getElements();
    this._image_aspect_ratio = builder.getImageAspectRatio();
    this._sharable = builder.getSharable();
  }

  get elements(): IGenericTemplateElement[] {
    return this._elements;
  }

  get image_aspect_ratio(): string|undefined {
    return this._image_aspect_ratio;
  }

  get sharable(): boolean|undefined {
    return this._sharable;
  }
}
