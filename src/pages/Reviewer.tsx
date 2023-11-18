import React, { useState, useEffect } from "react";
import backendURL from "../backendURL";

const Reviewer = () => {
  const tempText =
    "lorem ipsum and whatever else comes after that I guess. This project is helping me get better at react, and I appreacite it for that. I'm also learning a bit about srping boot, which will look good on me resume. Additionally, i dont know anything about rust!";

  const [assignedPapers, setAssignedPapers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [organizedReviews, setOrganizedReviews] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      return;
    }

    let user = JSON.parse(localStorage.getItem("user")!);
    let token = user.token;

    (async () => {
      let response = await fetch(backendURL + "/user/reviewer/papers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let json = undefined;

      try {
        json = await response.json();
        console.log(json);
        setAssignedPapers(json);
      } catch (e) {
        alert("Error fetching assigned papers");
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
      let response = await fetch(backendURL + "/user/reviewer/reviews", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let json = undefined;

      try {
        json = await response.json();
        console.log(json);
        setReviews(json);
      } catch (e) {
        alert("Error fetching reviews!");
        return;
      }
    })();
  }, []);

  useEffect(() => {
    if (assignedPapers.length == 0 || reviews.length == 0) {
      return;
    }

    let tempOrganizedReviews = [];

    for (let i = 0; i < assignedPapers.length; i++) {
      for (let j = 0; j < reviews.length; j++) {
        if (assignedPapers[i].paperId == reviews[j].paperId) {
          tempOrganizedReviews[reviews[j].paperId] = reviews[j];
        }
      }
    }

    setOrganizedReviews(tempOrganizedReviews);
    console.log("-----------------------");
    console.log(tempOrganizedReviews);
    console.log("-----------------------");
  }, [assignedPapers, reviews]);

  const generateAssignedPaperCards = (): JSX.Element => {
    if (
      assignedPapers.length == 0 ||
      reviews.length == 0 ||
      organizedReviews.length == 0
    ) {
      return <></>;
    }

    return (
      <>
        {assignedPapers.map((item, idx) => (
          <AssignedPaperEntry
            key={idx}
            paperId={item.paperId}
            title={item.paperTitle}
            authors={[item.authorName, ...item.coAuthorNames]}
            recommendation={organizedReviews[item.paperId].status}
            data={tempText}
          ></AssignedPaperEntry>
        ))}
      </>
    );
  };

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
        {generateAssignedPaperCards()}
      </div>
    </div>
  );
};

interface AssignedPaperEntryProps {
  paperId: number;
  title: string;
  authors: string[];
  recommendation: string;
  data: string;
}

const AssignedPaperEntry = ({
  paperId,
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

  const handleRecommendationAssignment = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.value == "invalid") {
      return;
    }

    if (!localStorage.getItem("user") || !localStorage.getItem("profile")) {
      return;
    }

    let user = JSON.parse(localStorage.getItem("user")!);
    let token = user.token;
    let profile = JSON.parse(localStorage.getItem("profile")!);
    const userId = profile.id;

    (async () => {
      let response = await fetch(backendURL + "/user/reviewer/review", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          reviewerId: userId,
          paperId: paperId,
          status: e.target.value,
        }),
      });

      let json = undefined;

      try {
        json = await response.json();
        console.log(json);
        alert("Successfully assigned recommendation!");
      } catch (e) {
        alert("Error assigning recommendation");
        return;
      }
    })();
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
            onChange={handleRecommendationAssignment}
          >
            {recommendation == "Pending" && (
              <>
                <option value="invalid">Select Option</option>
                <option value="Accept">Accept</option>
                <option value="Reject">Reject</option>
                <option value="Neutral">Neutral</option>
              </>
            )}
            {recommendation != "Pending" && (
              <option value="invalid">{recommendation}</option>
            )}
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
