const Shimmer = () => {
  return (
    <div className="pt-[72px] bg-white min-h-screen">
      <div className="bg-orange-50 h-72 animate-pulse" />
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="h-6 w-48 bg-slate-200 rounded mb-6 animate-pulse" />
        <div className="flex gap-6 mb-10">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="w-20 h-20 rounded-full bg-slate-200 animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-slate-100 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
