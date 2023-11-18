import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backendURL from "../backendURL";

const ConferenceSubmissions = () => {
  const tempText =
    "lorem ipsum and whatever else comes after that I guess. This project is helping me get better at react, and I appreacite it for that. I'm also learning a bit about srping boot, which will look good on me resume. Additionally, i dont know anything about rust!";

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      return;
    }

    let user = JSON.parse(localStorage.getItem("user")!);
    let token = user.token;

    (async () => {
      let response = await fetch(backendURL + "/user/chair/conference", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let json = undefined;

      try {
        json = await response.json();
        setSubmissions(json);
      } catch (e) {
        alert("Error fetching conferene submissions");
        return;
      }
    })();
  }, []);

  const generateSubmissionCards = (): JSX.Element => {
    return (
      <>
        {submissions.map((item, idx) => (
          <AssignedPaperEntry
            key={idx}
            id={item.paperId}
            title={item.title}
            authors={[item.author, ...item.coAuthors]}
            decision={item.status}
            data={tempText}
          />
        ))}
      </>
    );
  };

  return (
    <div className="bg-gradient-to-b from-confPrimary to-gray-100 w-9/12 ml-auto mr-auto h-screen overflow-y-scroll hide-scrollbar">
      <div className="w-max ml-auto mr-auto pt-20">
        <h1 className="text-5xl font-light">Submitted Papers</h1>
      </div>
      <div className="h-full w-8/12 ml-auto mr-auto mt-5">
        <div className="w-full h-max flex flex-row justify-around">
          <h1 className="text-3xl font-light">Title</h1>
          <h1 className="text-3xl font-light">Authors</h1>
          <h1 className="text-3xl font-light">Decision</h1>
        </div>
        {generateSubmissionCards()}
        {/* <AssignedPaperEntry
          title="the rust compiler is too slow for devs"
          authors={["Aman koua", "Bill smith", "Notorious BIG"]}
          decision="Accept"
          data={tempText}
        ></AssignedPaperEntry>
        <AssignedPaperEntry
          title="the rust compiler is too slow for devs"
          authors={["Aman koua", "Bill smith", "Notorious BIG"]}
          decision="Reject"
          data={tempText}
        ></AssignedPaperEntry>{" "}
        <AssignedPaperEntry
          title="the rust compiler is too slow for devs"
          authors={["Aman koua", "Bill smith", "Notorious BIG"]}
          decision="Neutral"
          data={tempText}
        ></AssignedPaperEntry>{" "}
        <AssignedPaperEntry
          title="the rust compiler is too slow for devs"
          authors={["Aman koua", "Bill smith", "Notorious BIG"]}
          decision="Reject"
          data={tempText}
        ></AssignedPaperEntry> */}
      </div>
    </div>
  );
};

interface AssignedPaperEntryProps {
  id: number;
  title: string;
  authors: string[];
  decision: string;
  data: string;
}

const AssignedPaperEntry = ({
  id,
  title,
  authors,
  decision,
  data,
}: AssignedPaperEntryProps) => {
  const [recommendationColor, setRecommendationColor] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // set recommendation color on component mount / load

    if (!decision) {
      return;
    }

    if (decision == "Publish") {
      setRecommendationColor("green");
    } else if (decision == "Do not publish") {
      setRecommendationColor("red");
    } else if (decision == "Pending") {
      setRecommendationColor("yellow");
    }
  }, [decision]);

  const generateAuthorParagraphs = (): JSX.Element => {
    return (
      <>
        {authors.map((author, idx) => (
          <p className="text-xl w-max ml-auto mr-auto" key={idx}>
            {author}
          </p>
        ))}
      </>
    );

    return <></>;
  };

  return (
    <>
      <div
        className="bg-blue-300 w-11/12 h-18 shadow-lg p-2 mt-5 ml-auto mr-auto flex flex-row justify-around align-middle hover:shadow-xl"
        onClick={() => {
          navigate(`/chairPapers/${id}`);
        }}
      >
        <div className="w-5/12 h-max mt-auto mb-auto">
          <p className="text-xl">{title}</p>
        </div>
        <div className="w-5/12 h-max mt-auto mb-auto">
          {generateAuthorParagraphs()}
          {/* <p className="text-xl w-max ml-auto mr-auto">{authors}</p> */}
        </div>
        <div
          className={`bg-${recommendationColor}-500 w-5/12 h-max mt-auto mb-auto flex flex-row`}
        >
          <h1 className="h-10 w-max ml-auto mr-auto text-2xl">{decision}</h1>
        </div>
        <span
          className="h-max mt-auto mb-auto ml-1 text-5xl font-extrabold material-symbols-outlined"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded && "expand_less"}
          {!isExpanded && "expand_more"}
        </span>
      </div>
      {isExpanded && (
        <textarea className="w-11/12 h-max shadow-lg p-2 mt-1 ml-auto mr-auto flex flex-row justify-around align-middle">
          {data}
        </textarea>
      )}
    </>
  );
};

export default ConferenceSubmissions;
