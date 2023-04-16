import React, { useEffect, useReducer, useState } from "react";

import { CollarCard } from "../components/Card";
import { FabricCard } from "../components/Card";
import { CuffCard } from "../components/Card";
import {
  Collar,
  Cuff,
  Fabric,
  StepNavigation,
  Sign,
  Selection,
  Measure,
} from "../interfaces/interfaces";
import Loading from "../components/Loading";
import { create } from "zustand";
import { useNavigate } from "react-router-dom";
import SignForm from "../components/SignForm";
import MeasureForm from "../components/MeasureForm";

type SelectionActions = {
  updateStep: (step: Selection["step"]) => void;
  updateCollar: (collar: Selection["collar"]) => void;
  updateFabric: (fabric: Selection["fabric"]) => void;
  updateCuff: (cuff: Selection["cuff"]) => void;
  updateSign: (sign: Partial<Sign>) => void;
  updateLoading: (loading: boolean) => void;
  updateMeasure: (measure: Partial<Measure>) => void;
};

export const selectionStore = create<Selection & SelectionActions>((set) => ({
  loading: true,
  updateLoading: (loading) => set(() => ({ loading: loading })),
  step: "collar",
  updateStep: (step) => set(() => ({ step: step })),
  collar: {
    id: 0,
    name: "",
    buttons: 1,
  },
  updateCollar: (collar) => set(() => ({ collar: collar })),
  fabric: {
    id: 0,
    name: "",
  },
  updateFabric: (fabric) => set(() => ({ fabric: fabric })),
  cuff: {
    id: 0,
    name: "",
  },
  updateCuff: (cuff) => set(() => ({ cuff: cuff })),
  sign: {
    do: "unselected",
    text: "",
    font: "italic"
  },
  updateSign: (sign) => set((state) => ({ sign: { ...state.sign, ...sign } })),
  measure: {
    neck: 0,
    shoulder: 0,
    chest: 0,
    hips: 0,
    sleeve: 0,
  },
  updateMeasure: (measure) =>
    set((state) => ({ measure: { ...state.measure, ...measure } })),
}));

export function ShirtConfiguration() {
  const updateLoading = selectionStore((store) => store.updateLoading);

  const [collars, setCollars] = useState<Collar[]>([]);
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [cuffs, setCuffs] = useState<Cuff[]>([]);

  const selection = selectionStore();
  const updateMeasure = selectionStore((store) => store.updateMeasure);
  const measure = selectionStore((store) => store.measure);

  const getData = async (
    api: string,
    setter: React.Dispatch<React.SetStateAction<Collar[] | Fabric[] | Cuff[]>>
  ) => {
    updateLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await response.json();
      setter(result);
      updateLoading(false);
    } catch (error) {
      updateLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getData("/api/v1/collars", setCollars);
    getData("/api/v1/fabrics", setFabrics);
    getData("/api/v1/cuffs", setCuffs);
  }, []);

  let el;
  switch (selection.step) {
    case "collar":
      el = (
        <CardsList
          type="collar"
          selector={selection.collar}
          list={collars}
          next="fabric"
        ></CardsList>
      );
      break;
    case "fabric":
      el = (
        <CardsList
          type="fabric"
          selector={selection.fabric}
          list={fabrics}
          prev="collar"
          next="cuff"
        ></CardsList>
      );
      break;
    case "cuff":
      el = (
        <CardsList
          type="cuff"
          selector={selection.cuff}
          list={cuffs}
          prev="fabric"
          next="sign"
        ></CardsList>
      );
      break;
    case "sign":
      el = <SignForm />;
      break;
    case "measure":
      el = <MeasureForm/>;
      break;
    default:
      <Loading />;
      break;
  }

  return (
    <div>
      <div>
        <div>
          <div>
            <div
              className="sticky top-14 h-16 w-full bg-white flex items-center gap-x-4 px-2 border-bottom border-2 overflow-x-scroll"
              id="steps"
            >
              <button onClick={() => selection.updateStep("collar")}>
                <span
                  className={
                    selection.step === "collar"
                      ? "border-b-[3px] border-b-slate-800 "
                      : ""
                  }
                >
                  COLLETTO
                </span>
              </button>
              <button
                disabled={selection.collar.id === 0}
                onClick={() => selection.updateStep("fabric")}
              >
                <span
                  className={
                    selection.step === "fabric"
                      ? "border-b-[3px] border-b-slate-800 "
                      : ""
                  }
                >
                  TESSUTO
                </span>
              </button>
              <button
                disabled={
                  selection.collar.id === 0 || selection.fabric.id === 0
                }
                onClick={() => selection.updateStep("cuff")}
              >
                <span
                  className={
                    selection.step === "cuff"
                      ? "border-b-[3px] border-b-slate-800"
                      : ""
                  }
                >
                  POLSINO
                </span>
              </button>
              <button
                disabled={
                  selection.collar.id === 0 ||
                  selection.fabric.id === 0 ||
                  selection.cuff.id === 0
                }
                onClick={() => selection.updateStep("sign")}
              >
                <span
                  className={
                    selection.step === "sign"
                      ? "border-b-[3px] border-b-slate-800"
                      : ""
                  }
                >
                  RICAMI
                </span>
              </button>
              <button
                disabled={
                  selection.collar.id === 0 ||
                  selection.fabric.id === 0 ||
                  selection.cuff.id === 0 ||
                  selection.sign.do === false
                }
                onClick={() => selection.updateStep("measure")}
              >
                <span
                  className={
                    selection.step === "measure"
                      ? "border-b-[3px] border-b-slate-800"
                      : ""
                  }
                >
                  MISURE
                </span>
              </button>
            </div>
            {el}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardsList({
  type,
  selector,
  list,
  next,
  prev,
}: {
  type: string;
  selector: Collar | Fabric | Cuff;
  list: Collar[] | Fabric[] | Cuff[];
  next?: StepNavigation;
  prev?: StepNavigation;
}) {
  const loading = selectionStore((store) => store.loading);

  let el;

  if (loading) {
    el = <Loading />;
  } else
    el = (
      <div className="grid grid-cols-2 px-2">
        {list.map((item, index) => (
          <div key={index} className="col m-2">
            {type === "collar" ? (
              <CollarCard key={item.id} collar={item} />
            ) : null}
            {type === "fabric" ? (
              <FabricCard key={item.id} fabric={item} />
            ) : null}
            {type === "cuff" ? <CuffCard key={item.id} cuff={item} /> : null}
          </div>
        ))}
      </div>
    );

  return (
    <div>
      {el}
      <StepNavigationButton
        selector={selector.id === 0}
        prev={prev}
        next={next}
      ></StepNavigationButton>
    </div>
  );
}

export function StepNavigationButton({
  selector,
  next,
  prev,
}: {
  selector?: boolean;
  next?: StepNavigation;
  prev?: StepNavigation;
}) {
  const updateStep = selectionStore((store) => store.updateStep);
  const navigate = useNavigate();
  return (
    <>
      <div className="h-16"></div>
      <div
        className="fixed grid grid-flow-col items-center border-t px-4 border-t-neutral-300 bottom-0 w-full h-16 bg-white "
        id="buttons"
      >
        {typeof prev !== "undefined" ? (
          <button
            className="bg-red-900 text-white h-3/4 w-2/5"
            style={{ width: "6rem" }}
            onClick={() => {
              updateStep(prev);
            }}
          >
            Indietro
          </button>
        ) : null}
        {typeof next !== "undefined" && next !== "summary" ? (
          <button
            className="bg-slate-900 text-white h-3/4 w-2/5 justify-self-end"
            style={{ width: "6rem" }}
            disabled={selector}
            onClick={() => {
              updateStep(next);
            }}
          >
            Avanti
          </button>
        ) : null}
        {next === "summary" ? (
          <button
            className="bg-green-900 text-white h-3/4 w-2/5 justify-self-end"
            style={{ width: "6rem" }}
            disabled={selector}
            onClick={() => navigate("/riepilogo")}
          >
            Riepilogo
          </button>
        ) : null}
      </div>
    </>
  );
}
