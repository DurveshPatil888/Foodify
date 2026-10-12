import User from './User';
const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 bg-gradient-to-b from-orange-50 to-white">
      <div className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center shadow-md">
        <span className="text-3xl font-bold text-white">D</span>
      </div>

      <h1 className="text-4xl font-extrabold mt-4 text-slate-900">About Us</h1>
      <p className="text-slate-600 mt-2 max-w-xl">
        We build fast & reliable food delivery experiences 🚀
      </p>

      <div className="mt-6">
        <h2 className="text-sm text-orange-500 font-semibold tracking-wider">
          DEVELOPER
        </h2>
        <h3 className="text-2xl font-semibold">Durvesh Patil</h3>
      </div>

      <p className="mt-3 text-slate-600 max-w-md">
        Focused on building scalable React apps with real-world APIs and smooth
        UX.
      </p>

      <div className="flex gap-3 mt-5 flex-wrap justify-center">
        <span className="px-3 py-1 bg-white border border-orange-100 rounded-full">
          React
        </span>
        <span className="px-3 py-1 bg-white border border-orange-100 rounded-full">
          Redux
        </span>
        <span className="px-3 py-1 bg-white border border-orange-100 rounded-full">
          Firebase
        </span>
      </div>

      <div className="mt-6 bg-white shadow-md rounded-xl p-4 max-w-md border border-orange-100">
        <h4 className="font-semibold text-orange-500">Foodify 🚀</h4>
        <p className="text-sm text-slate-600 mt-1">
          Swiggy-style food app with live API, authentication, and cart system.
        </p>
      </div>
    </div>
  );
};

export default About;
