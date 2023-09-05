import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

export default function ProfileDropdown() {
    // const history = useHistory();

    const [userData, setUserData] = useState({});
    const token = localStorage.getItem("token");
    const tokenPayload = jwtDecode(token);

    const username = tokenPayload.username;
    const userrole = tokenPayload.role;

    useEffect(() => {
        // Make an API call to get user data based on the user ID
        axios.get(`/api/user/${username}/details`)
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, [username]);

    const handleSignOut = () => {
        // Remove the token from local storage
        localStorage.removeItem("token");
        window.location.reload()
    };

    // const handleProfileClick = () => {
    //     if (userrole === 'admin') {
    //         window.location.href("/admin/profile");
    //     } else if (userrole === 'moderator') {
    //         window.location.href("/moderator/profile");
    //     } else if (userrole === 'student') {
    //         window.location.href("/student/profile");
    //     }
    // };

    return (
        <>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                    <h6>{userData.name}</h6>
                    <span>{username}</span>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <a className="dropdown-item d-flex align-items-center" onClick="#">
                        <i className="bi bi-gear"></i>
                        <span>Profile</span>
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <a className="dropdown-item d-flex align-items-center" onClick={handleSignOut}>
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Sign Out</span>
                    </a>
                </li>
            </ul>
        </>
    );
}
