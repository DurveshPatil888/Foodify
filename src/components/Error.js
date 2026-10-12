import { useRouteError } from 'react-router-dom';

const Error = () => {
  const err = useRouteError();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 px-4 text-center">
      <h1 className="text-2xl font-extrabold text-slate-900">Something went wrong</h1>
      <h2 className="mt-2 text-slate-500">
        {err.status} : {err.statusText}
      </h2>
    </div>
  );
};

export default Error;
