import React from "react";
import { useState, useEffect } from "react";

const AuthorConference = () => {
  return (
    <div className="bg-gradient-to-b from-confPrimary to-gray-100 w-9/12 ml-auto mr-auto h-screen overflow-y-scroll hide-scrollbar">
      <div className="w-max ml-auto mr-auto pt-20">
        <h1 className="text-5xl font-light">Current Paper Submissions</h1>
      </div>
      <div className=" h-full w-8/12 ml-auto mr-auto mt-5">
        <div className="w-full h-max flex flex-row justify-around">
          <h1 className="text-3xl font-light">Title</h1>
          <h1 className="text-3xl font-light">Authors</h1>
          <h1 className="text-3xl font-light">Status</h1>
        </div>
        <PaperSubmission
          title="Joe shmo's paper"
          authors={[
            "Joe Schmo",
            "Some dude",
            "Another name",
            "test name here!",
          ]}
          status="Pending"
        ></PaperSubmission>
        <PaperSubmission
          title="Joe shmo's paper"
          authors={[
            "Joe Schmo",
            "Some dude",
            "Another name",
            "test name here!",
          ]}
          status="Publish"
        ></PaperSubmission>
        <PaperSubmission
          title="Joe shmo's paper"
          authors={[
            "Joe Schmo",
            "Some dude",
            "Another name",
            "test name here!",
          ]}
          status="Do not publish"
        ></PaperSubmission>
        <div className="w-max ml-auto mr-auto mt-10 mb-10">
          <h1 className="text-5xl font-light">Upload Paper to Conference</h1>
        </div>
        <div className="w-4/4 h-max flex flex-col justify-around">
          <div className="w-full h-14 flex flex-row justify-around">
            <p className=" w-3/12 text-2xl mt-auto mb-auto text-center ">
              Paper Upload
            </p>
            <input
              className="w-3/12 h-9 shadow-md mt-auto mb-auto p-2"
              type="text"
              placeholder="Upload paper"
            />
            <button className="w-3/12 h-max py-1 shadow-md bg-confButton text-xl hover:shadow-xl mt-auto mb-auto">
              Upload paper
            </button>
          </div>
          <div className="w-full h-14 flex flex-row justify-around">
            <p className=" w-3/12 text-2xl mt-auto mb-auto text-center ">
              Paper Title
            </p>
            <input
              className="w-7/12 h-9 shadow-md mt-auto mb-auto p-2"
              type="text"
              placeholder="Paper title"
            />
          </div>
          <div className="w-full h-14 flex flex-row justify-around">
            <p className=" w-3/12 text-2xl mt-auto mb-auto text-center ">
              Co-authors
            </p>
            <input
              className="w-7/12 h-9 shadow-md mt-auto mb-auto p-2"
              type="text"
              placeholder="Please enter a comma separated list of usernames"
            />
          </div>
          <button className="w-10/12 bg-confButton p-2 text-2xl hover:shadow-xl ml-auto mr-auto mt-5 mb-5">
            Upload Paper to Conference
          </button>
        </div>
      </div>
    </div>
  );
};

interface PaperSubmissionProps {
  title: string;
  authors: string[];
  status: string;
}

const PaperSubmission = ({ title, authors, status }: PaperSubmissionProps) => {
  const [statusColor, setStatusColor] = useState("");

  useEffect(() => {
    switch (status) {
      case "Pending":
        setStatusColor("yellow-300");
        break;
      case "Do not publish":
        setStatusColor("red-300");
        break;
      case "Publish":
        setStatusColor("green-300");
        break;
      default:
        break;
    }
  }, [status]);

  const generateAuthorParagraphs = (authors: string[]): JSX.Element => {
    return (
      <>
        {authors.map((name, idx) => (
          <p className="w-max ml-auto mr-auto p-1" key={idx}>
            {name}
          </p>
        ))}
      </>
    );

    return <></>;
  };

  return (
    <div className="bg-confButton w-full h-max shadow-lg mt-5 flex flex-row justify-around">
      <div className="w-3/12 h-max mt-auto mb-auto">
        <p className="text-xl">{title}</p>
      </div>
      <div className="w-3/12 h-max mt-auto mb-auto">
        {generateAuthorParagraphs(authors)}
      </div>
      <div className=" w-3/12 h-max mt-auto mb-auto">
        <p
          className={`bg-${statusColor} text-xl w-max p-2 rounded-lg ml-auto mr-auto`}
        >
          {status}
        </p>
      </div>
    </div>
  );
};

export default AuthorConference;
