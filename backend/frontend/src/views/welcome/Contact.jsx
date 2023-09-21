import React,{useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Header from "../../components/welcome/layouts/Header";
import Footer from "../../components/welcome/layouts/Footer";
import "./Welcome.css";
import "./Contact.css";
import ContactDetails from "../../components/welcome/ContactDetails";
import InquireForm from "../../components/welcome/InquireForm";
import heroImg from "./nie1.jpg";


const Contact = () => {
    const [location, setLocation] = useState({
        name: "Sample Location",
        latitude: 6.854260, // Replace with your latitude
        longitude: 79.914482, // Replace with your longitude
    });
    return (
        <>
            <Header />
            <section className="top_section">
                <div className="contact_hero">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="sub_top-hero-content mt-5">
                                    <h1 className="txt1">Education is not learning facts,</h1>
                                    <h1 className="txt2"> But the training of minds to think.</h1>
                                    <span className="txt3">Albert Einstein</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="hero-image mt-2">
                                    {/* Replace 'image-url.jpg' with the actual path to your image */}
                                    <img src={heroImg} alt="Hero" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="bg_white">
                <div className="container-fluid">
                    <div className="location_map">
                        <MapContainer
                            center={[location.latitude, location.longitude]}
                            zoom={13}
                            style={{ height: "400px" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[location.latitude, location.longitude]}>
                                <Popup>{location.name}</Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            </section> */}
            <section className="bg_white pt-4 pb-5">
                <InquireForm />
            </section>
            <section className="bg_purple_light pt-4">
                <ContactDetails />
            </section>
            <Footer />
        </>
    );
};

export default Contact;
