import { StepNavigationButton } from "../pages/ShirtConfiguration";
import misure from "../assets/images/Misure.png";
import { selectionStore } from "../store/Selection";

export default function MeasureForm() {
  const measure = selectionStore((store) => store.measure);
  const updateMeasure = selectionStore((store) => store.updateMeasure);

  return (
    <>
      <div
        id="measurebox"
        className="xsm:container xsm:mx-auto sm:grid sm:grid-cols-2"
      >
        <img src={misure} />
        <div className="grid grid-cols-3 justify-items-center items-center px-4 gap-y-4 text-black sm:grid-cols-3 sm:gap-0 sm:bg-slate-200">
          <span className="text-2xl">Collo</span>
          <div>
            <input
              type="text"
              name="neck"
              defaultValue={measure.neck}
              maxLength={3}
              inputMode="numeric"
              onChange={(e) => updateMeasure({ neck: Number(e.target.value) })}
            />
            <span className="ml-2">cm</span>
          </div>
          <p>(20-50) cm</p>

          <span className="text-2xl">Spalle</span>
          <div>
            <input
              type="text"
              name=""
              defaultValue={measure.shoulder}
              maxLength={3}
              inputMode="numeric"
              onChange={(e) =>
                updateMeasure({ shoulder: Number(e.target.value) })
              }
            />
            <span className="ml-2">cm</span>
          </div>
          <p>(90-120) cm</p>

          <span className="text-2xl">Torace</span>
          <div>
            <input
              type="text"
              name=""
              defaultValue={measure.chest}
              maxLength={3}
              inputMode="numeric"
              onChange={(e) => updateMeasure({ chest: Number(e.target.value) })}
            />
            <span className="ml-2">cm</span>
          </div>
          <p>(70-110) cm</p>

          <span className="text-2xl">Vita</span>
          <div>
            <input
              type="text"
              name=""
              defaultValue={measure.hips}
              maxLength={3}
              pattern="[1-9]"
              inputMode="numeric"
              onChange={(e) => updateMeasure({ hips: Number(e.target.value) })}
            />
            <span className="ml-2">cm</span>
          </div>
          <p>(50-150) cm</p>

          <span className="text-2xl">Manica</span>
          <div>
            <input
              type="text"
              name=""
              defaultValue={measure.sleeve}
              maxLength={3}
              inputMode="numeric"
              onChange={(e) =>
                updateMeasure({ sleeve: Number(e.target.value) })
              }
            />
            <span className="ml-2">cm</span>
          </div>
          <p>(50-160) cm</p>
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
            0 ||
          isNaN(measure.chest) ||
          isNaN(measure.hips) ||
          isNaN(measure.neck) ||
          isNaN(measure.shoulder) ||
          isNaN(measure.sleeve) 
          || (measure.neck < 20 || measure.neck > 50)
          || (measure.shoulder < 90 || measure.shoulder > 120)
          || (measure.chest < 70 || measure.chest > 110)
          || (measure.hips < 50 || measure.hips > 150)
          || (measure.sleeve < 50 || measure.sleeve > 160)
        }
      ></StepNavigationButton>
    </>
  );
}
