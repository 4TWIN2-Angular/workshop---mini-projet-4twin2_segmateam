import { CoreMenu } from "@core/types";

export const menu: CoreMenu[] = [
  {
    id: "home",
    title: "Home",
    translate: "MENU.HOME",
    type: "item",
    icon: "home",
    url: "home",
  },
  {
    id: "fournisseur",
    title: "Fournisseurs",
    type: "item",
    icon: "inbox",
    url: "fournisseur",
  },
];
