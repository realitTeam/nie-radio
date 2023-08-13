import { useState, useEffect } from 'react';

import { Howl } from 'howler';
import { Listen } from '../../actions/listen/Listen';

import Header from "../../components/admin/layouts/Header";
import SideBar from "../../components/admin/layouts/SideBar";
import Footer from "../../components/admin/layouts/Footer";

import './App.css';
import './home.css';
import RadioPlayer from '../../components/radio/RadioPlayer';

export default function Home() {
  const [audioSrc, setAudioSrc] = useState(null);

  useEffect(() => {
    const fetchLiveAudio = async () => {
      const response = await Listen();
      setAudioSrc(response.audioUrl);
    };
    fetchLiveAudio();
  }, []);

  const audio = new Howl({
    src: [audioSrc],
    html5: true,
    format: ['mp3']
  });

  const [audioState, setAudioState] = useState({
    audio,
    isPlaying: false,
    volume: 1
  });

  const handlePlay = () => {
    audioState.audio.play();
    setAudioState({ ...audioState, isPlaying: true });
  };

  const handlePause = () => {
    audioState.audio.pause();
    setAudioState({ ...audioState, isPlaying: false });
  };

  const handleStop = () => {
    audioState.audio.stop();
    setAudioState({ ...audioState, isPlaying: false });
  };

  const handleVolume = (event) => {
    const volume = parseFloat(event.target.value);
    audioState.audio.volume(volume);
    setAudioState({ ...audioState, volume });
  };


  return (
    <>
      <Header />
      <SideBar />
      <main id="main" className="main">
        {/* 1st section */}
        <RadioPlayer />

        <section className="section">
          <div className="row">
            {/* left */}
            <div className="col-8">
              <div className="card">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-start pb-0 fs-4">
                      Recent Sessions
                    </h5>
                  </div>

                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Class</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Grade 6</td>
                        <td>Science</td>
                        <td>2016-05-25</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Grade 6</td>
                        <td>Maths</td>
                        <td>2016-05-25</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* right */}
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Live Participants</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><i className="bi bi-person-circle"></i> Kamal Perera</li>
                    <li className="list-group-item"><i className="bi bi-person-circle"></i> Nimal Perera</li>
                    <li className="list-group-item"><i className="bi bi-person-circle"></i> Pamal Perera</li>
                    <li className="list-group-item"><i className="bi bi-person-circle"></i> Amal Perera</li>
                    <li className="list-group-item"><i className="bi bi-person-circle"></i> Sumal Perera</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
}
