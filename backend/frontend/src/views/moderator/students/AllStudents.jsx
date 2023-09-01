// MAllStudents.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios'
import jwtDecode from "jwt-decode";

import Header from "../../../components/moderator/layouts/Header";
import SideBar from "../../../components/moderator/layouts/SideBar";
import Footer from "../../../components/moderator/layouts/Footer";

// function StudentModal({ selectedStudent, onClose }) {
//   const toggleStudentStatus = async () => {
//     try {
//       const student_email = selectedStudent.student_email;
//       await axios.put(`/api/moderator/students/status/${student_email}`);
//       // Update the moderator status in the selectedStudent object
//       selectedStudent.student_status = selectedStudent.student_status === "active" ? "inactive" : "active";
//       // Close the modal after toggling
//       onClose();
//     } catch (error) {
//       console.error("Error toggling student status", error);
//     }
//   };

//   return (
//     <div className="modal">
//       <div className="modal-dialog modal-lg modal-dialog-centered">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">{selectedStudent.refferal_code}</h5>
//             <button type="button" className="btn-close" onClick={onClose}></button>
//           </div>
//           <div className="modal-body">
//             <div className="row">
//               <div className="col-md-6">
//                 <div>Student's Name:</div>
//                 <div className="fw-bold">{selectedStudent.student_name}</div>
//               </div>
//               <div className="col-md-6">
//                 <div>Student ID:</div>
//                 <div className="fw-bold">{selectedStudent.student_id}</div>
//               </div>

//               <div className="col-md-12">
//                 <div>Grade:</div>
//                 <div className="fw-bold">{selectedStudent.student_grade}</div>
//               </div>
//               <div className="col-md-6">
//                 <div>Email:</div>
//                 <div className="fw-bold">{selectedStudent.student_email}</div>
//               </div>

//               <div className="col-md-6">
//                 <div>Phone:</div>
//                 <div className="fw-bold">{selectedStudent.student_phone}</div>
//               </div>
//             </div>
//           </div>
//           <div className="modal-footer">
//             <button onClick={toggleStudentStatus} className="btn btn-sm btn-info">
//               {selectedStudent.student_status === "active" ? "Inactive" : "Active"}
//             </button>
//             <button onClick={onClose} className="btn btn-sm btn-danger">
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


export default function MAllStudents() {
  const [students, setStudents] = useState([]);
  // const [selectedStudent, setSelectedStudent] = useState(null);

  // const handleViewStudent = (student) => {
  //   setSelectedStudent(student);
  // };

  const token = localStorage.getItem("token");
  const tokenPayload = jwtDecode(token);

  const username = tokenPayload.username;

  useEffect(() => {
    async function fetchStudents() {
      const studentsData = await axios.get(`/api/moderator/students/${username}`);
      setStudents(studentsData.data);
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
              <div className="card crd_bg_lgt mb-3">
                <div className="card-body">
                  <div className="pt-2 pb-2">
                  </div>

                  <table className="table ">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">ID/Grade</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Status</th>
                        {/* <th scope="col">Actions</th> */}
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
                            {/* <td className="align-middle">
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => handleViewStudent(student)}
                              >
                                View
                              </button>
                            </td> */}

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
      {/* {selectedStudent && (
        <StudentModal
          selectedStudent={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )} */}
    </>
  );
}
