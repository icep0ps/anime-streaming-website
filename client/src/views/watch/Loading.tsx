export function Loading() {
  return (
    <main className="home flex w-full gap-5 bg-dark justify-evenly">
      <section className="w-[75%] flex flex-col gap-5  mt-32">
        <div
          role="status"
          className="flex items-center justify-center h-96	bg-secondBg rounded-xl animate-pulse "
        ></div>

        <div
          role="status"
          className="flex items-center justify-center h-56  bg-secondBg rounded-lg animate-pulse "
        ></div>
        <div className="h-8 bg-secondBg rounded-full  w-1/2 mb-5"></div>
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

      <aside className="mt-32 bg-secondBg p-2 flex flex-col gap-3 h-96 w-2/12"></aside>
    </main>
  );
}
