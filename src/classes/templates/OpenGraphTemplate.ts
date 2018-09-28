import { AbstractMessageTemplate } from './AbstractMessageTemplate';
import { IOpenGraphTemplate, IOpenGraphElement } from '../../interfaces';
import { OpenGraphTemplateBuilder } from '../../builders/templates';

/**
 * Represents an Open Graph. Used to represent shape of Facebook API object. Type returned by builder and exposed to
 * users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/open-graph
 */
export class OpenGraphTemplate extends AbstractMessageTemplate implements IOpenGraphTemplate {
  readonly elements: IOpenGraphElement[];

  constructor(builder: OpenGraphTemplateBuilder) {
    super(builder.getTemplateType());
    this.elements = builder.getElements();
  }

  get Elements(): IOpenGraphElement[] {
    return this.elements;
  }
}
