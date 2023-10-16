// Admin.jsx
import { useState, useEffect } from 'react';

import Header from "../../components/admin/layouts/Header";
import SideBar from "../../components/admin/layouts/SideBar";
import Footer from "../../components/admin/layouts/Footer";

import './admin.css';
import RadioPlayer from '../../components/radio/RadioPlayer';
import AChat from '../../components/admin/AChat';
import AListnerCount from '../../components/admin/listner_count/ListnerCount';

export default function Home() {

  return (
    <>
      <Header />
      <SideBar />
      <main id="main" className="main">
        {/* 1st section */}
        <section className="">
          <div className="row">
            <div className="col-md-6">
              <RadioPlayer />
              <AListnerCount />
              {/* <div className="row">
                <div className="col-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Test Component</h5>
                      <h2>320 Online</h2>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Test Component</h5>
                      <h2>320 Messages</h2>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Test Component</h5>
                      <h2>320</h2>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Test Component</h5>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Lorem ipsum dolor sit amet.</li>
                        <li className="list-group-item">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</li>
                        <li className="list-group-item">Lorem ipsum dolor sit.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="col-md-6">
              <AChat />
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
}
