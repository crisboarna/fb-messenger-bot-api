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
  private _elements: IMediaTemplateElement[];
  private _sharable?: boolean;

  constructor(builder: MediaTemplateBuilder) {
    super(builder.getTemplateType());
    this._elements = builder.getElements();
    this._sharable = builder.getSharable();
  }

  get elements(): IMediaTemplateElement[] {
    return this._elements;
  }

  get sharable(): boolean|undefined {
    return this._sharable;
  }
}
