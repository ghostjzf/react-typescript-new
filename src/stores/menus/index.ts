import { observable } from "mobx";

class Menus {
  @observable menus = [];

  @observable moduleId: any = null;
}

export default new Menus();

export const modulePages = [
  {
    path: "/vip",
    title: "会员管理",
    permission: null
  },
  {
    path: "/staff",
    title: "员工管理",
    permission: null
  }
];
