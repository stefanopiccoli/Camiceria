import colletto from "../assets/images/collar.webp";
import tessuto from "../assets/images/fabric.webp";
import polsino from "../assets/images/cuff.webp";
import { selectionStore } from "../pages/ShirtConfiguration";
import { CollarCard } from "./Card";
import { render } from "react-dom";

export default function Summary() {
  const collar = selectionStore((store) => store.collar);
  const fabric = selectionStore((store) => store.fabric);
  const cuff = selectionStore((store) => store.cuff);
  const sign = selectionStore((store) => store.sign);
  const measure = selectionStore((store) => store.measure);

  return (
    <>
      <div className="h-12 w-full bg-white px-2 border-bottom border-2 flex items-center justify-center">
        <h1 className="text-xl">RIEPILOGO</h1>
      </div>
      <div className="p-4">
        <div>
          <img className="w-24" src={colletto} alt="" />
          <div>
            <span>{collar.name}</span>
            <span>
              {collar.buttons} {collar.buttons === 1 ? "bottone" : "bottoni"}
            </span>
          </div>
          <img className="w-24" src={tessuto} alt="" />
          <div>
            <span>{fabric.name}</span>
          </div>
          <img className="w-24" src={polsino} alt="" />
          <div>
            <span>{cuff.name}</span>
          </div>
          <div>
            <span>Ricami: </span>{" "}
            {sign.do === false ? (
              <span>
                <b>No</b>
              </span>
            ) : (
              <>
                <span>
                  {sign.text} ({sign.font})
                </span>
              </>
            )}
          </div>
          <div>
            <h3 className="text-center">Misure</h3>
            <div className="grid grid-cols-2 gap-2">
              <span>Collo:</span>
              <span>{measure.neck} cm</span>
              <span>Spalle:</span>
              <span>{measure.shoulder} cm</span>
              <span>Torso:</span>
              <span>{measure.chest} cm</span>
              <span>Vita:</span>
              <span>{measure.hips} cm</span>
              <span>Maniche:</span>
              <span>{measure.sleeve} cm</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
