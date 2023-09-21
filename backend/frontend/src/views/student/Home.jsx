
import ReactPlayer from 'react-player';

import Header from "../../components/student/layouts/Header";
import SideBar from "../../components/student/layouts/SideBar";
import Footer from "../../components/student/layouts/Footer";

import './App.css';
import './Home.css'
import RadioPlayer from '../../components/radio/RadioPlayer';
import StudentChat from '../../components/student/sChat';

export default function Home() {

  return (
    <>
      <Header />
      <SideBar />
      <main id="main" className="main">
        <section className="row">
          <div className="col-md-6">
            <RadioPlayer />
          </div>
          <div className="col-md-6 text-end">
            <StudentChat />
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
}