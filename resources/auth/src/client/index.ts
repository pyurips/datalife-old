import * as alt from "alt-client";

(async function() {
    let view: alt.WebView;
view = new alt.WebView("http://assets/webviews/auth/index.html");
await new Promise((resolve: (...args: any[]) => void) => {
  view.once("load", resolve);
});
view.focus();
})();
