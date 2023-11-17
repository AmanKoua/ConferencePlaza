import React, { useEffect, useState } from "react";
import backendURL from "../backendURL";

const Conferences = () => {
  const [conferences, setConferences] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      alert("cannot fetch conferences because user is not logged in!");
      return;
    }

    const getConferences = async () => {
      const user = JSON.parse(localStorage.getItem("user")!);

      const response = await fetch(backendURL + "/user/conferences", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      let json = undefined;

      try {
        json = await response.json();
        setConferences(json.conferences);
        console.log(json.conferences);
      } catch (e) {
        alert("Failed to get conferences");
      }
    };

    getConferences();
  }, []);

  const generateConferenceEntries = (): JSX.Element => {
    return (
      <>
        {conferences.map((conference, idx) => (
          <ConferenceEntry
            key={idx}
            name={conference.name}
            deadline={conference.submissionDeadline}
          ></ConferenceEntry>
        ))}
      </>
    );
  };

  return (
    <div className="bg-gradient-to-b from-confPrimary to-gray-100 w-9/12 ml-auto mr-auto h-screen overflow-y-scroll hide-scrollbar">
      <div className="w-max ml-auto mr-auto pt-20">
        <h1 className="text-5xl font-light">Conference List</h1>
      </div>
      <div className="h-full w-8/12 ml-auto mr-auto mt-5">
        <div className="w-full h-max flex flex-row justify-around">
          <h1 className="text-3xl font-light">Conference Name</h1>
          <h1 className="text-3xl font-light">Sumission Deadline</h1>
        </div>
        {generateConferenceEntries()}
      </div>
    </div>
  );
};

interface ConferenceProps {
  name: string;
  deadline: string;
}

const ConferenceEntry = ({ name, deadline }: ConferenceProps) => {
  return (
    <div className="bg-confButton w-3/4 h-18 shadow-lg p-2 mt-5 ml-auto mr-auto flex flex-row justify-around align-middle">
      <div className="w-5/12 h-max mt-auto mb-auto">
        <p className="text-xl">{name}</p>
      </div>
      <div className="w-5/12 h-max mt-auto mb-auto">
        <p className="text-xl w-max ml-auto mr-auto">{deadline}</p>
      </div>
    </div>
  );
};

export default Conferences;
