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
  readonly elements: IGenericTemplateElement[];
  readonly image_aspect_ratio?: string;
  readonly sharable?: boolean;

  constructor(builder: GenericTemplateBuilder) {
    super(builder.getTemplateType());
    this.elements = builder.getElements();
    this.image_aspect_ratio = builder.getImageAspectRatio();
    this.sharable = builder.getSharable();
  }

  get Elements(): IGenericTemplateElement[] {
    return this.elements;
  }

  get Image_aspect_ratio(): string|undefined {
    return this.image_aspect_ratio;
  }

  get Sharable(): boolean|undefined {
    return this.sharable;
  }
}
