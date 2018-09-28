import { IOpenGraphElement, IOpenGraphTemplate } from '../../interfaces';
import { MESSAGE_TEMPLATE_TYPE } from '../../enums';
import { OpenGraphTemplate } from '../../classes/templates';

/**
 * Represents an Open Graph. Used to represent shape of Facebook API object. Type returned by builder and exposed to
 * users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/open-graph
 */
export class OpenGraphTemplateBuilder {
  private _template_type = MESSAGE_TEMPLATE_TYPE.OPEN_GRAPH;
  private _elements: IOpenGraphElement[];

  public constructor() {}

  public getElements(): IOpenGraphElement[] {
    return this._elements;
  }

  public setElements(value: IOpenGraphElement[]) {
    this._elements = value;
    return this;
  }

  public getTemplateType(): MESSAGE_TEMPLATE_TYPE {
    return this._template_type;
  }

  public build(): IOpenGraphTemplate {
    return new OpenGraphTemplate(this);
  }
}
