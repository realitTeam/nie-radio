import React from "react";

export default function SideBar() {
    return (
        <>
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/moderator">
                            <i className="bi bi-house-fill"></i>
                            <span>Home</span>
                        </a>
                    </li>
                    <li className="nav-heading">Recordings</li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                        <i className="bi bi-cassette-fill"></i>
                            <span>Recordings</span>
                        </a>
                    </li>
                    <li className="nav-heading">Student Management</li>
                    <li className="nav-item">
                        <a className="nav-link" href="/moderator/students/new">
                            <i className="bi bi-person-plus-fill"></i>
                            <span>New Student</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/moderator/students">
                            <i className="bi bi-people-fill"></i>
                            <span>All Students</span>
                        </a>
                    </li>
                </ul>
            </aside>
        </>
    );
}
