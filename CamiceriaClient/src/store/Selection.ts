import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import {
  Collar,
  Cuff,
  Fabric,
  StepNavigation,
  Sign,
  Selection,
  Measure,
} from "../interfaces/interfaces";

type SelectionActions = {
  updateStep: (step: Selection["step"]) => void;
  updateCollar: (collar: Selection["collar"]) => void;
  updateFabric: (fabric: Selection["fabric"]) => void;
  updateCuff: (cuff: Selection["cuff"]) => void;
  updateSign: (sign: Partial<Sign>) => void;
  updateLoading: (loading: boolean) => void;
  updateMeasure: (measure: Partial<Measure>) => void;
  reset: () => void;
};

const emptyCollar: Collar = {
  _id: "0",
  name: "",
  buttons: 1,
  imageUrl: "",
};

const emptyFabric: Fabric = {
  _id: "0",
  name: "",
  imageUrl: "",
};

const emptyCuff: Cuff = {
  _id: "0",
  name: "",
  imageUrl: "",
};

const emptySign: Sign = {
  do: "unselected",
  text: "",
  font: "italic",
};

const emptyMeasure: Measure = {
  neck: 0,
  shoulder: 0,
  chest: 0,
  hips: 0,
  sleeve: 0,
};

export const selectionStore = create<Selection & SelectionActions>((set) => ({
  loading: true,
  updateLoading: (loading) => set(() => ({ loading: loading })),
  step: "collar",
  updateStep: (step) => set(() => ({ step: step })),
  collar: emptyCollar,
  updateCollar: (collar) => set(() => ({ collar: collar })),
  fabric: emptyFabric,
  updateFabric: (fabric) => set(() => ({ fabric: fabric })),
  cuff: emptyCuff,
  updateCuff: (cuff) => set(() => ({ cuff: cuff })),
  sign: emptySign,
  updateSign: (sign) => set((state) => ({ sign: { ...state.sign, ...sign } })),
  measure: emptyMeasure,
  updateMeasure: (measure) =>
    set((state) => ({ measure: { ...state.measure, ...measure } })),
  reset: () =>
    set(() => ({
      step: "collar", 
      collar: emptyCollar,
      fabric: emptyFabric,
      cuff: emptyCuff,
      sign: emptySign,
      measure: emptyMeasure,
    })),
}));



mountStoreDevtool("selectionStore", selectionStore);
