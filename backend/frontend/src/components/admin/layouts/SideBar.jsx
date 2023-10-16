import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
    return (
        <>
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin">
                            <i className="bi bi-house-fill"></i>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="nav-heading">Previous Recordings</li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/recordings/new">
                            <i className="bi bi-cassette-fill"></i>
                            <span>New Session</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/recordings">
                            <i className="bi bi-cassette-fill"></i>
                            <span>Recordings</span>
                        </Link>
                    </li>
                    <li className="nav-heading">Playlist</li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/playlist/new">
                            <i className="bi bi-cassette-fill"></i>
                            <span>New Audio</span>
                        </Link>
                    </li>
                    <li className="nav-heading">Blogs</li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/blogs/new">
                            <i className="bi bi-person-fill-add"></i>
                            <span>New Post</span>
                        </Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/admin/blogs">
                            <i className="bi bi-people-fill"></i>
                            <span>Posts</span>
                        </Link>
                    </li> */}
                    <li className="nav-heading">Moderators</li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/moderators/new">
                            <i className="bi bi-person-fill-add"></i>
                            <span>New Moderator</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/moderators">
                            <i className="bi bi-people-fill"></i>
                            <span>Moderators</span>
                        </Link>
                    </li>
                    <li className="nav-heading">Students</li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/students/new">
                            <i className="bi bi-person-fill-add"></i>
                            <span>New Student</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/students">
                            <i className="bi bi-people-fill"></i>
                            <span>Students</span>
                        </Link>
                    </li>
                </ul>
            </aside>
        </>
    );
}
