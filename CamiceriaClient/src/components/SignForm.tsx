import {
  StepNavigationButton,
  selectionStore,
} from "../pages/ShirtConfiguration";
import iniziali from "../assets/images/sign.webp";

export default function SignForm() {
  const sign = selectionStore((store) => store.sign);
  const updateSign = selectionStore((store) => store.updateSign);
  console.log(sign);
  
  return (
    <>
      <div className="p-5">
        <div className="text-center pb-5">
          <img src={iniziali} className="w-[35rem]" alt="" />
        </div>
        <h5>Rendi unica la tua camicia, fai ricamare le tue iniziali!</h5>
        <form>
          <input
            type="radio"
            name="sign"
            value="true"
            id="signradio"
            defaultChecked={sign.do === true}
            onChange={() => updateSign({ do: true })}
          />
          <input
            type="text"
            maxLength={4}
            minLength={1}
            style={{ width: "10rem" }}
            defaultValue={sign.text}
            className="d-inline"
            disabled={!sign.do}
            onChange={(e) => updateSign({ text: e.target.value })}
            onClick={() => updateSign({ do: true })}
          />
          <br />
          {sign.do ? (
            <>
              <input
                type="radio"
                name="signfont"
                value="italic"
                defaultChecked={sign.font === 'italic'}
                onChange={() => updateSign({ font: "italic" })}
              />
              Corsivo
              <input
                type="radio"
                name="signfont"
                value="capitalized"
                defaultChecked={sign.font === 'capitalized'}
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
            defaultChecked={sign.do === false}
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
