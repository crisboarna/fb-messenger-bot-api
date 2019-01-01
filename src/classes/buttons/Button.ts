import { IButton } from '../../interfaces';
import { BUTTON_TYPE } from '../../enums';

export abstract class Button implements IButton{
  readonly type: BUTTON_TYPE;

  public constructor(type: BUTTON_TYPE) {
    this.type = type;
  }

  get Type(): BUTTON_TYPE {
    return this.type;
  }
}
