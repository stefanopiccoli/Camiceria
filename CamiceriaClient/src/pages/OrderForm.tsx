export default function OrderForm() {
  return (
    <>
      <div className="pt-20 p-4">
        <h1 className="text-center text-2xl">Spedizione</h1>
        <form className="mt-10">
          <p>Nome</p>
          <input className="w-full" type="text" name="name" />
          <p className="mt-2">Indirizzo</p>
          <input className="w-full" type="text" name="address" />
          <div className="grid grid-rows-2 grid-cols-4 grid-flow-col gap-x-2 py-2">
            <p className="col-span-3">Città</p>
            <input className="col-span-3" type="text" name="address" />
            <p>Provincia</p>
            <input
              className="text-center"
              maxLength={2}
              type="text"
              name="address"
            />
          </div>
          <p>CAP</p>
          <input className="w-1/5 text-center" maxLength={5} type="text" name="address"/>
        </form>
      </div>
      <div
        className="fixed grid grid-flow-col items-center border-t px-4 border-t-neutral-300 bottom-0 w-full h-16 bg-white "
        id="buttons"
      >
        <div className="h-3/4 font-bold w-[6rem]">
          <p>Totale</p>
          <p>&euro;</p>
        </div>

        {/* <button className="bg-green-900 text-white h-3/4 w-[6rem] justify-self-end" onClick={()=>handleAddToOrders()}>
          Ordina
        </button> */}
      </div>
    </>
  );
}
