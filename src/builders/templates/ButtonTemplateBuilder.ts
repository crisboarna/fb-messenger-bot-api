import { IButton, IButtonTemplate } from '../../interfaces';
import { ButtonTemplate } from '../../classes/templates';
import { MESSAGE_TEMPLATE_TYPE } from '../../enums';

/**
 * Represents a IButton Template. Used to represent shape of Facebook API object. Type returned by builder and
 * exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/button
 */
export class ButtonTemplateBuilder {
  private _template_type = MESSAGE_TEMPLATE_TYPE.BUTTON;
  private _buttons: IButton[];
  private _text: string;
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

  public getText(): string {
    return this._text;
  }

  public setText(value: string) {
    this._text = value;
    return this;
  }

  public getTemplateType(): MESSAGE_TEMPLATE_TYPE {
    return this._template_type;
  }

  public build(): IButtonTemplate {
    return new ButtonTemplate(this);
  }
}
