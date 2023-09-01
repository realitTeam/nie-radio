import { useState, useEffect } from "react";

import Header from "../../components/moderator/layouts/Header";
import SideBar from "../../components/moderator/layouts/SideBar";
import Footer from "../../components/moderator/layouts/Footer";

import "./App.css";
import "./Home.css";
import RadioPlayer from "../../components/radio/RadioPlayer";

export default function Home() {
  return (
    <>
      <Header />
      <SideBar />
      <main id="main" className="main">
        <section>
        <RadioPlayer />
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
}
