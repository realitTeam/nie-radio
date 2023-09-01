
import ReactPlayer from 'react-player';

import Header from "../../components/student/layouts/Header";
import SideBar from "../../components/student/layouts/SideBar";
import Footer from "../../components/student/layouts/Footer";

import './App.css';
import './Home.css'
import RadioPlayer from '../../components/radio/RadioPlayer';
import ChatForm from '../../components/student/ChatForm';
import ChatHistory from '../../components/student/ChatHistory';

export default function Home() {

  return (
    <>
      <Header />
      <SideBar />
      <main id="main" className="main">
        <section>
        <RadioPlayer />
        </section>
        <section>
          <div className="row mt-4">
            <ChatForm />
            <ChatHistory />
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
}