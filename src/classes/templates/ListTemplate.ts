import { AbstractMessageTemplate } from './AbstractMessageTemplate';
import { IButton, IGenericTemplateElement, IListTemplate } from '../../interfaces';
import { ListTemplateBuilder } from '../../builders/templates';
import { LIST_TOP_ELEMENT_STYLE } from '../../enums';

/**
 * Represents a List Template. Used to represent shape of Facebook API object. Type returned by builder and exposed
 * to users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/list
 */
export class ListTemplate extends AbstractMessageTemplate implements IListTemplate{
  private _buttons?: IButton[];
  private _elements: IGenericTemplateElement[];
  private _top_element_style?: LIST_TOP_ELEMENT_STYLE;
  private _sharable?: boolean;

  constructor(builder: ListTemplateBuilder) {
    super(builder.getTemplateType());
    this._buttons = builder.getButtons();
    this._elements = builder.getElements();
    this._top_element_style = builder.getTopElementStyle();
    this._sharable = builder.getSharable();
  }

  get sharable(): boolean|undefined {
    return this._sharable;
  }

  get buttons(): IButton[]|undefined {
    return this._buttons;
  }

  get elements(): IGenericTemplateElement[] {
    return this._elements;
  }

  get top_element_style(): LIST_TOP_ELEMENT_STYLE|undefined {
    return this._top_element_style;
  }
}
