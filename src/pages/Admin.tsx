import React from "react";

const Admin = () => {
  return (
    <div className="bg-gradient-to-b from-confPrimary to-gray-100 w-9/12 ml-auto mr-auto h-max">
      {/* Register new conference section */}
      <div className="w-max ml-auto mr-auto pt-20">
        <h1 className="text-5xl font-light">Register New Conference</h1>
      </div>
      <div className="w-5/6 ml-auto mr-auto mt-5 flex flex-row justify-around">
        <div className="400 w-4/12">
          <h1 className="w-full text-3xl font-light">Conference name</h1>
        </div>
        <input className="w-7/12 shadow-md" type="text" />
      </div>
      <div className=" w-5/6 h-max ml-auto mr-auto mt-5 flex flex-row justify-around">
        <div className="w-4/12 h-max mt-auto mb-auto">
          <h1 className="w-full h-max text-3xl font-light">
            Conference location
          </h1>
        </div>
        <div className="w-7/12 flex flex-row justify-between">
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="city"
          />
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="state"
          />
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="country"
          />
        </div>
      </div>
      <div className=" w-5/6 h-max ml-auto mr-auto mt-5 flex flex-row justify-around">
        <div className="w-4/12 h-max mt-auto mb-auto">
          <h1 className="w-full h-max text-3xl font-light">Start date</h1>
        </div>
        <div className="w-7/12 flex flex-row justify-between">
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="day"
          />
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="month"
          />
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="year"
          />
        </div>
      </div>
      <div className=" w-5/6 h-max ml-auto mr-auto mt-5 flex flex-row justify-around">
        <div className="w-4/12 h-max mt-auto mb-auto">
          <h1 className="w-full h-max text-3xl font-light">End date</h1>
        </div>
        <div className="w-7/12 flex flex-row justify-between">
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="day"
          />
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="month"
          />
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="year"
          />
        </div>
      </div>
      <div className=" w-5/6 h-max ml-auto mr-auto mt-5 flex flex-row justify-around">
        <div className="w-4/12 h-max mt-auto mb-auto">
          <h1 className="w-full h-max text-3xl font-light">
            Submission deadline
          </h1>
        </div>
        <div className="w-7/12 flex flex-row justify-between">
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="day"
          />
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="month"
          />
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="year"
          />
        </div>
      </div>
      {/* Register new chair section */}
      <div className="w-max ml-auto mr-auto pt-10">
        <h1 className="text-5xl font-light">Register New Conference Chair</h1>
      </div>
      <div className="w-5/6 ml-auto mr-auto mt-5 flex flex-row justify-around">
        <div className="400 w-4/12">
          <h1 className="w-full text-3xl font-light">Email</h1>
        </div>
        <input className="w-7/12 shadow-md" type="text" />
      </div>
      <div className="w-5/6 ml-auto mr-auto mt-5 flex flex-row justify-around">
        <div className="400 w-4/12">
          <h1 className="w-full text-3xl font-light">First Name</h1>
        </div>
        <input className="w-7/12 shadow-md" type="text" />
      </div>
      <div className="w-5/6 ml-auto mr-auto mt-5 flex flex-row justify-around">
        <div className="400 w-4/12">
          <h1 className="w-full text-3xl font-light">Last Name</h1>
        </div>
        <input className="w-7/12 shadow-md" type="text" />
      </div>
      <div className="w-5/6 ml-auto mr-auto mt-5 flex flex-row justify-around">
        <div className="400 w-4/12">
          <h1 className="w-full text-3xl font-light">Tile</h1>
        </div>
        <input className="w-7/12 shadow-md" type="text" />
      </div>
      <div className="w-5/6 ml-auto mr-auto mt-5 flex flex-row justify-around">
        <div className="400 w-4/12">
          <h1 className="w-full text-3xl font-light">Affiliation</h1>
        </div>
        <input className="w-7/12 shadow-md" type="text" />
      </div>
      <div className="w-2/4 h-max ml-auto mr-auto">
        <div className="w-max h-max ml-auto mr-auto">
          <button className="w-full bg-confButton py-2 px-5 text-2xl hover:shadow-xl mt-5 mb-5">
            Register Conference & Chair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
