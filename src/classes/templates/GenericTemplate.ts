import { AbstractMessageTemplate } from './AbstractMessageTemplate';
import { IGenericTemplate, IGenericTemplateElement } from '../../interfaces';
import { GenericTemplateBuilder } from '../../builders/templates/GenericTemplateBuilder';

/**
 * Represents a Generic Template. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/generic
 */
export class GenericTemplate extends AbstractMessageTemplate implements IGenericTemplate {
  public elements: IGenericTemplateElement[];
  public image_aspect_ratio?: string;
  public sharable?: boolean;

  constructor(builder: GenericTemplateBuilder) {
    super(builder.getTemplateType());
    this.elements = builder.getElements();
    this.image_aspect_ratio = builder.getImageAspectRatio();
    this.sharable = builder.getSharable();
  }
}
