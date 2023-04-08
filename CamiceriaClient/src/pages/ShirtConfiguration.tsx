import React, { useEffect, useReducer, useState } from "react";
import ReactDOM from "react-dom";
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

//Gestione degli step per rendering delle categorie
export const stepAtom = atom<string>("collar");

//Selettore colletto
export const collarSelectionAtom = atom<Collar>({
  id: 0,
  name: "",
  buttons: 1,
});
//Selettore tessuto
export const fabricSelectionAtom = atom<Fabric>({
  id: 0,
  name: "",
});

//Selettore polsino
export const cuffSelectionAtom = atom<Cuff>({
  id: 0,
  name: "",
});
//Selettore ricami
export const signSelectionAtom = atom<Sign>({
  do: false,
  text: "",
  font: "italic",
});

// const initialSelection:Selection = {
//   step:"collar",
//   collar:{
//     id:0,
//     name:"",
//     buttons:1
//   },
//   fabric:{
//     id:0,
//     name:"",
//   },
//   cuff:{
//     id:0,
//     name:"",
//   },
//   sign:{
//     do: false,
//     text:"",
//   }
// }

// export const selectionAtom = atom<Selection>(initialSelection);

export function ShirtConfiguration() {
  const [step, setStep] = useAtom(stepAtom);
  const [collarSelection, setCollarSelection] = useAtom(collarSelectionAtom);
  const [fabricSelection, setFabricSelection] = useAtom(fabricSelectionAtom);
  const [cuffSelection, setCuffSelection] = useAtom(cuffSelectionAtom);
  const [signSelection, setSignSelection] = useAtom(signSelectionAtom);
  const [collars, setCollars] = useState<Collar[]>([]);
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [cuffs, setCuffs] = useState<Cuff[]>([]);
  
  const getData = async (
    api: string,
    setter: React.Dispatch<React.SetStateAction<Collar[] | Fabric[] | Cuff[]>>
  ) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await response.json();
      setter(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData("/api/v1/collars",setCollars);
    getData("/api/v1/fabrics",setFabrics);
    getData("/api/v1/cuffs",setCuffs);
  }, []);

  let el;
  switch (step) {
    case "collar":
      el = (
        <CardsList
          type="collar"
          selector={collarSelection}
          list={collars}
          next="fabric"
        ></CardsList>
      );
      break;
    case "fabric":
      el = (
        <CardsList
          type="fabric"
          selector={fabricSelection}
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
          selector={cuffSelection}
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
                checked={signSelection.do}
                id="signradio"
                onChange={() =>
                  setSignSelection((t) => ({
                    ...t,
                    do:
                      document
                        .querySelector('input[name="sign"]:checked')
                        ?.getAttribute("value") === "true",
                  }))
                }
              />
              <input
                type="text"
                maxLength={4}
                minLength={1}
                style={{ width: "10rem" }}
                className="d-inline"
                disabled={!signSelection.do}
                onChange={(e) =>
                  setSignSelection((t) => ({
                    ...t,
                    text: e.target.value,
                  }))
                }
              />
              <br />
              {signSelection.do ? (
                <>
                  <input
                    type="radio"
                    name="signfont"
                    value="italic"
                    defaultChecked
                    onChange={() =>
                      setSignSelection((t) => ({
                        ...t,
                        font: "italic",
                      }))
                    }
                  />
                  Corsivo
                  <input
                    type="radio"
                    name="signfont"
                    value="capitalized"
                    onChange={() =>
                      setSignSelection((t) => ({
                        ...t,
                        font: "capitalized",
                      }))
                    }
                  />
                  Stampatello
                </>
              ) : null}
              <input
                type="radio"
                name="sign"
                value="false"
                defaultChecked
                onChange={() =>
                  setSignSelection((t) => ({
                    ...t,
                    do:
                      document
                        .querySelector('input[name="sign"]:checked')
                        ?.getAttribute("value") === "true",
                  }))
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
              <button onClick={() => setStep("collar")}>
                <span
                  className={
                    step === "collar"
                      ? "border-b-[3px] border-b-slate-800 "
                      : ""
                  }
                >
                  COLLETTO
                </span>
              </button>
              <button
                disabled={collarSelection.id === 0}
                onClick={() => setStep("fabric")}
              >
                <span
                  className={
                    step === "fabric"
                      ? "border-b-[3px] border-b-slate-800 "
                      : ""
                  }
                >
                  TESSUTO
                </span>
              </button>
              <button
                disabled={collarSelection.id === 0 || fabricSelection.id === 0}
                onClick={() => setStep("cuff")}
              >
                <span
                  className={
                    step === "cuff" ? "border-b-[3px] border-b-slate-800" : ""
                  }
                >
                  POLSINO
                </span>
              </button>
              <button
                disabled={
                  collarSelection.id === 0 ||
                  fabricSelection.id === 0 ||
                  cuffSelection.id === 0
                }
                onClick={() => setStep("sign")}
              >
                <span
                  className={
                    step === "sign" ? "border-b-[3px] border-b-slate-800" : ""
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
  const [step, setStep] = useAtom(stepAtom);
  return (
    <div>
      <div className="grid grid-cols-2 px-2">
        {list.map((item,index) => {
          return (
            <div key={index} className="col m-2">
              {type === "collar" ? (
                <CollarCard key={item.id} collar={item} />
              ) : null}
              {type === "fabric" ? (
                <FabricCard key={item.id} fabric={item} />
              ) : null}
              {type === "cuff" ? <CuffCard key={item.id} cuff={item} /> : null}
            </div>
          );
        })}
      </div>
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
  const [step, setStep] = useAtom(stepAtom);
  return (
    <div className="fixed grid grid-flow-col items-center border-t px-4 border-t-neutral-300 bottom-0 w-full h-16 bg-white ">
      {typeof prev !== "undefined" ? (
        <button
          className="bg-red-900 text-white h-3/4 w-2/5"
          style={{ width: "6rem" }}
          onClick={() => {
            setStep((t) => prev!);
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
            setStep((t) => next!);
          }}
        >
          Avanti
        </button>
      ) : null}
    </div>
  );
}
