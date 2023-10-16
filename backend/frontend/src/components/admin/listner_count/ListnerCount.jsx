// AListnerCount.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import io from "socket.io-client";

// import "./achat.css"

const AListnerCount = () => {
    return (
        <>
            <div className="col-md-12">
                <div className="card crd_bg_lgt_">
                    <div className="card-body p-2">
                        <h3 className=""><i class="bi bi-people-fill"></i> 2 Total Listners</h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AListnerCount;
