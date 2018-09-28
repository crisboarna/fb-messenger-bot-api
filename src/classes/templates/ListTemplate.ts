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
  readonly buttons?: IButton[];
  readonly elements: IGenericTemplateElement[];
  readonly top_element_style?: LIST_TOP_ELEMENT_STYLE;
  readonly sharable?: boolean;

  constructor(builder: ListTemplateBuilder) {
    super(builder.getTemplateType());
    this.buttons = builder.getButtons();
    this.elements = builder.getElements();
    this.top_element_style = builder.getTopElementStyle();
    this.sharable = builder.getSharable();
  }

  get Sharable(): boolean|undefined {
    return this.sharable;
  }

  get Buttons(): IButton[]|undefined {
    return this.buttons;
  }

  get Elements(): IGenericTemplateElement[] {
    return this.elements;
  }

  get Top_element_style(): LIST_TOP_ELEMENT_STYLE|undefined {
    return this.top_element_style;
  }
}
