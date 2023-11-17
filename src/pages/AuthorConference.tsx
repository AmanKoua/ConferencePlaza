import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import backendURL from "../backendURL";
import mockPaperData from "../mockPaperData";

const AuthorConference = () => {
  const [submissions, setSubmissions] = useState([]);
  const [docTitle, setDocTitle] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [status, setStatus] = useState("");
  const fileInputRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    // get author submissions for the given page

    if (!localStorage.getItem("user")) {
      return;
    }

    const user = JSON.parse(localStorage.getItem("user")!);
    const token = user.token;

    const getAuthorSubmissions = async () => {
      const response = await fetch(
        backendURL + `/user/author/conference?conferenceId=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let json = undefined;

      try {
        json = await response.json();
        setSubmissions(json);
      } catch (e) {
        alert(
          "there was an error fetching submissions for this author or conference!"
        );
        return;
      }
    };

    getAuthorSubmissions();
  }, []);

  const generatePaperSubmissionCards = (): JSX.Element => {
    if (!submissions || submissions.length == 0) {
      return <></>;
    }

    return (
      <>
        {submissions.map((item, idx) => (
          <PaperSubmission
            title={item.title}
            authors={[item.author, ...item.coAuthors]}
            status={item.status}
          />
        ))}
      </>
    );
  };

  const uploadPaper = async () => {
    if (!localStorage.getItem("user")) {
      alert("cannot upload paper because user is not logged in!");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user")!);
    const token = user.token;

    const response = await fetch(backendURL + "/user/paper", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        paperData: mockPaperData,
        paperTitle: title,
        coAuthors: authors.replaceAll(" ", "").split(","),
        conferenceId: id,
      }),
    });

    let json = undefined;

    try {
      json = await response.json();
      alert(json.message);
    } catch (e) {
      alert("error uploading paper!");
      return;
    }
  };

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
        {submissions.length > 0 && generatePaperSubmissionCards()}
        {submissions.length == 0 && (
          <h1 className="w-max ml-auto mr-auto mt-10 text-2xl font-bold">
            No Submissions
          </h1>
        )}
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
              value={docTitle}
              placeholder="Upload paper"
            />
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => {
                setDocTitle(e.target.files![0].name);
                console.log(e.target.files![0].name);
              }}
            />
            <button
              className="w-3/12 h-max py-1 shadow-md bg-confButton text-xl hover:shadow-xl mt-auto mb-auto"
              onClick={() => {
                fileInputRef.current!.click();
              }}
            >
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
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
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
              onChange={(e) => {
                setAuthors(e.target.value);
              }}
            />
          </div>
          <button
            className="w-10/12 bg-confButton p-2 text-2xl hover:shadow-xl ml-auto mr-auto mt-5 mb-5"
            onClick={() => {
              uploadPaper();
            }}
          >
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
          <>
            {idx == 0 && (
              <p
                className="w-max ml-auto mr-auto p-1 font-bold border-b border-black"
                key={idx}
              >
                {name}
              </p>
            )}
            {idx > 0 && (
              <p className="w-max ml-auto mr-auto p-1" key={idx}>
                {name}
              </p>
            )}
          </>
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
