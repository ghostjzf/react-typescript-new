import { observable, action } from "mobx";

export class Menus {
  allMenus: any[] = []; // 所有菜单项，主要用于菜单搜索。creatModule时将该模块下的菜单配置都push到该数组中

  @observable menus = [];

  @observable moduleId = "";

  @action
  setMenus(config) {
    this.menus = config;
  }

  @action
  setModuleId(id) {
    this.moduleId = id ? "/" + id : "";
  }

  @observable searchValue = "";
  @action
  setSearchValue(value) {
    this.searchValue = value;
  }
}

export default new Menus();
