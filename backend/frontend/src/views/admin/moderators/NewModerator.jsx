import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import Header from "../../../components/admin/layouts/Header";
import SideBar from "../../../components/admin/layouts/SideBar";
import Footer from "../../../components/admin/layouts/Footer";

export default function NewModerator() {
    const [formData, setFormData] = useState({});
    const [district, setDistrict] = useState("");
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);

    const displayErrorAlert = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: message,
        });
    };

    // Function to generate referral code based on the district
    const generateReferralCode = (district) => {
        const randomNum = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
        const district_firstLetter = district.charAt(0).toUpperCase();
        return district_firstLetter + randomNum;
    };

    // Function to handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const validPhonePattern =  /^0\d{9}$/;
        if (!formData.organization_name) {
            displayErrorAlert("Name of the School/Organization is required.");
        }
        else if (!formData.organization_address) {
            displayErrorAlert("Address of the School/Organization is required.");
        }

        else if (!formData.province) {
            displayErrorAlert("Province is required.");
        }

        else if (!formData.district) {
            displayErrorAlert("District is required.");
        }

        else if (!formData.organization_email) {
            displayErrorAlert("School Email is required.");
        }

        else if (!formData.organization_phone) {
            displayErrorAlert("School Phone is required.");
        }else if (!validPhonePattern.test(formData.organization_phone)) {
            displayErrorAlert("Invalid School's Phone format.");
        }

        else if (!formData.principal_name) {
            displayErrorAlert("Principal's Name is required.");
        }

        else if (!formData.principal_email) {
            displayErrorAlert("Principal's Email is required.");
        }

        else if (!formData.principal_phone) {
            displayErrorAlert("Principal's Phone is required.");
        } else  if (!validPhonePattern.test(formData.principal_phone)) {
            displayErrorAlert("Invalid Principal's Phone format.");
        }
          
        try {
            const response = await axios.post(
                "/api/admin/moderators/store",
                formData
            );
            if (response && response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Organization successfully registered.',
                    timer: 2500, // Display for 3 seconds
                    showConfirmButton: false, // Hide the "OK" button
                  }).then(() => {
                    window.location.reload();
                  });
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Handle validation error
                Swal.fire({
                    icon: 'error',
                    title: 'Validation Error',
                    text: 'Please check input values and try again.',
                });
            }else if (error.response && error.response.status === 409){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Organization already exist.',
                });
            } else {
                // Handle other server errors
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while submitting. Please try again later.',
                });
            }
        }
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

            if (id === "province") {
                // Update the district options based on the selected province
                const updatedDistrictOptions = getDistrictOptionsByProvince(value);
                setDistrictOptions(updatedDistrictOptions);
            }
        }
    };

    // Define province to district mapping
    const provinceToDistricts = {
        Central: ["Kandy", "Matale", "Nuwara Eliya"],
        "North Central": ["Anuradhapura", "Polonnaruwa"],
        Northern: ["Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullathivu"],
        Eastern: ["Ampara", "Batticaloa", "Trincomalee"],
        "North Western": ["Kurunagala", "Puttalam"],
        Southern: ["Galle", "Hambanthota", "Mathara"],
        Uva: ["Badulla", "Monaragala"],
        Sabaragamuwa: ["Kegalle", "Rathnapura"],
        Western: ["Colombo", "Gampaha", "Kaluthara"],
    };

    // Get district options based on the selected province
    const getDistrictOptionsByProvince = (selectedProvince) => {
        return provinceToDistricts[selectedProvince] || [];
    };

    useEffect(() => {
        // Initialize province options
        const provinces = Object.keys(provinceToDistricts);
        setProvinceOptions(provinces);
    }, []);

    return (
        <>
            <Header />
            <SideBar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>New Moderator</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/">Home</a>
                            </li>
                            <li className="breadcrumb-item active">New Moderator</li>
                        </ol>
                    </nav>
                </div>
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card mb-3 crd_bg_lgt">
                                <div className="card-body">
                                    <form
                                        onSubmit={handleFormSubmit}
                                        method="POST"
                                        className="row g-3 needs-validation"
                                        name="schoolForm"
                                        id="schoolForm"
                                    >
                                        <div className="col-12  pt-4">
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
                                                    name="province"
                                                    id="province"
                                                >
                                                    <option value="" disabled selected>
                                                        --select--
                                                    </option>
                                                    {provinceOptions.map((province) => (
                                                        <option key={province} value={province}>
                                                            {province}
                                                        </option>
                                                    ))}
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
                                                    <option value="" disabled>
                                                        --select--
                                                    </option>
                                                    {districtOptions.map((district) => (
                                                        <option key={district} value={district}>
                                                            {district}
                                                        </option>
                                                    ))}
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
                                            <button className="btn btn-primary" type="submit">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
