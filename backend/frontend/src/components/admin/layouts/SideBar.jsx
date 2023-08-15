import React from "react";

export default function SideBar() {
    return (
        <>
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/admin">
                            <i className="bi bi-house-fill"></i>
                            <span>Home</span>
                        </a>
                    </li>
                    <li className="nav-heading">Recordings</li>
                    <li className="nav-item">
                        <a className="nav-link" href="/admin/recordings">
                        <i className="bi bi-cassette-fill"></i>
                            <span>Recordings</span>
                        </a>
                    </li>
                    <li className="nav-heading">Moderators</li>
                    <li className="nav-item">
                        <a className="nav-link" href="/admin/moderators">
                        <i className="bi bi-people-fill"></i>
                            <span>Moderators</span>
                        </a>
                    </li>
                </ul>
            </aside>
        </>
    );
}