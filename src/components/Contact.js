const Contact = () => {
  return (
    <div className="contact-container mt-24">
      <h1 className="m-10 p-10 font-semibold text-2xl flex justify-center">
        Contact Us
      </h1>
      <div className="flex justify-center">
        <form>
          <input
            className="border border-black p-3 m-2 p-2"
            placeholder="Name :"
            type="text"
          ></input>
          <input
            className="border border-black p-3 m-2 p-2"
            placeholder="Message :"
            type="text"
          ></input>
          <button className="border border-black p-3 m-2 p-2 bg-gray-200 rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
