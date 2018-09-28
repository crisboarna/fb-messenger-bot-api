import { IButton, IGenericTemplateElement, IListTemplate } from '../../interfaces';
import { LIST_TOP_ELEMENT_STYLE, MESSAGE_TEMPLATE_TYPE } from '../../enums';
import { ListTemplate } from '../../classes/templates';

/**
 * Represents a List Template. Used to represent shape of Facebook API object. Type returned by builder and
 * exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/list
 */
export class ListTemplateBuilder {
  private _template_type = MESSAGE_TEMPLATE_TYPE.LIST;
  private _buttons: IButton[];
  private _elements: IGenericTemplateElement[];
  private _top_element_style: LIST_TOP_ELEMENT_STYLE;
  private _sharable: boolean;

  public constructor() {}

  public getSharable(): boolean {
    return this._sharable;
  }

  public setSharable(value: boolean) {
    this._sharable = value;
    return this;
  }

  public getButtons(): IButton[] {
    return this._buttons;
  }

  public setButtons(value: IButton[]) {
    this._buttons = value;
    return this;
  }

  public getElements(): IGenericTemplateElement[] {
    return this._elements;
  }

  public setElements(value: IGenericTemplateElement[]) {
    this._elements = value;
    return this;
  }

  public getTopElementStyle(): LIST_TOP_ELEMENT_STYLE {
    return this._top_element_style;
  }

  public setTopElementStyle(value: LIST_TOP_ELEMENT_STYLE) {
    this._top_element_style = value;
    return this;
  }

  public getTemplateType(): MESSAGE_TEMPLATE_TYPE {
    return this._template_type;
  }

  public build(): IListTemplate {
    return new ListTemplate(this);
  }
}
