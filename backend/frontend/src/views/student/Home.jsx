
import ReactPlayer from 'react-player';

// import { Listen } from '../../actions/listen/Listen';
import Header from "../../components/student/layouts/Header";
import SideBar from "../../components/student/layouts/SideBar";
import Footer from "../../components/student/layouts/Footer";

import './App.css';
import './Home.css'
import RadioPlayer from '../../components/radio/RadioPlayer';

export default function Home() {

  return (
    <>
      <Header />
      <SideBar />
      <main id="main" className="main">
      <RadioPlayer />
      </main>
      {/* <Footer /> */}
    </>
  );
}