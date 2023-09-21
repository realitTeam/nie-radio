
import React, { useState, useEffect } from "react";
import axios from 'axios'
import Header from "../../../components/admin/layouts/Header";
import SideBar from "../../../components/admin/layouts/SideBar";
import Footer from "../../../components/admin/layouts/Footer";

function ModeratorModal({ selectedModerator, onClose, updateModeratorList }) {
  const toggleModeratorStatus = async () => {
    try {
      const moderator_email = selectedModerator.organization_email;
      await axios.put(`http://localhost:8000/api/admin/moderators/status/${moderator_email}`);
      selectedModerator.moderator_status = selectedModerator.moderator_status === "active" ? "inactive" : "active";
      // Call the function to update the moderator list
      updateModeratorList();
    } catch (error) {
      console.error("Error toggling moderator status", error);
    }
  };

  return (
    <div className="modal fade" id="moderatorInfoModal" tabIndex="-1" aria-labelledby="moderatorInfoModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{selectedModerator.organization_name}</h5>
            {/* <button type="button" className="btn-close" onClick={onClose}></button> */}
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-12">
                <div>Referral Code:</div>
                <div className="fw-bold">{selectedModerator.refferal_code}</div>
              </div>
              <div className="col-md-6">
                <div>School Name:</div>
                <div className="fw-bold">{selectedModerator.organization_name}</div>
              </div>
              <div className="col-md-6">
                <div>School Address:</div>
                <div className="fw-bold">{selectedModerator.organization_address}</div>
              </div>
              <div className="col-md-6">
                <div>Province:</div>
                <div className="fw-bold">{selectedModerator.province}</div>
              </div>
              <div className="col-md-6">
                <div>District:</div>
                <div className="fw-bold">{selectedModerator.district}</div>
              </div>
              <div className="col-md-6">
                <div>School Email:</div>
                <div className="fw-bold">{selectedModerator.organization_email}</div>
              </div>
              <div className="col-md-6">
                <div>School Phone:</div>
                <div className="fw-bold">{selectedModerator.organization_phone}</div>
              </div>
              <div className="col-md-6">
                <div>Principal's Name:</div>
                <div className="fw-bold">{selectedModerator.principal_name}</div>
              </div>
              <div className="col-md-6">
                <div>Principal's Email:</div>
                <div className="fw-bold">{selectedModerator.principal_email}</div>
              </div>
              <div className="col-md-6">
                <div>Principal's Phone:</div>
                <div className="fw-bold">{selectedModerator.principal_phone}</div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={toggleModeratorStatus} className="btn btn-sm btn-primary">
              {selectedModerator.moderator_status === "active" ? "Inactive" : "Active"}
            </button>
            {/* <button onClick={onClose} className="btn btn-sm btn-danger">
              Close
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AllModerators() {
  const [moderators, setModerators] = useState([]);
  const [selectedModerator, setSelectedModerator] = useState(null);

  const updateModeratorList = async () => {
    try {
      const moderatorsData = await axios.get('http://localhost:8000/api/admin/moderators');
      setModerators(moderatorsData.data);
    } catch (error) {
      console.error("Error fetching moderators", error);
    }
  };

  const handleViewModerator = (moderator) => {
    setSelectedModerator(moderator);
  };

  useEffect(() => {
    // Fetch the initial list of moderators
    updateModeratorList();
  }, []);

  return (
    <>
      <Header />
      <SideBar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>All Moderators</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item active">Moderators</li>
            </ol>
          </nav>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card mb-3 crd_bg_lgt">
                <div className="card-body">
                  <table className="table pt-4">
                    <thead>
                      <tr>
                        <th scope="col">School ID</th>
                        <th scope="col">School Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {moderators.map((moderator) => (
                        <tr key={moderator.id}>
                          <td>{moderator.refferal_code}</td>
                          <td>
                            {moderator.organization_name} <br />
                            <span>{moderator.organization_address}</span>
                          </td>
                          <td>{moderator.organization_email}</td>
                          <td className="align-middle">
                            <span
                              className={`badge badge-sm text-bg-${moderator.moderator_status === "active"
                                ? "info"
                                : "warning"
                                }`}
                            >
                              {moderator.moderator_status}
                            </span>
                          </td>
                          <td className="align-middle">
                            <button
                              className="btn btn-sm btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#moderatorInfoModal"
                              onClick={() => handleViewModerator(moderator)}>
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {selectedModerator && (
        <ModeratorModal selectedModerator={selectedModerator} onClose={() => setSelectedModerator(null)} updateModeratorList={updateModeratorList} />
      )}
    </>
  );
}
