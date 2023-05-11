export function Loading({}) {
  return (
    <main className="home flex w-full gap-5 bg-dark justify-evenly">
      <section className="w-[75%] flex flex-col gap-5  mt-32">
        <div
          role="status"
          className="flex items-center justify-center h-56  bg-secondBg rounded-lg animate-pulse "
        ></div>

        <section className="flex gap-10 flex-wrap">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => {
            return (
              <div
                role="status"
                className="flex items-center justify-center h-64 w-48 bg-secondBg rounded-lg animate-pulse "
              ></div>
            );
          })}
        </section>
      </section>
      <aside className="mt-32 bg-secondBg p-2 flex flex-col gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => {
          return (
            <>
              <div
                role="status"
                className="max-w-md p-4 space-y-4 border border-secondBg rounded shadow md:p-6  animate-pulse "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-2.5 bg-secondBg rounded-full  w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-secondBg rounded-full "></div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </aside>
    </main>
  );
}
