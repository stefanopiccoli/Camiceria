export interface Collar {
    id: string,
    name: string,
    buttons?: 1|2,
}

export interface Fabric {
    id: string,
    name: string,
    color?: string[]
}

export interface Cuff {
    id: string,
    name: string
}

export interface Sign {
    do: boolean,
    text: string,
    font?: "italic"|"capitalized",
}

export const collar: Collar[] = [
    { id: "1", name: "Button down Rubino", buttons: 1 },
    { id: "2", name: "Button down Rubino", buttons: 2 },
    { id: "3", name: "Button down Notoli", buttons: 2 },
    { id: "4", name: "Classico", buttons: 2 },
    { id: "5", name: "Classico abbassato 0,5", buttons: 1 },
    { id: "6", name: "Classico abbassato", buttons: 1 },
    { id: "7", name: "Classico Anticoli", buttons: 1 },
    { id: "8", name: "Classico Camiciaio", buttons: 1 },
    { id: "9", name: "Coreana", buttons: 1 },
    { id: "10", name: "Francese", buttons: 2 },
    { id: "11", name: "Francese aperto", buttons: 1 },
    { id: "12", name: "Francese", buttons: 1 },
    { id: "13", name: "Mezzo Francese", buttons: 1 },
];

export const fabric: Fabric[] = [
    { id: "101", name: "Lana" },
    { id: "102", name: "Seta" },
    { id: "103", name: "Blu" },
];

export const cuff: Cuff[] = [
    { id: "1001", name: "Polso gemello" },
    { id: "1002", name: "Polso tondo" },
    { id: "1003", name: "Polso asola per gemello" },
    { id: "1004", name: "Polso smussato" },
];
