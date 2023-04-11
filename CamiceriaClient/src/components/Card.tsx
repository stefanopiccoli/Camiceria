// import { useAtom } from "jotai/react";
// import React, { useState } from "react";
import colletto from "../assets/images/collar.webp";
import tessuto from "../assets/images/fabric.webp";
import polsino from "../assets/images/cuff.webp";
import { selectionStore } from "../pages/ShirtConfiguration";
// import { collarSelectionAtom } from "../pages/ShirtConfiguration";
// import { fabricSelectionAtom } from "../pages/ShirtConfiguration";
// import { cuffSelectionAtom } from "../pages/ShirtConfiguration";
import {Collar, Cuff, Fabric } from '../interfaces/interfaces';

export function CollarCard({ collar }: { collar: Collar }) {
  // const [collarSelection, setCollarSelection] = useAtom(collarSelectionAtom);
  const selection = selectionStore();
  const handleClick = () => {
    // setCollarSelection((c) => {
    //   return { ...c, ...collar };
    // });
    selection.updateCollar(collar);
    
    

  };
  return (
    <div
      className={
        "h-60 " +
        (collar.id === selection.collar.id
          ? "border-4 border-slate-700"
          : "border")
      }
      onClick={handleClick}
    >
      <img src={colletto} />
      <div className="p-1">
        <p>{collar.name}</p>
        <p className="text-sm italic">{collar.buttons} {collar.buttons === 2 ? "bottoni" : "bottone"}</p>
      </div>
    </div>
  );
}

export function FabricCard({ fabric }: { fabric: Fabric }) {
  // const [fabricSelection, setFabricSelection] = useAtom(fabricSelectionAtom);
  const selection = selectionStore();
  const handleClick = () => {
    // setFabricSelection((c) => {
    //   return { ...c, ...fabric };
    // });
    selection.updateFabric(fabric);
  };
  return (
    <div
      className={
        "h-60 " +
        (fabric.id === selection.fabric.id
          ? "border-4 border-slate-700"
          : "border")
      }
      onClick={handleClick}
    >
      <img src={tessuto} />
      <div className="p-1">
        <div>{fabric.name}</div>
      </div>
    </div>
  );
}

export function CuffCard({ cuff }: { cuff: Cuff }) {
  // const [cuffSelection, setCuffSelection] = useAtom(cuffSelectionAtom);
  const selection = selectionStore();
  const handleClick = () => {
    // setCuffSelection((c) => {
    //   return { ...c, ...cuff };
    // });
    selection.updateCuff(cuff);
  };
  return (
    <div
      className={
        "h-60 " +
        (cuff.id === selection.cuff.id
          ? "border-4 border-slate-700"
          : "border")
      }
      onClick={handleClick}
    >
      <img src={polsino} />
      <div className="p-1">
        <div>{cuff.name}</div>
      </div>
    </div>
  );
}

