import { useAtom } from "jotai/react";
import React, { useState } from "react";
import colletto from "../assets/images/collar.webp";
import tessuto from "../assets/images/fabric.webp";
import polsino from "../assets/images/cuff.webp";
import { collarSelectionAtom } from "../pages/ShirtConfiguration";
import { fabricSelectionAtom } from "../pages/ShirtConfiguration";
import { cuffSelectionAtom } from "../pages/ShirtConfiguration";
import {Collar, Cuff, Fabric } from '../interfaces/interfaces';

export function CollarCard({ collar }: { collar: Collar }) {
  const [collarSelection, setCollarSelection] = useAtom(collarSelectionAtom);
  const handleClick = () => {
    setCollarSelection((c) => {
      return { ...c, ...collar };
    });
  };
  return (
    <div
      className={
        "h-60 " +
        (collar.id === collarSelection.id
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
  const [fabricSelection, setFabricSelection] = useAtom(fabricSelectionAtom);
  const handleClick = () => {
    setFabricSelection((c) => {
      return { ...c, ...fabric };
    });
  };
  return (
    <div
      className={
        "h-60 " +
        (fabric.id === fabricSelection.id
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
  const [cuffSelection, setCuffSelection] = useAtom(cuffSelectionAtom);
  const handleClick = () => {
    setCuffSelection((c) => {
      return { ...c, ...cuff };
    });
  };
  return (
    <div
      className={
        "h-60 " +
        (cuff.id === cuffSelection.id
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

