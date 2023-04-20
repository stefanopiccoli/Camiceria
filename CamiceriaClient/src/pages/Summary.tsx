import colletto from "../assets/images/collar.webp";
import tessuto from "../assets/images/fabric.webp";
import polsino from "../assets/images/cuff.webp";
import { selectionStore } from "./ShirtConfiguration";
import { useNavigate } from "react-router-dom";
import { cartStore } from "./CartPage";

export default function Summary() {
  const navigate = useNavigate();

  const collar = selectionStore((store) => store.collar);
  const fabric = selectionStore((store) => store.fabric);
  const cuff = selectionStore((store) => store.cuff);
  const sign = selectionStore((store) => store.sign);
  const measure = selectionStore((store) => store.measure);

  const addToCartCustomShirt = cartStore((store) => store.addCustomShirt);
  const refreshCart = cartStore(store=>store.refreshCustomShirts);

  return (
    <>
      <div className="h-14"></div>
      <div className="fixed top-14 h-12 w-full bg-white px-2 border-bottom border-2 flex items-center justify-center">
        <h1 className="text-xl">RIEPILOGO</h1>
      </div>
      <div className="p-4">
        <div>
          <img className="w-24" src={colletto} alt="" />
          <div>
            <span>{collar.name}</span>
            <br />
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
      <div className="h-16"></div>
      <div
        className="fixed grid grid-flow-col items-center border-t px-4 border-t-neutral-300 bottom-0 w-full h-16 bg-white "
        id="buttons"
      >
        <button
          className="bg-red-900 text-white h-3/4 w-2/5"
          style={{ width: "6rem" }}
          // onClick={()=>navigate("/camicie-personalizzate")}
          // onClick={()=>addToCartShirt({price: 99})}
          onClick={()=>refreshCart()}
        >
          RefreshCart
        </button>

        <button
          className="bg-green-900 text-white h-3/4 w-4/5 justify-self-end"
          onClick={()=>addToCartCustomShirt({
            collar: collar,
            fabric: fabric,
            cuff: cuff,
            sign: sign,
            measure: measure
          })}
        >
          AddToCart
        </button>
      </div>
    </>
  );
}