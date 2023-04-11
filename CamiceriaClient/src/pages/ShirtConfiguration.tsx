import React, { useEffect, useReducer, useState } from "react";
import iniziali from "../assets/images/sign.webp";
import { CollarCard } from "../components/Card";
import { FabricCard } from "../components/Card";
import { CuffCard } from "../components/Card";
import { atom, useAtom } from "jotai";
import {
  Collar,
  Cuff,
  Fabric,
  StepNavigation,
  Sign,
  Selection,
} from "../interfaces/interfaces";
import Loading from "../components/Loading";
import { create } from "zustand";

// //Gestione degli step per rendering delle categorie
// export const stepAtom = atom<string>("collar");

// //Selettore colletto
// export const collarSelectionAtom = atom<Collar>({
//   id: 0,
//   name: "",
//   buttons: 1,
// });
// //Selettore tessuto
// export const fabricSelectionAtom = atom<Fabric>({
//   id: 0,
//   name: "",
// });

// //Selettore polsino
// export const cuffSelectionAtom = atom<Cuff>({
//   id: 0,
//   name: "",
// });
// //Selettore ricami
// export const signSelectionAtom = atom<Sign>({
//   do: false,
//   text: "",
//   font: "italic",
// });

export const loadingAtom = atom<Boolean>(true);

type SelectionActions = {
  updateStep: (step: Selection["step"]) => void;
  updateCollar: (collar: Selection["collar"]) => void;
  updateFabric: (fabric: Selection["fabric"]) => void;
  updateCuff: (cuff: Selection["cuff"]) => void;
  updateSign: (sign: Partial<Selection["sign"]>) => void;
};

// const initialSelection: (Selection & SelectionActions) = {

// }

export const selectionStore = create<Selection & SelectionActions>((set) => ({
  step: "collar",
  updateStep: (step) => set(()=>({step:step})),
  collar: {
    id: 0,
    name: "",
    buttons: 1,
  },
  updateCollar: (collar) => set(()=>({...collar,collar})),
  fabric: {
    id: 0,
    name: "",
  },
  updateFabric: (fabric) => set(()=>({...fabric,fabric})),
  cuff: {
    id: 0,
    name: "",
  },
  updateCuff: (cuff) => set(()=>({...cuff,cuff})),
  sign: {
    do: false,
    text: "",
  },
  updateSign: (sign) => set(()=>({...sign,sign})),
}));

export function ShirtConfiguration() {
  // const [step, setStep] = useAtom(stepAtom);
  // const [collarSelection, setCollarSelection] = useAtom(collarSelectionAtom);
  // const [fabricSelection, setFabricSelection] = useAtom(fabricSelectionAtom);
  // const [cuffSelection, setCuffSelection] = useAtom(cuffSelectionAtom);
  // const [signSelection, setSignSelection] = useAtom(signSelectionAtom);

  const [loading, setLoading] = useAtom(loadingAtom);
  const [collars, setCollars] = useState<Collar[]>([]);
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [cuffs, setCuffs] = useState<Cuff[]>([]);

  const selection = selectionStore();

  const getData = async (
    api: string,
    setter: React.Dispatch<React.SetStateAction<Collar[] | Fabric[] | Cuff[]>>
  ) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await response.json();
      setter(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
      el = (
        <>
          <div className="p-5">
            <div className="text-center pb-5">
              <img src={iniziali} style={{ width: "35rem" }} alt="" />
            </div>
            <h5>Rendi unica la tua camicia, fai ricamare le tue iniziali!</h5>
            <form>
              <input
                type="radio"
                name="sign"
                value="true"
                checked={selection.sign.do}
                id="signradio"
                onChange={() =>
                  selection.updateSign({do:
                      document
                        .querySelector('input[name="sign"]:checked')
                        ?.getAttribute("value") === "true",}
                  )
                }
              />
              <input
                type="text"
                maxLength={4}
                minLength={1}
                style={{ width: "10rem" }}
                className="d-inline"
                disabled={!selection.sign.do}
                onChange={(e) =>
                  selection.updateSign({text: e.target.value})
                }
              />
              <br />
              {selection.sign.do ? (
                <>
                  <input
                    type="radio"
                    name="signfont"
                    value="italic"
                    defaultChecked
                    onChange={() =>
                      selection.updateSign({font: "italic",
                      })
                    }
                  />
                  Corsivo
                  <input
                    type="radio"
                    name="signfont"
                    value="capitalized"
                    onChange={() =>
                      selection.updateSign({
                        font: "capitalized",
                      })
                    }
                  />
                  Stampatello
                </>
              ) : null}
              <br />
              <br />
              <input
                type="radio"
                name="sign"
                value="false"
                defaultChecked
                onChange={() =>
                  selection.updateSign({
                    do:
                      document
                        .querySelector('input[name="sign"]:checked')
                        ?.getAttribute("value") === "true",
                  })
                }
              />
              No, grazie
            </form>
          </div>
          <StepNavigationButton prev="cuff"></StepNavigationButton>
        </>
      );
      break;
    default:
      <h1>No</h1>;
      break;
  }

  return (
    <div>
      <div>
        <div>
          <div>
            <div
              className="sticky top-14 h-16 w-full bg-white flex justify-center items-center gap-4 border-bottom border-2 overflow-x-scroll"
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
                disabled={selection.collar.id === 0 || selection.fabric.id === 0}
                onClick={() => selection.updateStep("cuff")}
              >
                <span
                  className={
                    selection.step === "cuff" ? "border-b-[3px] border-b-slate-800" : ""
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
                    selection.step === "sign" ? "border-b-[3px] border-b-slate-800" : ""
                  }
                >
                  RICAMI
                </span>
              </button>
            </div>
            {el}
          </div>
        </div>
        {/* <div className="col pt-5 p-3">
          <div style={{ height: "42rem" }} className="border overflow-auto">
            La mia camicia
            {collarSelection.id === 0 ? null : (
              <CollarCard key={collarSelection.id} collar={collarSelection} />
            )}
            {fabricSelection.id === 0 ? null : (
              <FabricCard key={fabricSelection.id} fabric={fabricSelection} />
            )}
            {cuffSelection.id === 0 ? null : (
              <CuffCard key={cuffSelection.id} cuff={cuffSelection} />
            )}
            {signSelection.do ? (
              <>
                <h5>Ricamo:</h5>
                <p>
                  {signSelection.text} -{" "}
                  {signSelection.font === "italic"
                    ? "(corsivo)"
                    : "(stampatello)"}
                </p>
              </>
            ) : null}
          </div>
        </div> */}
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
  // const [step, setStep] = useAtom(stepAtom);
  const [loading, setLoading] = useAtom(loadingAtom);

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
        selector={selector}
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
  selector?: Collar | Fabric | Cuff;
  next?: StepNavigation;
  prev?: StepNavigation;
}) {
  // const [step, setStep] = useAtom(stepAtom);
  const updateStep = selectionStore((store)=>store.updateStep);
  return (
    <div
      className="fixed grid grid-flow-col items-center border-t px-4 border-t-neutral-300 bottom-0 w-full h-16 bg-white "
      id="buttons"
    >
      {typeof prev !== "undefined" ? (
        <button
          className="bg-red-900 text-white h-3/4 w-2/5"
          style={{ width: "6rem" }}
          onClick={() => {
            // setStep((t) => prev!);
            updateStep(prev);
          }}
        >
          Indietro
        </button>
      ) : null}
      {typeof next !== "undefined" ? (
        <button
          className="bg-slate-900 text-white h-3/4 w-2/5 justify-self-end"
          style={{ width: "6rem" }}
          disabled={selector?.id === 0}
          onClick={() => {
            // setStep((t) => next!);
            updateStep(next);
          }}
        >
          Avanti
        </button>
      ) : null}
    </div>
  );
}
