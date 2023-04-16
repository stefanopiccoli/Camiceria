import { StepNavigationButton, selectionStore } from "../pages/ShirtConfiguration";
import misure from "../assets/images/Misure.png";

export default function MeasureForm() {

  const measure = selectionStore(store=>store.measure)
  const updateMeasure = selectionStore(store=>store.updateMeasure);  
  console.log(measure);
  
  
  return (
    <>
      <div id="measurebox">
        <img src={misure} />
        <div className="grid grid-cols-2 px-4 gap-4 text-black">
          <div className="border border-dashed border-slate-800 bg-slate-400 p-2">
            <span>Collo</span>
            <br />
            <input
              type="text"
              name="neck"
              defaultValue={measure.neck}
              maxLength={3}
              inputMode="numeric"
              onBlur={(e) => updateMeasure({ neck: Number(e.target.value) })}
            />
            <span className="ml-2">cm</span>
          </div>
          <div className="border border-dashed border-slate-800 bg-slate-400 p-2">
            <span>Spalle</span>
            <br />
            <input
              type="text"
              name=""
              defaultValue={measure.shoulder}
              maxLength={3}
              inputMode="numeric"
              onBlur={(e) =>
                updateMeasure({ shoulder: Number(e.target.value) })
              }
            />
            <span className="ml-2">cm</span>
          </div>
          <div className="border border-dashed border-slate-800 bg-slate-400 p-2">
            <span>Torace</span>
            <br />
            <input
              type="text"
              name=""
              defaultValue={measure.chest}
              maxLength={3}
              inputMode="numeric"
              onBlur={(e) => updateMeasure({ chest: Number(e.target.value) })}
            />
            <span className="ml-2">cm</span>
          </div>
          <div className="border border-dashed border-slate-800 bg-slate-400 p-2">
            <span>Vita</span>
            <br />
            <input
              type="text"
              name=""
              defaultValue={measure.hips}
              maxLength={3}
              inputMode="numeric"
              onBlur={(e) => updateMeasure({ hips: Number(e.target.value) })}
            />
            <span className="ml-2">cm</span>
          </div>
          <div className="border border-dashed border-slate-800 bg-slate-400 p-2">
            <span>Manica</span>
            <br />
            <input
              type="text"
              name=""
              defaultValue={measure.sleeve}
              maxLength={3}
              inputMode="numeric"
              onBlur={(e) => updateMeasure({ sleeve: Number(e.target.value) })}
            />
            <span className="ml-2">cm</span>
          </div>
        </div>
      </div>
      <StepNavigationButton
        prev="sign"
        next="summary"
        selector={
          measure.chest *
            measure.hips *
            measure.neck *
            measure.shoulder *
            measure.sleeve ===
          0
        }
      ></StepNavigationButton>
    </>
  );
}
