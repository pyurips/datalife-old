import * as alt from 'alt-client';

let _cursorCount = 0;

export function showCursor(state: boolean) {
  if (state) {
    _cursorCount += 1;
    try {
      alt.showCursor(true);
    } catch (err) {}
  } else {
    for (let i = 0; i < _cursorCount; i++) {
      try {
        alt.showCursor(false);
      } catch (err) {}
    }

    _cursorCount = 0;
  }
}
