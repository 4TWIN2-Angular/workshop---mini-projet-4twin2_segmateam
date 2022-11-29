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
    id: "reglement",
    title: "Reglements",
    type: "item",
    icon: "inbox",
    url: "reglement",
  },
  {
    id: "Produit",
    title: "Produit",
    type: "item",
    icon: "inbox",
    url: "produit",
  },
  {
    id: "facture",
    title: "Factures",
    type: "item",
    icon: "inbox",
    url: "facture",
  },
];
