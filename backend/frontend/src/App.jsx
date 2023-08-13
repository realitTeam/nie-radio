import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Welcome/>} />
          {/* auth routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/m" element={<RegisterModerator />} />
          <Route path="/login" element={<Login />} />
          {/* moderator routes */}
          <Route path="/moderator" element={<ModeratorHome />} />
          <Route path="/moderator/students/new" element={<NewStudent />} />
          <Route path="/moderator/students" element={<AllStudent />} />
          {/* student routes */}
          <Route path="/student" element={<StudentHome />} />
          <Route path="/student/recordings" element={<AllStudentRecordings />} />
          {/* admin routes */}
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/moderators" element={<AllModerators />} />
          <Route path="/admin/recordings" element={<AllRecordings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
