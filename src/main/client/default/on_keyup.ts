import * as alt from "alt-client";

alt.on("keyup", (key) => {
  if (key === 113) {
    const accountData = alt.getLocalMeta("accountData") as any;
    if (accountData.permissionLevel === 0) return;
    alt.log(alt.getLocalMeta("accountData"));
    if (alt.getMeta("currentScreen") === "adminPanel")
      return alt.setMeta("currentScreen", "hud");
    return alt.setMeta("currentScreen", "adminPanel");
  }
});
