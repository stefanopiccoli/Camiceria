export interface Collar {
  _id: string;
  name: string;
  buttons?: 1 | 2;
}

export interface Fabric {
  _id: string;
  name: string;
  color?: string;
}

export interface Cuff {
  _id: string;
  name: string;
}

export interface Sign {
  do: boolean | "unselected";
  text: string;
  font?: "italic" | "capitalized";
}

export interface Measure {
  neck: number,
  shoulder: number,
  chest: number,
  hips: number,
  sleeve: number
}

export type StepNavigation = "collar" | "fabric" | "cuff" | "sign" | "measure" | "summary";

export interface Selection {
  loading: boolean;
  step: StepNavigation;
  collar: Collar;
  fabric: Fabric;
  cuff: Cuff;
  sign: Sign;
  measure: Measure;
}

export interface Cart {
  article : (CustomShirt | Shirt) [],
}

export interface CustomShirt{
    collar:Collar,
    fabric:Fabric,
    cuff:Cuff,
    sign:Sign,
    measure:Measure
}

export interface Shirt{
  price:number
}

// export const collett: Collar[] = [
//   { _id: "1", name: "Button down Rubino", buttons: 1 },
//   { _id: "2", name: "Button down Rubino", buttons: 2 },
//   { _id: "3", name: "Button down Notoli", buttons: 2 },
//   { _id: "4", name: "Classico", buttons: 2 },
//   { _id: "5", name: "Classico abbassato 0,5", buttons: 1 },
//   { _id: "6", name: "Classico abbassato", buttons: 1 },
//   { _id: "7", name: "Classico Anticoli", buttons: 1 },
//   { _id: "8", name: "Classico Camiciaio", buttons: 1 },
//   { _id: "9", name: "Coreana", buttons: 1 },
//   { _id: "10", name: "Francese", buttons: 2 },
//   { _id: "11", name: "Francese aperto", buttons: 1 },
//   { _id: "12", name: "Francese", buttons: 1 },
//   { _id: "13", name: "Mezzo Francese", buttons: 1 },
// ];

// export const fabric: Fabric[] = [
//   { _id: "101", name: "Lana" },
//   { _id: "102", name: "Seta" },
//   { _id: "103", name: "Blu" },
// ];

// export const cuff: Cuff[] = [
//   { _id: "1001", name: "Polso gemello" },
//   { _id: "1002", name: "Polso tondo" },
//   { _id: "1003", name: "Polso asola per gemello" },
//   { _id: "1004", name: "Polso smussato" },
// ];
