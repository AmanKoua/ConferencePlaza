import React, { useState, useEffect } from "react";
import backendURL from "../backendURL";

const Admin = () => {
  const [adminProfile, setAdminProfile] = useState({});

  //

  const [conferenceName, setConferenceName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [startDay, setStartDay] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endDay, setEndDay] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [deadDay, setDeadDay] = useState("");
  const [deadMonth, setDeadMonth] = useState("");
  const [deadYear, setDeadYear] = useState("");

  // chair state

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [affiliation, setAffiliation] = useState("");

  const handleRegisterConferenceAndChair = async () => {
    if (!localStorage.getItem("user")) {
      alert(
        "cannot register new conference and chair because admin is not logged in!"
      );
    }

    const user = JSON.parse(localStorage.getItem("user")!);
    const token = user.token;

    const startDate = `${startYear}-${startMonth}-${startDay}`;
    const endDate = `${endYear}-${endMonth}-${endDay}`;
    const deadline = `${deadYear}-${deadMonth}-${deadDay}`;

    const chairResponse = await fetch(backendURL + "/admin/chair", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: email,
        username: email.split("@")[0],
        password: "password",
        firstName: firstName,
        lastName: lastName,
        title: title,
        affiliation: affiliation,
        type: "Chair",
      }),
    });

    let chairJSON = undefined;
    let chairId = undefined;

    try {
      chairJSON = await chairResponse.json();
      chairId = chairJSON.message.split("-ChairId-")[1];
    } catch (e) {
      alert("chair was not properly registerd!");
      return;
    }

    const confResponse = await fetch(backendURL + "/admin/conference", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: conferenceName,
        city: city,
        state: state,
        country: country,
        startDate: startDate,
        endDate: endDate,
        submissionDeadline: deadline,
        chairId: chairId,
      }),
    });

    let confJSON = undefined;

    try {
      confJSON = await confResponse.json();
      console.log(confJSON);
    } catch (e) {
      alert("Error registering new conference!");
      return;
    }

    alert("new chair and conference registerd!");
  };

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
        <input
          className="w-7/12 shadow-md"
          type="text"
          onChange={(e) => {
            setConferenceName(e.target.value);
          }}
        />
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
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="state"
            onChange={(e) => {
              setState(e.target.value);
            }}
          />
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="country"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
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
            onChange={(e) => {
              setStartDay(e.target.value);
            }}
          />
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="month"
            onChange={(e) => {
              setStartMonth(e.target.value);
            }}
          />
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="year"
            onChange={(e) => {
              setStartYear(e.target.value);
            }}
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
            onChange={(e) => {
              setEndDay(e.target.value);
            }}
          />
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="month"
            onChange={(e) => {
              setEndMonth(e.target.value);
            }}
          />
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="year"
            onChange={(e) => {
              setEndYear(e.target.value);
            }}
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
            onChange={(e) => {
              setDeadDay(e.target.value);
            }}
          />
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="month"
            onChange={(e) => {
              setDeadMonth(e.target.value);
            }}
          />
          <input
            className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
            type="text"
            placeholder="year"
            onChange={(e) => {
              setDeadYear(e.target.value);
            }}
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
        <input
          className="w-7/12 shadow-md"
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="w-5/6 ml-auto mr-auto mt-5 flex flex-row justify-around">
        <div className="400 w-4/12">
          <h1 className="w-full text-3xl font-light">First Name</h1>
        </div>
        <input
          className="w-7/12 shadow-md"
          type="text"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </div>
      <div className="w-5/6 ml-auto mr-auto mt-5 flex flex-row justify-around">
        <div className="400 w-4/12">
          <h1 className="w-full text-3xl font-light">Last Name</h1>
        </div>
        <input
          className="w-7/12 shadow-md"
          type="text"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </div>
      <div className="w-5/6 ml-auto mr-auto mt-5 flex flex-row justify-around">
        <div className="400 w-4/12">
          <h1 className="w-full text-3xl font-light">Tile</h1>
        </div>
        <input
          className="w-7/12 shadow-md"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="w-5/6 ml-auto mr-auto mt-5 flex flex-row justify-around">
        <div className="400 w-4/12">
          <h1 className="w-full text-3xl font-light">Affiliation</h1>
        </div>
        <input
          className="w-7/12 shadow-md"
          type="text"
          onChange={(e) => {
            setAffiliation(e.target.value);
          }}
        />
      </div>
      <div className="w-2/4 h-max ml-auto mr-auto">
        <div className="w-max h-max ml-auto mr-auto">
          <button
            className="w-full bg-confButton py-2 px-5 text-2xl hover:shadow-xl mt-5 mb-5"
            onClick={() => {
              handleRegisterConferenceAndChair();
            }}
          >
            Register Conference & Chair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
