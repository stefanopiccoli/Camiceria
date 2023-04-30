import colletto from "../assets/images/collar.webp";
import tessuto from "../assets/images/fabric.webp";
import polsino from "../assets/images/cuff.webp";
import { selectionStore } from "../store/Selection";
import {Collar, Cuff, Fabric } from '../interfaces/interfaces';

export function CollarCard({ collar }: { collar: Collar }) {
  const selection = selectionStore();
  const handleClick = () => {
    selection.updateCollar(collar);
  };
  return (
    <div
      className={
        "h-60 " +
        (collar._id === selection.collar._id
          ? "border-4 border-slate-700"
          : "border")
      }
      onClick={handleClick}
    >
      <img src={collar.imageUrl} />
      <div className="p-1">
        <p>{collar.name}</p>
        <p className="text-sm italic">{collar.buttons} {collar.buttons === 1 ? "bottone" : "bottoni"}</p>
      </div>
    </div>
  );
}

export function FabricCard({ fabric }: { fabric: Fabric }) {
  const selection = selectionStore();
  const handleClick = () => {
    selection.updateFabric(fabric);
  };
  return (
    <div
      className={
        "h-60 " +
        (fabric._id === selection.fabric._id
          ? "border-4 border-slate-700"
          : "border")
      }
      onClick={handleClick}
    >
      <img src={fabric.imageUrl} />
      <div className="p-1">
        <div>{fabric.name}</div>
      </div>
    </div>
  );
}

export function CuffCard({ cuff }: { cuff: Cuff }) {
  const selection = selectionStore();
  const handleClick = () => {
    selection.updateCuff(cuff);
  };
  return (
    <div
      className={
        "h-60 " +
        (cuff._id === selection.cuff._id
          ? "border-4 border-slate-700"
          : "border")
      }
      onClick={handleClick}
    >
      <img src={cuff.imageUrl} />
      <div className="p-1">
        <div>{cuff.name}</div>
      </div>
    </div>
  );
}

