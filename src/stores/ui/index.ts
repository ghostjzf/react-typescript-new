import { observable, action } from "mobx";

class UI {
  @observable
  siteName = "BOS 2.0";

  @observable
  title = "BOS 2.0";

  @action
  setTitle(title) {
    this.title = title;
    document.title = title + " - " + this.siteName;
  }
}

export default new UI();
