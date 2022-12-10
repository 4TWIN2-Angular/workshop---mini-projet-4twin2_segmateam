import { CoreMenu } from "@core/types";
let sed:string ="produit/";
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
    id: "fournisseur",
    title: "Fournisseurs",
    type: "item",
    icon: "inbox",
    url: "fournisseur",
  },
  {
    id: 'Produit',
    title: 'Produit',
    type: 'collapsible',
    icon: 'shopping-cart',
    badge: {
      title: '2',
      classes: 'badge-light-warning badge-pill'
    },
    children: [
      {
        id: 'Home',
        title: 'Home',
        type: 'item',
        icon: 'layers',
        url: sed+'home'
      },
      {
        id: 'List',
        title: 'List',
        type: 'item',
        icon: 'archive',
        url: sed+"list"
      }
    ]
  },
  {
    id: "facture",
    title: "Factures",
    type: "item",
    icon: "inbox",
    url: "facture",
  },

];
