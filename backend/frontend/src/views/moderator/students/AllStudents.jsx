import React, { useState, useEffect } from "react";
import { viewStudents } from "../../../actions/moderator/Student";

import Header from "../../../components/moderator/layouts/Header";
import SideBar from "../../../components/moderator/layouts/SideBar";
import Footer from "../../../components/moderator/layouts/Footer";

import "./AllStudents.css";

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    async function fetchStudents() {
      const studentsData = await viewStudents();
      setStudents(studentsData);
    }
    fetchStudents();
  }, []);

  const handleViewStudent = (student) => {
    event.preventDefault();
    setSelectedStudent(student);
    console.log(student);
  };

  return (
    <>
      <Header />
      <SideBar />
      <main id="main" className="main">
        {/* breadcrumb/////////////// */}
        <div className="pagetitle">
          <h1>All Students</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item active">Students</li>
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
                      All Students
                    </h5>
                  </div>

                  <table className="table ">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">ID/Grade</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students &&
                        students.map((student) => (
                          <tr key={student.id}>
                            <td>{student.student_name}</td>
                            <td>
                              ID : <span>{student.student_id} </span>
                              <br />
                              Grade : <span>{student.student_grade}</span>
                            </td>
                            <td>
                              {student.student_email} <br />
                              {student.student_phone}
                            </td>
                            <td className="align-middle">
                              <a
                                href=""
                                className="btn btn-sm btn-warning"
                                onClick={() => handleViewStudent(student)}
                              >
                                View
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

                  {selectedStudent && (
                    <div className="modal">
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="pagetitle">
                              {selectedStudent.student_name}
                            </div>
                          </div>
                          <div className="modal-body">
                            <p>ID: {selectedStudent.student_id}</p>
                            <p>Grade: {selectedStudent.student_grade}</p>
                            <p>Email: {selectedStudent.student_email}</p>
                            <p>Phone: {selectedStudent.student_phone}</p>
                          </div>
                          <div className="modal-footer">
                            <button onClick={() => setSelectedStudent(null)} className="btn btn-sm btn-danger">
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
