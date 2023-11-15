import React, { useState, useEffect } from "react";

const Reviewer = () => {
  const tempText =
    "lorem ipsum and whatever else comes after that I guess. This project is helping me get better at react, and I appreacite it for that. I'm also learning a bit about srping boot, which will look good on me resume. Additionally, i dont know anything about rust!";

  return (
    <div className="bg-gradient-to-b from-confPrimary to-gray-100 w-9/12 ml-auto mr-auto h-screen overflow-y-scroll hide-scrollbar">
      <div className="w-max ml-auto mr-auto pt-20">
        <h1 className="text-5xl font-light">Assigned Papers</h1>
      </div>
      <div className="h-full w-8/12 ml-auto mr-auto mt-5">
        <div className="w-full h-max flex flex-row justify-around">
          <h1 className="text-3xl font-light">Title</h1>
          <h1 className="text-3xl font-light">Authors</h1>
          <h1 className="text-3xl font-light">Recommendation</h1>
        </div>
        <AssignedPaperEntry
          title="the rust compiler is too slow for devs"
          authors={["Aman koua", "Bill smith", "Notorious BIG"]}
          recommendation="Accept"
          data={tempText}
        ></AssignedPaperEntry>
        <AssignedPaperEntry
          title="the rust compiler is too slow for devs"
          authors={["Aman koua", "Bill smith", "Notorious BIG"]}
          recommendation="Reject"
          data={tempText}
        ></AssignedPaperEntry>{" "}
        <AssignedPaperEntry
          title="the rust compiler is too slow for devs"
          authors={["Aman koua", "Bill smith", "Notorious BIG"]}
          recommendation="Neutral"
          data={tempText}
        ></AssignedPaperEntry>{" "}
        <AssignedPaperEntry
          title="the rust compiler is too slow for devs"
          authors={["Aman koua", "Bill smith", "Notorious BIG"]}
          recommendation="Reject"
          data={tempText}
        ></AssignedPaperEntry>
      </div>
    </div>
  );
};

interface AssignedPaperEntryProps {
  title: string;
  authors: string[];
  recommendation: string;
  data: string;
}

const AssignedPaperEntry = ({
  title,
  authors,
  recommendation,
  data,
}: AssignedPaperEntryProps) => {
  const [recommendationColor, setRecommendationColor] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // set recommendation color on component mount / load

    if (!recommendation) {
      return;
    }

    if (recommendation == "Accept") {
      setRecommendationColor("green");
    } else if (recommendation == "Reject") {
      setRecommendationColor("red");
    } else if (recommendation == "Neutral") {
      setRecommendationColor("yellow");
    }
  }, [recommendation]);

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
      <div className="bg-blue-300 w-11/12 h-18 shadow-lg p-2 mt-5 ml-auto mr-auto flex flex-row justify-around align-middle">
        <div className="w-5/12 h-max mt-auto mb-auto">
          <p className="text-xl">{title}</p>
        </div>
        <div className="w-5/12 h-max mt-auto mb-auto">
          {generateAuthorParagraphs()}
          {/* <p className="text-xl w-max ml-auto mr-auto">{authors}</p> */}
        </div>
        <div className="w-5/12 h-max mt-auto mb-auto flex flex-row">
          <select
            className={`w-full bg-${recommendationColor}-500`}
            value={recommendation}
          >
            <option value="Accept">Accept</option>
            <option value="Reject">Reject</option>
            <option value="Neutral">Neutral</option>
          </select>
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

export default Reviewer;
