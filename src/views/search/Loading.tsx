export function Loading() {
  return (
    <main className="home flex w-full gap-5 bg-dark justify-evenly">
      <section className="flex flex-col gap-5  mt-32">
        <div className="h-8 bg-secondBg rounded-full  w-1/2 mb-5"></div>
        <section className="flex gap-10 flex-wrap">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 5, 6, 7, 8, 9, 10].map(() => {
            return (
              <div
                role="status"
                className="flex items-center justify-center h-64 w-48 bg-secondBg rounded-lg animate-pulse "
              ></div>
            );
          })}
        </section>
      </section>
    </main>
  );
}
