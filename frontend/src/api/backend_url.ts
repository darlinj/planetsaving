import urlData from "./url.json";

const backendUrl =
  urlData.url == "PLACEHOLDER" ? "http://localhost:4000" : urlData.url;
export default backendUrl;
