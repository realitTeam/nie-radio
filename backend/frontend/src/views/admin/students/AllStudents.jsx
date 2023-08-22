// AllStudents.jsx
import React, { useState, useEffect } from "react";
import { viewStudents, changeStudentStatus } from "../../../actions/admin/Student";

import Header from "../../../components/admin/layouts/Header";
import SideBar from "../../../components/admin/layouts/SideBar";
import Footer from "../../../components/admin/layouts/Footer";

function StudentModal({ selectedStudent, onClose }) {
  const toggleStudentStatus = async () => {
    try {
      // Call an API to toggle the status
      await changeStudentStatus(selectedStudent._id);
      // Update the Student status in the selectedStudent object
      selectedStudent.student_status = selectedStudent.student_status === "active" ? "inactive" : "active";
      // Close the modal after toggling
      onClose();
    } catch (error) {
      console.error("Error toggling student status", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{selectedStudent.refferal_code}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <div>Student's Name:</div>
                <div className="fw-bold">{selectedStudent.student_name}</div>
              </div>
              <div className="col-md-6">
                <div>Student ID:</div>
                <div className="fw-bold">{selectedStudent.student_id}</div>
              </div>

              <div className="col-md-12">
                <div>Grade:</div>
                <div className="fw-bold">{selectedStudent.student_grade}</div>
              </div>
              <div className="col-md-6">
                <div>Email:</div>
                <div className="fw-bold">{selectedStudent.student_email}</div>
              </div>

              <div className="col-md-6">
                <div>Phone:</div>
                <div className="fw-bold">{selectedStudent.student_phone}</div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={toggleStudentStatus} className="btn btn-sm btn-info">
              {selectedStudent.student_status === "active" ? "Inactive" : "Active"}
            </button>
            <button onClick={onClose} className="btn btn-sm btn-danger">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
  };

  useEffect(() => {
    async function fetchStudents() {
      const studentsData = await viewStudents();
      setStudents(studentsData);
    }
    fetchStudents();
  }, []);


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
                        <th scope="col">Status</th>
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
                            <span
                              className={`badge badge-sm text-bg-${student.student_status === "active"
                                ? "info"
                                : "warning"
                                }`}
                            >
                              {student.student_status}
                            </span>
                          </td>
                            <td className="align-middle">
                              <button
                                href=""
                                className="btn btn-sm btn-primary"
                                onClick={() => handleViewStudent(student)}
                              >
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
      {selectedStudent && (
        <StudentModal
          selectedStudent={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </>
  );
}
