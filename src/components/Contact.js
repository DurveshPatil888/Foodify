const Contact = () => {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-gradient-to-b from-orange-50 to-white">
      <h1 className="font-extrabold text-3xl flex justify-center text-slate-900">
        Contact Us
      </h1>
      <p className="text-center text-slate-500 mt-2 text-sm">
        We would love to hear from you
      </p>
      <div className="flex justify-center mt-8">
        <form className="bg-white p-8 rounded-2xl border border-orange-100 shadow-sm w-full max-w-md">
          <input
            className="border border-slate-200 p-3 m-2 w-[calc(100%-1rem)] rounded-xl outline-none focus:border-orange-400"
            placeholder="Name :"
            type="text"
          ></input>
          <input
            className="border border-slate-200 p-3 m-2 w-[calc(100%-1rem)] rounded-xl outline-none focus:border-orange-400"
            placeholder="Message :"
            type="text"
          ></input>
          <button className="m-2 p-3 w-[calc(100%-1rem)] bg-orange-500 text-white rounded-full font-semibold">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
