if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    // console.log("initial Service worker");
    await navigator.serviceWorker.register("../sw_cached_page.js");
  });
}
