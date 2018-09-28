import { AbstractMessageTemplate } from './AbstractMessageTemplate';
import { IMediaTemplate, IMediaTemplateElement } from '../../interfaces';
import { MediaTemplateBuilder } from '../../builders/templates/MediaTemplateBuilder';

/**
 * Represents a Media Template. Used to represent shape of Facebook API object. Type returned by builder and exposed to
 * users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/media
 */
export class MediaTemplate extends AbstractMessageTemplate implements IMediaTemplate {
  readonly elements: IMediaTemplateElement[];
  readonly sharable?: boolean;

  constructor(builder: MediaTemplateBuilder) {
    super(builder.getTemplateType());
    this.elements = builder.getElements();
    this.sharable = builder.getSharable();
  }

  get Elements(): IMediaTemplateElement[] {
    return this.elements;
  }

  get Sharable(): boolean|undefined {
    return this.sharable;
  }
}
