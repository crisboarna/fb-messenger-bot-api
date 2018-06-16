import { IButton } from '../../interfaces';
import { BUTTON_TYPE } from '../../enums';

export abstract class Button implements IButton{
  public type: BUTTON_TYPE;

  public constructor(type: BUTTON_TYPE) {
    this.type = type;
  }
}
