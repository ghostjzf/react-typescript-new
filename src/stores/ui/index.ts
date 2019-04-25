import { observable } from "mobx";

class UI {
  @observable
  siteName = "BOS 2.0";

  @observable
  title = "BOS 2.0";
}

export default new UI();
