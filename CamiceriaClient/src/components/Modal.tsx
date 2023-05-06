export default function Modal({
  show,
  handleModal,
  title,
  children,
}: {
  show: boolean;
  handleModal: (show: boolean) => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      {show ? (
        <>
          <div className="flex w-full h-screen top-0 px-4 justify-center items-center overflow-hidden fixed z-50">
            {/*content*/}
            <div className="border-0 rounded-md shadow-lg flex flex-col w-3/4 bg-white md:w-1/2 xl:w-1/4">
              {/*header*/}
              <div className="flex items-start justify-between px-2 py-4 mx-4 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-2xl text-slate-900">{title}</h3>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  {children}
                </p>
              </div>
              {/*footer*/}
              <div className="flex justify-center border-t mx-4">
                <button
                  className="text-slate-900 background-transparent font-bold px-6 py-2"
                  type="button"
                  onClick={() => handleModal(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
