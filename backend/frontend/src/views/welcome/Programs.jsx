import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Header from "../../components/welcome/layouts/Header";
import Footer from "../../components/welcome/layouts/Footer";

import "./home_programs.css";
import albmArtImg from "./albumart.jpg";
const Programs = () => {
  const [program, setProgram] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);

  const playAudio = (audioSrc) => {
    setCurrentAudio(audioSrc)
  }
  useEffect(() => {
    async function fetchPrograms() {
      const programs_data = await axios.get('/api/programs');
      setProgram(programs_data.data);
    }
    fetchPrograms();
  }, []);

  return (
    <>
      <Header />
      <section className="blank_bg">
        <div className="container_blank mt-5">
          <div className="container">
            <div>
              {currentAudio &&
                <div className="playback_song-container">
                  <div className="playback_song">
                    <img src={albmArtImg} className="albmart_lg mt-5 mb-2" alt={program.session_name} />
                    <br />
                    <audio controls src={currentAudio} />
                  </div>
                </div>
              }
            </div>
            {/* {currentAudio && <audio controls>
            <source src={currentAudio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>} */}

            <div className="scrollable-list">
              <ol class="list-group-flush mt-2">
                {
                  program && program.map((program) => (
                    <div>
                      <li key={program.id} class="list-group-item d-flex justify-content-between align-items-start">
                        <img src={albmArtImg} class="albmart" alt={program.session_name} />
                        <div class="ms-2 me-auto p-1">
                          <div class="fw-bold white">{program.session_name}</div>
                          {program.program_description}
                        </div>
                        <span class="">
                          <button className="btn btn-lg single_play_btn" onClick={() => playAudio('/recordings/' + program.recording_file)}><i class="bi bi-play-fill"></i> Play</button>
                        </span>
                      </li>
                      <hr />
                    </div>
                  ))
                }
              </ol>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Programs;
