// App.jsx
import React, { useState } from "react";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import ModeratorHome from "./views/moderator/Home";
import Welcome from "./views/welcome/Welcome";
import NewStudent from "./views/moderator/students/NewStudent";
import AllStudent from "./views/moderator/students/AllStudents";
import StudentHome from "./views/student/Home";
import AdminHome from "./views/admin/Home";
import RegisterModerator from "./views/auth/RegisterModerator";
import AllModerators from "./views/admin/moderators/AllModerators";
import AllRecordings from "./views/admin/recordings/AllRecordings";
import AllStudentRecordings from "./views/student/AllRecordings";
import AllStudents from "./views/admin/students/AllStudents";
import NewModerator from "./views/admin/moderators/NewModerator";
import ANewStudent from "./views/admin/students/NewStudent";
import ANewRecording from "./views/admin/recordings/NewRecording";
import MAllStudents from "./views/moderator/students/AllStudents";
import About from "./views/welcome/About";
import Contact from "./views/welcome/Contact";
import Blog from "./views/welcome/Blog";
import Radio3D from "./views/welcome/Radio3D";
import Messenger from "./views/welcome/Messenger";
import Programs from "./views/welcome/Programs";

function AuthenticatedRoute({ element, token, allowedRoles }) {
  const storedToken = localStorage.getItem("token");

  if (!token && !storedToken) {
    // User is not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  if (token || storedToken) {
    const tokenPayload = jwtDecode(token || storedToken); // Use jwtDecode
    const userRole = tokenPayload.role; // Extract role from the JWT

    // Check if the user's role is allowed to access the route
    if (allowedRoles.includes(userRole)) {
      return element;
    } else {
      // Redirect to unauthorized page or show a message
      return <div className="text-center align-items-center">
        <h2>Sorry!</h2>
        <h3>You are not authorized to access this page.</h3>
      </div>;
    }
  }
};


function App() {
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null); // New state to store user role

  const handleLogin = (newToken, role) => {
    setToken(newToken);
    setUserRole(role);
  };

  return (
    <div>
      <Router>
        <Routes>
          {/* web routes */}
          <Route path="/" exact element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/3d-radio" element={<Radio3D />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/programs" element={<Programs />} />
          {/* auth routes */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/m" element={<RegisterModerator />} />
          {/* moderator routes */}
          <Route path="/moderator" element={<AuthenticatedRoute token={token} allowedRoles={["moderator"]} element={<ModeratorHome />} />} />
          <Route path="/moderator/students/new" element={<AuthenticatedRoute token={token} allowedRoles={["moderator"]} element={<NewStudent />} />} />
          <Route path="/moderator/students" element={<AuthenticatedRoute token={token} allowedRoles={["moderator"]} element={<MAllStudents />} />} />
          {/* student routes */}
          <Route path="/student" element={<AuthenticatedRoute token={token} allowedRoles={["student"]} element={<StudentHome />} />} />
          <Route path="/student/recordings" element={<AuthenticatedRoute token={token} allowedRoles={["student"]} element={<AllStudentRecordings />} />} />
          {/* admin routes */}
          <Route path="/admin" element={<AuthenticatedRoute token={token} allowedRoles={["admin"]} element={<AdminHome />} />} />
          <Route path="/admin/moderators" element={<AuthenticatedRoute token={token} allowedRoles={["admin"]} element={<AllModerators />} />} />
          <Route path="/admin/moderators/new" element={<AuthenticatedRoute token={token} allowedRoles={["admin"]} element={<NewModerator />} />} />
          <Route path="/admin/students" element={<AuthenticatedRoute token={token} allowedRoles={["admin"]} element={<AllStudents />} />} />
          <Route path="/admin/students/new" element={<AuthenticatedRoute token={token} allowedRoles={["admin"]} element={<ANewStudent />} />} />
          <Route path="/admin/recordings" element={<AuthenticatedRoute token={token} allowedRoles={["admin"]} element={<AllRecordings />} />} />
          <Route path="/admin/recordings/new" element={<AuthenticatedRoute token={token} allowedRoles={["admin"]} element={<ANewRecording />} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
