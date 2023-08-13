import { useState } from "react";
import axios from "axios";
import "../../assets/css/auth/Register.css";
import { createModerator } from "../../actions/auth/CreateModerator";

export default function RegisterModerator() {
  const [formData, setFormData] = useState({});
  const [district, setDistrict] = useState("");

  // Function to generate referral code based on the district
  const generateReferralCode = (district) => {
    const randomNum = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
    const district_firstLetter = district.charAt(0).toUpperCase();
    return district_firstLetter + randomNum;
  };

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    createModerator(formData);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "district") {
      setDistrict(value);
      const referralCode = generateReferralCode(value);
      setFormData({
        ...formData,
        district: value,
        refferal_code: referralCode,
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  return (
    <>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <a
                      href="/"
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src="assets/img/logo.png" alt="" />
                      <span className="d-none d-lg-block">NIE Radio</span>
                    </a>
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-2">
                        <h5 className="card-title text-start pb-0 fs-4">
                          <strong>Register for a School</strong>
                        </h5>
                      </div>
                      <hr />
                      <form
                        onSubmit={handleFormSubmit}
                        method="POST"
                        className="row g-3 needs-validation"
                        name="schoolForm"
                        id="schoolForm"
                      >
                        <div className="col-12">
                          <label
                            htmlFor="organization_name"
                            className="form-label"
                          >
                            Name of the School/Organization{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            onChange={handleChange}
                            type="text"
                            name="organization_name"
                            className="form-control"
                            id="organization_name"
                            required
                          />
                        </div>

                        <div className="col-12">
                          <label
                            htmlFor="organization_address"
                            className="form-label"
                          >
                            Address of the School/Organization{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            onChange={handleChange}
                            type="text"
                            name="organization_address"
                            className="form-control"
                            id="organization_address"
                            required
                          />
                        </div>

                        <div className="col-6">
                          <label htmlFor="province" className="form-label">
                            Province <span className="text-danger">*</span>
                          </label>
                          <div className="col-12">
                            <select
                              onChange={handleChange}
                              className="form-select"
                              aria-label="Default select example"
                              name="province"
                              id="province"
                            >
                              <option value="Central">Central</option>
                              <option value="Eastern">Eastern</option>
                              <option value="Northern">Northern</option>
                              <option value="North Central">
                                North Central
                              </option>
                              <option value="North Western">
                                North Western
                              </option>
                              <option value="Sabaragamuwa">Sabaragamuwa</option>
                              <option value="Southern">Southern</option>
                              <option value="Uva">Uva</option>
                              <option value="Western">Western</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-6">
                          <label htmlFor="district" className="form-label">
                            District <span className="text-danger">*</span>
                          </label>
                          <div className="col-12">
                            <select
                              onChange={handleChange}
                              className="form-select"
                              aria-label="Default select example"
                              name="district"
                              id="district"
                              value={district}
                            >
                              <option value="Colombo">Colombo</option>
                              <option value="Gampaha">Gampaha</option>
                              <option value="Kalutara">Kalutara</option>
                              <option value="Kandy">Kandy</option>
                              <option value="Matale">Matale</option>
                              <option value="Nuwara Eliya">Nuwara Eliya</option>
                              <option value="Galle">Galle</option>
                              <option value="Matara">Matara</option>
                              <option value="Hambantota">Hambantota</option>
                              <option value="Jaffna">Jaffna</option>
                              <option value="Kilinochchi">Kilinochchi</option>
                              <option value="Mannar">Mannar</option>
                              <option value="Vavuniya">Vavuniya</option>
                              <option value="Mullathivu">Mullathivu</option>
                              <option value="Batticaloa">Batticaloa</option>
                              <option value="Ampara">Ampara</option>
                              <option value="Trincomalee">Trincomalee</option>
                              <option value="Kurunegala">Kurunegala</option>
                              <option value="Puttalam">Puttalam</option>
                              <option value="Anuradhapura">Anuradhapura</option>
                              <option value="Polonnaruwa">Polonnaruwa</option>
                              <option value="Badulla">Badulla</option>
                              <option value="Moneragala">Moneragala</option>
                              <option value="Ratnapura">Ratnapura</option>
                              <option value="Kegalle">Kegalle</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-6">
                          <label
                            htmlFor="organization_email"
                            className="form-label"
                          >
                            School Email <span className="text-danger">*</span>
                          </label>
                          <input
                            onChange={handleChange}
                            type="email"
                            name="organization_email"
                            className="form-control"
                            id="organization_email"
                            required
                          />
                        </div>
                        <div className="col-6">
                          <label
                            htmlFor="organization_phone"
                            className="form-label"
                          >
                            School Phone <span className="text-danger">*</span>
                          </label>
                          <input
                            onChange={handleChange}
                            type="text"
                            name="organization_phone"
                            className="form-control"
                            id="organization_phone"
                            required
                          />
                        </div>
                        <hr />
                        <div className="col-12">
                          <label
                            htmlFor="principal_name"
                            className="form-label"
                          >
                            Principal's Name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            onChange={handleChange}
                            type="text"
                            name="principal_name"
                            className="form-control"
                            id="principal_name"
                            required
                          />
                        </div>
                        <div className="col-6">
                          <label
                            htmlFor="principal_email"
                            className="form-label"
                          >
                            Principal's Email{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            onChange={handleChange}
                            type="email"
                            name="principal_email"
                            className="form-control"
                            id="principal_email"
                            required
                          />
                        </div>
                        <div className="col-6">
                          <label
                            htmlFor="principal_phone"
                            className="form-label"
                          >
                            Principal's Phone{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            onChange={handleChange}
                            type="text"
                            name="principal_phone"
                            className="form-control"
                            id="principal_phone"
                            required
                          />
                        </div>
                        <hr />
                        <div className="col-12">
                          <label htmlFor="refferal_code" className="form-label">
                            School/Organization's Reference ID
                          </label>
                          <div className="input-group has-validation">
                            <span
                              className="input-group-text"
                              id="inputGroupPrepend"
                            >
                              <i className="bi bi-upc-scan"></i>
                            </span>
                            <input
                              onChange={handleChange}
                              type="text"
                              name="refferal_code"
                              className="form-control"
                              id="refferal_code"
                              value={formData.refferal_code || ""}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="password" className="form-label">
                            Password <span className="text-danger">*</span>
                          </label>
                          <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            className="form-control"
                            id="password"
                            required
                          />
                        </div>

                        <div className="col-12">
                          <div className="form-check">
                            <input
                              // onChange={handleChange}
                              className="form-check-input"
                              name="accept_terms"
                              type="checkbox"
                              id="accept_terms"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="acceptTerms"
                            >
                              I agree and accept the{" "}
                              <a href="#">terms and conditions</a>
                            </label>
                            <div className="invalid-feedback">
                              You must agree before submitting.
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <button className="btn btn-primary" type="submit">
                            Submit
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            Already have an account? <a href="/login">Log in</a>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
