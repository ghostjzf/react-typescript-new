import createModule from "utils/createModule";
import { config } from "./config";

export default createModule(config, "commontoolsintroduce", () =>
  import("./Pages")
);
