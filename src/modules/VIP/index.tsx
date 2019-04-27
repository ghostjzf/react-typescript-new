import createModule from "utils/createModule";
import { config } from "./config";

export default createModule(config, "vip", () => import("./Pages"));
