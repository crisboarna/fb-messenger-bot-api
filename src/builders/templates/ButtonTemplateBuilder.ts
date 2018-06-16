import { IButton, IButtonTemplate } from '../../interfaces';
import { ButtonTemplate } from '../../classes/templates/ButtonTemplate';
import { MESSAGE_TEMPLATE_TYPE } from '../../enums';

/**
 * Represents a IButton Template. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/button
 */
export class ButtonTemplateBuilder {
  private template_type = MESSAGE_TEMPLATE_TYPE.BUTTON;
  private buttons: IButton[];
  private text: string;
  private sharable: boolean;

  public constructor() {}


  public getSharable(): boolean {
    return this.sharable;
  }

  public setSharable(value: boolean) {
    this.sharable = value;
    return this;
  }

  public getButtons(): IButton[] {
    return this.buttons;
  }

  public setButtons(value: IButton[]) {
    this.buttons = value;
    return this;
  }

  public getText(): string {
    return this.text;
  }

  public setText(value: string) {
    this.text = value;
    return this;
  }

  public getTemplateType(): MESSAGE_TEMPLATE_TYPE {
    return this.template_type;
  }

  public build(): IButtonTemplate {
    return new ButtonTemplate(this);
  }
}
