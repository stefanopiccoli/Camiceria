import { StepNavigationButton } from "../pages/ShirtConfiguration";
import iniziali from "../assets/images/sign.webp";
import { selectionStore } from "../store/Selection";

export default function SignForm() {
  const sign = selectionStore((store) => store.sign);
  const updateSign = selectionStore((store) => store.updateSign);

  return (
    <>
      <div className="p-5">
        <div className="text-center pb-5">
          <img src={iniziali} className="w-[35rem]" alt="" />
        </div>
        <h5>Rendi unica la tua camicia, fai ricamare le tue iniziali!</h5>
        <form>
          <input
            type="text"
            maxLength={4}
            minLength={1}
            value={sign.do ? sign.text : ''}
            className="w-full h-10 my-4 text-center"
            onChange={(e) => updateSign({ text: e.target.value })}
            onClick={() => updateSign({ do: true })}
          />
          <br />
          {sign.do ? (
            <>
              <input
                type="radio"
                name="sign"
                value="italic"
                checked={sign.font === "italic"}
                onChange={() => updateSign({ font: "italic" })}
              />
              Corsivo
              <input
                type="radio"
                name="sign"
                value="capitalized"
                checked={sign.font === "capitalized"}
                onChange={() =>
                  updateSign({
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
            checked={sign.do === false}
            onChange={() =>
              updateSign({
                do: false,
              })
            }
          />
          No, grazie
        </form>
      </div>
      <StepNavigationButton
        prev="cuff"
        next="measure"
        selector={sign.do === "unselected"}
      ></StepNavigationButton>
    </>
  );
}
