import React, { useState, useEffect } from "react";
import { viewModerators } from "../../../actions/admin/Moderators";

import Header from "../../../components/admin/layouts/Header";
import SideBar from "../../../components/admin/layouts/SideBar";
import Footer from "../../../components/admin/layouts/Footer";

export default function AllModerators() {
  const [moderators, setModerators] = useState([]);

  useEffect(() => {
    async function fetchModerators() {
      const moderatorsData = await viewModerators();
      setModerators(moderatorsData);
    }
    fetchModerators();
  }, []);

  console.log(moderators);
  return (
    <>
      <Header />
      <SideBar />
      <main id="main" className="main">
        {/* breadcrumb/////////////// */}
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
        {/* content////////////////////////////////// */}
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-2 pb-2">
                    <h5 className="card-title text-start pb-0 fs-4">
                      All Moderators
                    </h5>
                  </div>

                  <table className="table ">
                    <thead>
                      <tr>
                        <th scope="col">Org. ID</th>
                        <th scope="col">Org. Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {moderators &&
                        moderators.map((moderator) => (
                          <tr key={moderator.id}>
                            <td>{moderator.refferal_code}</td>
                            <td>
                              {moderator.organization_name} <br />
                              <span>{moderator.organization_address}</span>
                            </td>
                            <td>{moderator.organization_email}</td>
                            <td className="align-middle">
                              <span
                                className={`badge badge-sm text-bg-${
                                  moderator.moderator_status === "active"
                                    ? "success"
                                    : "info"
                                }`}
                              >
                                {moderator.moderator_status}
                              </span>
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
      {/* <Footer /> */}
    </>
  );
}
