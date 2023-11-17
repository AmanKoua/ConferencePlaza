import React, { useState, useEffect } from "react";

const ChairPapers = () => {
  return (
    <div className="bg-gradient-to-b from-confPrimary to-gray-100 w-9/12 ml-auto mr-auto h-screen overflow-y-scroll hide-scrollbar">
      <div className="w-max ml-auto mr-auto pt-20">
        <h1 className="text-5xl font-light">Paper Review Page</h1>
      </div>
      <SubmittedPaper
        title="a new paper I just came up with"
        authors={["Aman koua", "Bill smith", "Notorious BIG"]}
        decision="Publish"
      />

      <div className="w-9/12 h-40 shadow-lg p-2 mt-10 ml-auto mr-auto flex flex-col justify-around align-middle">
        <div className=" w-full h-1/2 flex flex-row">
          <h1 className="w-1/4 h-max text-2xl mt-auto mb-auto text-center">
            Assign Reviewers
          </h1>
          <div className="w-3/4 h-full flex flex-col">
            <div className="w-full h-2/6 flex flex-row justify-around">
              <p className="text-lg">Reviewer 1</p>
              <p className="text-lg">Reviewer 2</p>
              <p className="text-lg">Reviewer 3</p>
            </div>
            <div className="w-full h-4/6 flex flex-row justify-around">
              <select className="w-3/12 h-3/4 mt-auto mb-auto">
                <option>Select reviewer</option>
                <option>Dude 1</option>
                <option>Dude 2</option>
                <option>Dude 3</option>
                <option>Dude 4</option>
              </select>
              <select className="w-3/12 h-3/4 mt-auto mb-auto">
                <option>Select reviewer</option>
                <option>Dude 1</option>
                <option>Dude 2</option>
                <option>Dude 3</option>
                <option>Dude 4</option>
              </select>
              <select className="w-3/12 h-3/4 mt-auto mb-auto">
                <option>Select reviewer</option>
                <option>Dude 1</option>
                <option>Dude 2</option>
                <option>Dude 3</option>
                <option>Dude 4</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full h-1/2 flex flex-row">
          <h1 className="w-1/4 h-max text-2xl mt-auto mb-auto text-center">
            Review Progress
          </h1>
          <div className="w-3/4 h-full flex flex-col">
            <div className="w-full h-4/6 flex flex-row justify-around mt-auto mb-auto">
              <div className="bg-gray-200 w-3/12 h-3/4 mt-auto mb-auto">
                <p className="w-max ml-auto mr-auto text-2xl">Pending</p>
              </div>
              <div className="bg-gray-200 w-3/12 h-3/4 mt-auto mb-auto">
                <p className="w-max ml-auto mr-auto text-2xl">Pending</p>
              </div>
              <div className="bg-gray-200 w-3/12 h-3/4 mt-auto mb-auto">
                <p className="w-max ml-auto mr-auto text-2xl">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-max ml-auto mr-auto pt-10">
        <h1 className="text-5xl font-light">Automated Recommendation</h1>
      </div>
      <div className="bg-red-500 w-2/12 h-max py-5 mt-5 ml-auto mr-auto text-center text-2xl">
        Do not publish
      </div>
      <div className="w-max ml-auto mr-auto pt-5 pb-5">
        <h1 className="text-5xl font-light">Enter final decision</h1>
      </div>
      <div className="w-full h-max flex flex-row mb-14 justify-around">
        <button className="bg-confPrimary shadow-md hover:shadow-xl pt-1 pb-1 pl-5 pr-5 text-2xl">
          Publish
        </button>
        <button className="bg-confPrimary shadow-md hover:shadow-xl pt-1 pb-1 pl-5 pr-5 text-2xl">
          Do not publish
        </button>
      </div>
    </div>
  );
};

interface SubmittedPaperProps {
  title: string;
  authors: string[];
  decision: string;
}

const SubmittedPaper = ({ title, authors, decision }: SubmittedPaperProps) => {
  const [recommendationColor, setDecisionColor] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // set recommendation color on component mount / load

    if (!decision) {
      return;
    }

    if (decision == "Publish") {
      setDecisionColor("green");
    } else if (decision == "Do not publish") {
      setDecisionColor("red");
    } else if (decision == "Pending") {
      setDecisionColor("yellow");
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
      <div className="bg-blue-300 w-9/12 h-18 shadow-lg p-2 mt-10 ml-auto mr-auto flex flex-row justify-around align-middle">
        <div className="w-5/12 h-max mt-auto mb-auto">
          <p className="text-xl">{title}</p>
        </div>
        <div className="w-5/12 h-max mt-auto mb-auto">
          {generateAuthorParagraphs()}
          {/* <p className="text-xl w-max ml-auto mr-auto">{authors}</p> */}
        </div>
        <div
          className={`bg-${recommendationColor}-500 w-5/12 h-10 mt-auto mb-auto flex flex-row`}
        >
          <p className="text-2xl w-max ml-auto mr-auto mt-auto mb-auto">
            {decision}
          </p>
        </div>
      </div>
    </>
  );
};

export default ChairPapers;
