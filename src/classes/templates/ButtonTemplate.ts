import { AbstractMessageTemplate } from './AbstractMessageTemplate';
import { IButton, IButtonTemplate } from '../../interfaces';
import { ButtonTemplateBuilder } from '../../builders/templates';

/**
 * Represents a IButton Template. Used to represent shape of Facebook API object. Type returned by builder and exposed
 * to users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/button
 */
export class ButtonTemplate extends AbstractMessageTemplate implements IButtonTemplate {
  private _buttons: IButton[];
  private _text: string;
  private _sharable?: boolean;

  constructor(builder: ButtonTemplateBuilder) {
    super(builder.getTemplateType());
    this._buttons = builder.getButtons();
    this._text = builder.getText();
    this._sharable = builder.getSharable();
  }

  get buttons(): IButton[] {
    return this._buttons;
  }

  get text(): string {
    return this._text;
  }

  get sharable(): boolean|undefined {
    return this._sharable;
  }
}
