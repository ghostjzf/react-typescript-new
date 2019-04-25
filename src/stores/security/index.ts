import { observable, computed } from "mobx";

class Security {
  @observable
  currentUser = "test";

  @computed
  get isLogin() {
    return !!this.currentUser;
  }
}

export default new Security();
