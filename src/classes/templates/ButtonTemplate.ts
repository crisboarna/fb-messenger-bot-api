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
  readonly buttons: IButton[];
  readonly text: string;
  readonly sharable?: boolean;

  constructor(builder: ButtonTemplateBuilder) {
    super(builder.getTemplateType());
    this.buttons = builder.getButtons();
    this.text = builder.getText();
    this.sharable = builder.getSharable();
  }

  get Buttons(): IButton[] {
    return this.buttons;
  }

  get Text(): string {
    return this.text;
  }

  get Sharable(): boolean|undefined {
    return this.sharable;
  }
}
