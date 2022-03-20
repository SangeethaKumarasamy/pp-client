import "./MobileView.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { GetApplicantDetails } from "../../GlobalConstant";
import { MoreDetails } from "./MoreDetails";

export function MobileView({
  setEditDetails,
  editDetails,
  fetchedDetails,
  setFetchedDetails,
}) {
  // TO GET THE APPLICANT DETAILS EVERY TIME THE PAGE RELOADS
  useEffect(() => GetApplicantDetails(setFetchedDetails), [setFetchedDetails]);

  const [show, setShow] = useState(null); //TO HIDE/SHOW THE APPLICANT DETAILS BOX
  const [searchedNames, setSearchedNamed] = useState(1); //TO GET THE SEARCH RESULT OF THE APPLICANTS

  // COMPARING MAIN DATA FROM THE DATABASE WITH THE SEARCH RESULT TO FIFLTER THE SEARCH RESULT AND SHOW IN THE FE
  let searchresult = [];
  for (let i = 0; i < searchedNames.length; i++) {
    for (let j = 0; j < fetchedDetails.length; j++) {
      if (searchedNames[i] === fetchedDetails[j].name) {
        searchresult.push(fetchedDetails[j]);
      }
    }
  }

  // FUNTION FOR SEARCHING THE APPLICANT NAME
  function Search(searchWord) {
    const letter = searchWord.toLowerCase();
    const letterLength = letter.length;

    function SearchLetter() {
      if (letterLength > 0) {
        const results = [];

        fetchedDetails.map(({ name }) => {
          const lowercaseData = name.toLowerCase();
          const namesSplitArr = [];
          const nameLength = lowercaseData.length;

          for (let j = 0; j < nameLength; j += letterLength) {
            const namesInletters = lowercaseData.substring(j, j + letterLength);
            namesSplitArr.push(namesInletters);
          }

          for (let i = 0; i < namesSplitArr.length; i++) {
            if (letter === namesSplitArr[i]) {
              results.push(name);
              return 0;
            }
          }
          return 0;
        });
        if (results.length) {
          setSearchedNamed(results);
        } else {
          setSearchedNamed(0);
        }
      } else {
        setSearchedNamed(1);
      }
    }
    SearchLetter();
  }

  if (!searchresult.length) {
    searchresult = [0];
  }

  return (
    <section className="table_mainCntr_MV">
      <article>
        <p>APPLICANT DETAILS</p>

        <div className="searchCntr">
          <div>
            <IconButton aria-label="delete">
              <SearchIcon />
            </IconButton>
            <input
              className="search"
              type="text"
              placeholder="Search Applicant"
              onChange={(e) => {
                Search(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="applicantDetailsCntr">
          {fetchedDetails && searchedNames === 1
            ? fetchedDetails.map((details, i) => (
                <div
                  className={show === i ? "" : "MoreDetailsMainCntr"}
                  key={i}
                >
                  <p
                    style={{
                      borderBottom: show === i ? "3px solid black" : "initial",
                      backgroundColor:
                        show === i ? "rgb(0, 129, 131)" : "initial",
                    }}
                    onClick={() => {
                      if (show !== i) {
                        setShow(i);
                      } else {
                        setShow(null);
                      }
                    }}
                  >
                    {details.name}
                  </p>
                  <MoreDetails
                    details={details}
                    show={show}
                    i={i}
                    setEditDetails={setEditDetails}
                    editDetails={editDetails}
                    setFetchedDetails={setFetchedDetails}
                  />
                </div>
              ))
            : searchresult.map((details, i) => {
                if (searchedNames !== 0) {
                  return (
                    <div
                      className={show === i ? "" : "MoreDetailsMainCntr"}
                      key={i}
                    >
                      <p
                        style={{
                          borderBottom:
                            show === i ? "3px solid black" : "initial",
                          backgroundColor:
                            show === i ? "rgb(0, 129, 131)" : "initial",
                        }}
                        onClick={() => {
                          if (show !== i) {
                            setShow(i);
                          } else {
                            setShow(null);
                          }
                        }}
                      >
                        {details.name}
                      </p>
                      <MoreDetails
                        details={details}
                        show={show}
                        i={i}
                        setEditDetails={setEditDetails}
                        editDetails={editDetails}
                        setFetchedDetails={setFetchedDetails}
                      />
                    </div>
                  );
                } else {
                  return <p>APPLICANT DOES NOT EXIST WITH THAT NAME</p>;
                }
              })}
        </div>
      </article>
    </section>
  );
}
