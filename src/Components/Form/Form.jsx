import { useFormik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";
import { AddApplicantDetails, EditApplicantDetails } from "../GlobalConstant";
import Button from "@mui/material/Button";
import "./Form.css";

export function Form({ editDetails, setFetchedDetails }) {
  // FORM VALIDATION
  const formValidationSchema = yup.object({
    name: yup.string().required(),
    countryCode: yup.number().required(),
    mobileNum: yup.number().required(),
    email: yup.string().required(),
    jobType: yup.string().required(),
    dob: yup.string().required(),
    prefLocation: yup.array().min(1),
  });

  // FORMIK
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      countryCode: "+91",
      mobileNum: "",
      email: "",
      jobType: "",
      dob: "",
      prefLocation: [],
    },
    validationSchema: formValidationSchema,
    onSubmit: (applicantDetails, { resetForm }) => {
      if (editDetails) {
        return EditApplicantDetails(
          applicantDetails,
          resetForm,
          editDetails,
          setFetchedDetails
        );
      }
      AddApplicantDetails(applicantDetails, resetForm, setFetchedDetails);
    },
  });

  // TO ADD THE SELECTED APPLICANT DETAILS TO THE FORM FIELDS
  useEffect(() => {
    if (editDetails) {
      for (let details in editDetails) {
        setFieldValue(details, editDetails[details]);
      }
    }
  }, [editDetails, setFieldValue]);

  // TO SELECT THE APPLICANT PREFERRED LOCATION DETAILS DYNAMICALLY DURING EDITING
  const prefLocation = values.prefLocation;
  function SetCheckboxValue(placeName) {
    if (prefLocation.length) {
      const foundPlaceName = prefLocation.find((data) => data === placeName);
      return foundPlaceName;
    }
  }

  return (
    <section className="form_mainCntr">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>REGISTRATION</legend>

          <article className="inputFields">
            {/* PROFILE PICTURE - MOBILE VIEW */}
            <div className="applicant_img_cntr mobileView applicant_img_cntr_MV">
              <img
                className="applicant_img"
                src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
                alt="Profile"
              />

              <input type="file" />
            </div>

            {/* FULL NAME */}
            <label htmlFor="name">
              Full Name
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={errors.name && touched.name ? "errors" : ""}
              />
            </label>

            {/* PROFILE PICTURE - DESKTOP VIEW */}
            <div className="applicant_img_cntr desktopView">
              <p>Profile Pic</p>

              <div>
                <img
                  className="applicant_img"
                  src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
                  alt="Profile"
                />

                <input type="file" />
              </div>
            </div>

            {/* MOBILE NUMBER */}
            <label className="mobileNum" htmlFor="mobile">
              Mobile
              <div>
                <input
                  type="text"
                  id="countryCode"
                  name="countryCode"
                  onChange={handleChange}
                  value={values.countryCode}
                  disabled
                />

                <input
                  type="number"
                  id="mobileNum"
                  name="mobileNum"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mobileNum}
                  className={
                    errors.mobileNum && touched.mobileNum ? "errors" : ""
                  }
                />
              </div>
            </label>

            {/* EMAIL ID */}
            <label htmlFor="email">
              Email ID
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={errors.email && touched.email ? "errors" : ""}
              />
            </label>

            {/* JOB TYPE */}
            <div className="JobType">
              <p>Job Type</p>

              <div
                className={errors.jobType && touched.jobType ? "errorsSpl" : ""}
              >
                <input
                  type="radio"
                  id="ft"
                  name="jobType"
                  value="Full Time"
                  checked={values.jobType === "Full Time"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="ft">FT</label>
                <input
                  type="radio"
                  id="pt"
                  name="jobType"
                  value="Part Time"
                  checked={values.jobType === "Part Time"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="pt">PT</label>
                <input
                  type="radio"
                  id="consultant"
                  name="jobType"
                  value="Consultant"
                  checked={values.jobType === "Consultant"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="consultant">Consultant</label>
              </div>
            </div>

            {/* DATE OF BIRTH */}
            <label htmlFor="dob">
              DOB
              <input
                type="date"
                id="dob"
                name="dob"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.dob}
                className={errors.dob && touched.dob ? "errors" : ""}
              />
            </label>

            {/* PREFERREFD LOCATION */}
            <div className="pref_location">
              <p>Pref. Location</p>

              <div>
                <div
                  className={
                    errors.prefLocation && touched.prefLocation
                      ? "errorsSpl"
                      : ""
                  }
                >
                  <input
                    type="checkbox"
                    id="chennai"
                    name="prefLocation"
                    value="Chennai"
                    checked={SetCheckboxValue("Chennai") === "Chennai"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="chennai">Chennai</label>
                </div>
                <div
                  className={
                    errors.prefLocation && touched.prefLocation
                      ? "errorsSpl"
                      : ""
                  }
                >
                  <input
                    type="checkbox"
                    id="bangalore"
                    name="prefLocation"
                    value="Bangalore"
                    checked={SetCheckboxValue("Bangalore") === "Bangalore"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="bangalore">Bangalore</label>
                </div>
                <div
                  className={
                    errors.prefLocation && touched.prefLocation
                      ? "errorsSpl"
                      : ""
                  }
                >
                  <input
                    type="checkbox"
                    id="New Delhi"
                    name="prefLocation"
                    value="New Delhi"
                    checked={SetCheckboxValue("New Delhi") === "New Delhi"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="New Delhi">New Delhi</label>
                </div>
              </div>
            </div>
          </article>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            className="submit_btn btnAnim"
            variant="contained"
          >
            ADD/UPDATE
          </Button>
        </fieldset>
      </form>
    </section>
  );
}