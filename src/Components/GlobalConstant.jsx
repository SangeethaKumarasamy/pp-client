export const API_URL = "http://localhost:7000";

export async function GetApplicantDetails(setFetchedDetails) {
  await fetch(`${API_URL}/details`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => setFetchedDetails(response.data));
}

// // TO ADD NEW APPLICANT TO THE DATABASE
export async function AddApplicantDetails(
  applicantDetails,
  resetForm,
  setFetchedDetails
) {
  await fetch(`${API_URL}/details`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(applicantDetails),
  });

  resetForm(); //TO RESET THE FORM ONCE NEW APPLICANT ADDED

  // TO GET THE NEW APPLICANT DETAILS LIST FROM THE DATABASE AFTER ADDING
  GetApplicantDetails(setFetchedDetails);
}

// TO EDIT THE SELECTED APPLICANT DETAILS AND PUSH TO THE DATABSE
export async function EditApplicantDetails(
  applicantDetails,
  resetForm,
  editDetails,
  setFetchedDetails
) {
  delete applicantDetails._id;
  await fetch(`${API_URL}/details/${editDetails._id}`, {
    method: "PUT",
    body: JSON.stringify(applicantDetails),
    headers: { "Content-Type": "application/json" },
  });

  resetForm(); //TO RESET THE FORM ONCE APPLICANT DETAILS EDITED AND SAVED

  // TO GET THE NEW APPLICANT DETAILS LIST FROM THE DATABASE AFTER EDITING
  await fetch(`${API_URL}/details`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => setFetchedDetails(response.data));
}

// TO DELETE APPLICANT DETAILS
export async function DeleteApplicantDetails(id, setFetchedDetails) {
  await fetch(`${API_URL}/details/${id}`, {
    method: "DELETE",
  });

  // TO REFRESH THE APPLICANT DETAILS TABLE AFTER DELETING
  GetApplicantDetails(setFetchedDetails);
}