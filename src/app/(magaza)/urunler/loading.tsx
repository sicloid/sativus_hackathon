export default function Loading() {
  return (
    <div className="space-y-8 pb-12 animate-pulse">
      {/* Campaign Slider Skeleton */}
      <div className="h-[300px] md:h-[400px] bg-gray-200 brutal-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"></div>

      {/* Filters Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 brutal-border p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
        <div className="flex gap-2 overflow-hidden">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-10 w-24 bg-gray-200 brutal-border"></div>
          ))}
        </div>
        <div className="h-10 w-40 bg-gray-200 brutal-border"></div>
      </div>

      {/* Product Grid Skeleton */}
      <section className="bg-yellow-50/50 brutal-border p-4 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="aspect-[3/4] bg-white brutal-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col p-4 space-y-4">
              <div className="w-full h-40 bg-gray-100 rounded-xl"></div>
              <div className="h-6 w-3/4 bg-gray-100"></div>
              <div className="h-4 w-1/2 bg-gray-100"></div>
              <div className="mt-auto h-12 w-full bg-gray-200 brutal-border"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
