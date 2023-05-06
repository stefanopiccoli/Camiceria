import { selectionStore } from "../store/Selection";
import { useNavigate } from "react-router-dom";
import { cartStore } from "../store/Cart";
import { userStore } from "../store/User";
import { useEffect } from "react";

export default function Summary() {
  const navigate = useNavigate();

  const collar = selectionStore((store) => store.collar);
  const fabric = selectionStore((store) => store.fabric);
  const cuff = selectionStore((store) => store.cuff);
  const sign = selectionStore((store) => store.sign);
  const measure = selectionStore((store) => store.measure);

  const addToCartCustomShirt = cartStore((store) => store.addCustomShirt);
  const resetSelection = selectionStore((store) => store.reset);
  const userId = userStore((store) => store.user?.uid);
  const user = userStore((store) => store.user);
  const refreshCart = cartStore((store) => store.refreshCustomShirts);

  const handleAddToCart = () => {
    if (userId) {
      addToCartCustomShirt({
        collar: collar,
        fabric: fabric,
        cuff: cuff,
        sign: sign,
        measure: measure,
      });
      resetSelection();
      navigate("/carrello");
      new Notification("Carrello",{body:"Hai aggiunto l'articolo nel carrello"});
    }
  };

  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  });

  return (
    <>
      <div className="fixed top-14 h-12 w-full bg-white px-2 border-bottom border-2 flex items-center justify-center">
        <h1 className="text-xl">RIEPILOGO</h1>
      </div>
      <div className="pt-28 p-4 container mx-auto bg-gray-100 max-w-lg">
        <div className="grid grid-cols-2 gap-y-2 items-center">
          <img className="w-24" src={collar.imageUrl} alt="" />
          <div>
            <span className="text-2xl">{collar.name}</span>
            <br />
            <span className="italic text-xl">
              {collar.buttons} {collar.buttons === 1 ? "bottone" : "bottoni"}
            </span>
          </div>
          <img className="w-24" src={fabric.imageUrl} alt="" />
          <div>
            <span className="text-2xl">{fabric.name}</span>
          </div>
          <img className="w-24" src={cuff.imageUrl} alt="" />
          <div>
            <span className="text-2xl">{cuff.name}</span>
          </div>
          <div className="py-5 self-start">
            <span className="text-xl">Ricamo </span>
            {sign.do === false ? (
              <p>
                <p className="font-bold">No</p>
              </p>
            ) : (
              <>
                <p className="italic text-2xl">{sign.text}</p>
                <p>
                  {sign.font === "capitalized" ? "(Stampatello)" : "(Corsivo)"}
                </p>
              </>
            )}
          </div>
          <div className="pt-5 self-start">
            <h3 className="text-xl">Misure</h3>
            <div className="grid grid-cols-2 gap-2 items-end">
              <span>Collo:</span>
              <span className="text-2xl">{measure.neck} cm</span>
              <span>Spalle:</span>
              <span className="text-2xl">{measure.shoulder} cm</span>
              <span>Torso:</span>
              <span className="text-2xl">{measure.chest} cm</span>
              <span>Vita:</span>
              <span className="text-2xl">{measure.hips} cm</span>
              <span>Maniche:</span>
              <span className="text-2xl">{measure.sleeve} cm</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-16"></div>
      <div className="fixed border-t px-4 border-t-neutral-300 bottom-0 w-full h-16 bg-white ">
        <div
          className="grid grid-flow-col items-center w-full h-full xsm:container xsm:mx-auto"
          id="buttons"
        >
          <button
            className="bg-red-900 text-white h-3/4 w-2/5"
            style={{ width: "6rem" }}
            onClick={() => navigate("/camicie-personalizzate")}
          >
            Indietro
          </button>

          <button
            className="bg-green-900 text-white h-3/4 w-2/5 justify-self-end"
            style={{ width: "6rem" }}
            onClick={() => (user ? handleAddToCart() : navigate("/accedi"))}
          >
            Aggiungi al carrello
          </button>
        </div>
      </div>
    </>
  );
}
