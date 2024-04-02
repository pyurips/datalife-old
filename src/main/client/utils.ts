import * as alt from 'alt-client';

class Utils {
  static cursorCount = 0;

  static showCursor(state: boolean) {
    if (state) {
      this.cursorCount += 1;
      try {
        alt.showCursor(true);
      } catch (_) {}
    } else {
      for (let i = 0; i < this.cursorCount; i++) {
        try {
          alt.showCursor(false);
        } catch (_) {}
      }
      this.cursorCount = 0;
    }
  }
}

export default Utils;
