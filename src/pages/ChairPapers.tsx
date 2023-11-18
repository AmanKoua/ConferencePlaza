import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import backendURL from "../backendURL";

const ChairPapers = () => {
  const { id } = useParams();
  const [submission, setSubmission] = useState(undefined);
  const [reviewers, setReviewers] = useState(undefined);
  const [reviewProgress, setReviewProgress] = useState([]);

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

        for (let i = 0; i < json.length; i++) {
          if (json[i].paperId == id) {
            setSubmission(json[i]);
            break;
          }
        }
      } catch (e) {
        alert("Error fetching conference submissions");
        return;
      }
    })();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      return;
    }

    let user = JSON.parse(localStorage.getItem("user")!);
    let token = user.token;

    (async () => {
      let response = await fetch(backendURL + "/user/chair/allreviewers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let json = undefined;

      try {
        json = await response.json();
        setReviewers(json);
      } catch (e) {
        alert("Error fetching reviewers");
        return;
      }
    })();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      return;
    }

    let user = JSON.parse(localStorage.getItem("user")!);
    let token = user.token;

    (async () => {
      let response = await fetch(
        backendURL + "/user/chair/paper-reviews?paperId=" + id,
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
        let tempReviewProgress = json;

        if (tempReviewProgress.length >= 6) {
          // workaround
          tempReviewProgress.splice(0, 3);
        }

        setReviewProgress(tempReviewProgress);
      } catch (e) {
        alert("Error fetching paper review progress");
        return;
      }
    })();
  }, []);

  const generateReviewerOptions = (idx: number): JSX.Element => {
    if (!reviewers) {
      return <></>;
    }

    if (reviewProgress.length >= 3) {
      let tempReviewer = undefined;

      for (let i = 0; i < reviewers.length; i++) {
        if (reviewers[i].id == reviewProgress[idx].reviewerId) {
          tempReviewer = reviewers[i];
          break;
        }
      }

      return (
        <>
          <option key={idx} value={tempReviewer.id}>
            {`${tempReviewer.firstName} ${tempReviewer.lastName}`}
          </option>
        </>
      );
    } else {
      return (
        <>
          <option value="invalid">Select reviewer</option>
          {reviewers.map((item, idx) => (
            <option key={idx} value={item.id}>
              {`${item.firstName} ${item.lastName}`}
            </option>
          ))}
        </>
      );
    }
  };

  const generateReviewStatusParagraphs = (idx: number): JSX.Element => {
    if (!reviewProgress || reviewProgress.length < 3) {
      return (
        <div className="bg-gray-300 w-3/12 h-3/4 mt-auto mb-auto">
          <p className="w-max ml-auto mr-auto text-2xl">N/A</p>
        </div>
      );
    }

    const tempReview = reviewProgress[idx];
    // console.log(tempReview);
    let bgColor = undefined;

    switch (tempReview.status) {
      case "Pending":
        bgColor = "gray";
        break;
      case "Accept":
        bgColor = "green";
        break;
      case "Reject":
        bgColor = "red";
        break;
      case "Neutral":
        bgColor = "yellow";
        break;
      default:
        break;
    }

    return (
      <div className={`bg-${bgColor}-300 w-3/12 h-3/4 mt-auto mb-auto`}>
        <p className="w-max ml-auto mr-auto text-2xl">{tempReview.status}</p>
      </div>
    );
  };

  const handleReviewerAssignment = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.value == "invalid") {
      return;
    }

    if (!localStorage.getItem("user")) {
      return;
    }

    let user = JSON.parse(localStorage.getItem("user")!);
    let token = user.token;

    (async () => {
      let response = await fetch(backendURL + "/user/chair/reviewer", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          reviewerId: e.target.value,
          paperId: id,
          status: "Pending",
        }),
      });

      let json = undefined;

      console.log(response);

      try {
        json = await response.json();
        console.log(json);
      } catch (e) {
        alert("Error setting reviewer");
        return;
      }
    })();
  };

  const generateAutomatedRecommendation = (): JSX.Element => {
    let acceptCount = 0;
    let rejectCount = 0;
    let neutralCount = 0;

    for (let i = 0; i < reviewProgress.length; i++) {
      if (reviewProgress[i].status == "Pending") {
        return (
          <div className="bg-gray-500 w-2/12 h-max py-5 mt-5 ml-auto mr-auto text-center text-2xl">
            N/A
          </div>
        );
      } else {
        switch (reviewProgress[i].status) {
          case "Accept":
            acceptCount++;
            break;
          case "Reject":
            rejectCount++;
            break;
          case "Neutral":
            neutralCount++;
            break;
        }
      }
    }

    if (neutralCount + rejectCount >= 2) {
      return (
        <div className="bg-red-500 w-2/12 h-max py-5 mt-5 ml-auto mr-auto text-center text-2xl">
          Do not publish
        </div>
      );
    } else if (acceptCount == 3) {
      return (
        <div className="bg-green-500 w-2/12 h-max py-5 mt-5 ml-auto mr-auto text-center text-2xl">
          Publish
        </div>
      );
    } else {
      return (
        <div className="bg-gray-300 w-2/12 h-max py-5 mt-5 ml-auto mr-auto text-center text-2xl">
          Pending
        </div>
      );
    }
  };

  const handleChairDecision = (isPublish: boolean) => {
    if (reviewProgress.length == 0) {
      alert("Cannot make final decision until all reviewers have reviewed!");
      return;
    }

    let acceptCount = 0;
    let rejectCount = 0;
    let neutralCount = 0;

    for (let i = 0; i < reviewProgress.length; i++) {
      if (reviewProgress[i].status == "Pending") {
        alert("Cannot make final decision until all reviewers have reviewed!");
        return;
      } else {
        switch (reviewProgress[i].status) {
          case "Accept":
            acceptCount++;
            break;
          case "Reject":
            rejectCount++;
            break;
          case "Neutral":
            neutralCount++;
            break;
        }
      }
    }

    if (neutralCount + acceptCount + rejectCount != 3) {
      alert("Cannot make final decision until all reviewers have reviewed!");
      return;
    }

    if (!localStorage.getItem("user")) {
      return;
    }

    let user = JSON.parse(localStorage.getItem("user")!);
    let token = user.token;
    let decision = isPublish ? "Publish" : "Do not publish";

    (async () => {
      let response = await fetch(backendURL + "/user/chair/paper-decision", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          paperId: id,
          decision: decision,
        }),
      });

      let json = undefined;
      try {
        json = await response.json();
        console.log(json);
      } catch (e) {
        alert("Error setting paper decision");
        return;
      }
    })();
  };

  return (
    <div className="bg-gradient-to-b from-confPrimary to-gray-100 w-9/12 ml-auto mr-auto h-screen overflow-y-scroll hide-scrollbar">
      <div className="w-max ml-auto mr-auto pt-20">
        <h1 className="text-5xl font-light">Paper Review Page</h1>
      </div>
      {submission != undefined && (
        <SubmittedPaper
          title={submission.title}
          authors={[submission.author, ...submission.coAuthors]}
          decision={submission.status}
        />
      )}
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
              <select
                className="w-3/12 h-3/4 mt-auto mb-auto"
                onChange={handleReviewerAssignment}
              >
                {generateReviewerOptions(0)}
              </select>
              <select
                className="w-3/12 h-3/4 mt-auto mb-auto"
                onChange={handleReviewerAssignment}
              >
                {generateReviewerOptions(1)}
              </select>
              <select
                className="w-3/12 h-3/4 mt-auto mb-auto"
                onChange={handleReviewerAssignment}
              >
                {generateReviewerOptions(2)}
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
              {generateReviewStatusParagraphs(0)}
              {generateReviewStatusParagraphs(1)}
              {generateReviewStatusParagraphs(2)}
            </div>
          </div>
        </div>
      </div>
      <div className="w-max ml-auto mr-auto pt-10">
        <h1 className="text-5xl font-light">Automated Recommendation</h1>
      </div>
      {generateAutomatedRecommendation()}
      <div className="w-max ml-auto mr-auto pt-5 pb-5">
        <h1 className="text-5xl font-light">Enter final decision</h1>
      </div>
      <div className="w-full h-max flex flex-row mb-14 justify-around">
        <button
          className="bg-confPrimary shadow-md hover:shadow-xl pt-1 pb-1 pl-5 pr-5 text-2xl"
          onClick={() => {
            handleChairDecision(true);
          }}
        >
          Publish
        </button>
        <button
          className="bg-confPrimary shadow-md hover:shadow-xl pt-1 pb-1 pl-5 pr-5 text-2xl"
          onClick={() => {
            handleChairDecision(false);
          }}
        >
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
