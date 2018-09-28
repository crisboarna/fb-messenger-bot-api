import { Button } from './Button';
import { IGamePlayButton } from '../../interfaces';
import { GamePlayButtonBuilder } from '../../builders/buttons';

/**
 * Represents a GamePlay Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/game-play
 */
export class GamePlayButton extends Button implements IGamePlayButton {
  private _game_metadata: { player_id?: string; context_id?: string };
  private _payload: string;
  private _title: string;

  constructor(builder: GamePlayButtonBuilder) {
    super(builder.getType());
    this._game_metadata = builder.getGameMetadata();
    this._payload = builder.getPayload();
    this._title = builder.getTitle();
  }

  get game_metadata(): { player_id?: string; context_id?: string } {
    return this._game_metadata;
  }

  set game_metadata(value: { player_id?: string; context_id?: string }) {
    this._game_metadata = value;
  }

  get payload(): string {
    return this._payload;
  }

  set payload(value: string) {
    this._payload = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}
