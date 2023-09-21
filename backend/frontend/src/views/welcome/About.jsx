import React, { useState } from "react";

import Header from "../../components/welcome/layouts/Header";
import Footer from "../../components/welcome/layouts/Footer";

import "./Welcome.css";
import ContactDetails from "../../components/welcome/ContactDetails";
import ImageCarousel from "../../components/welcome/ImgCarousal"

import heroImg from "./nie2.jpg";
import i1 from "./i1.jpg";
import i2 from "./i2.jpg";
import i3 from "./i3.jpg";
import i4 from "./i4.jpg";
import i5 from "./i5.jpg";

const About = () => {
    // const images_carousal_1 = [i1, i2,i3,i4,i5];

    return (
        <>
            <Header />
            <section className="top_section">
                <div className="contact_hero">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="sub_top-hero-content mt-5">
                                    <h1 className="txt1">A Self-Contained Green Complex in Which,</h1>
                                    <h1 className="txt2"> a Nation's Path of Knowledge is Mapped.</h1>
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
            <section className="bg_purple_light pt-4 pb-3">
                <div className="container">
                    <div className="section_title_dark mb-4">
                        <p>ESTABLISHMENT OF NIE</p>
                    </div>
                    <div className="section_body_dark align-items-justify">
                        <p><b>Sri Lanka National Institute of Education (NIE)</b> is the apex body that is instrumental in propagating the seed of learning in the country. The Institute is delegated with the critical task of developing the curricula for the national general education which includes primary, secondary and post-secondary. The Institute is also mandated to provide quality teacher education and professional development of personnel engaged in the educational sector. Through scientific study, NIE facilitates informed decision-making and policy changes that bring reform to national education, yielding results in a transformed generation. The Institute is committed to creating a future workforce that is multi-faceted in skills, integrated with modern technology, collaborative, and espousing values and ethics of good citizenship. In keeping with the requirements of the 21st century and global trends, the national curriculum for general education is based on being student-centric and learning-centric.</p>
                        <p>Through its entire institutional capacity-building activity, <b>NIE</b> sows the seed of knowledge and nurtures in its growth into a tree of knowledge.</p>
                        <p>Established in 1986 in pursuance of the Act of Parliament No. 28 of 1985, the National Institute of Education <b>(NIE)</b> is entrusted with the responsibility of advising the Minister of Education on planning, programming and other activities relating to the development of general education in Sri Lanka. Through the powers and responsibilities vested with the Institute by the aforesaid Act, the <b>NIE</b> has superseded and expanded the activities undertaken by the Curriculum Development Centre established in 1961. At present <b>NIE</b> functions as the professional and academic arm of the MOE. Thus, the <b>NIE</b> bears very significant responsibility for the development of the system of general education in the country and in this effort, it liaises with the MOE, the NEC and the DOE.</p>
                    </div>
                </div>
            </section>
            {/* <section className="bg_purple_dark pt-4 pb-3">
                <div className="container-fluid">
                    <div className="section_body_light">
                        <div className="img_carousal1">
                        <ImageCarousel images={images_carousal_1} />
                        </div>
                    </div>
                </div>
            </section> */}
            <section className="bg_purple_light pt-4 pb-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6">
                            <div className="section_title_dark mb-4">
                                <p>OUR VISION</p>
                            </div>
                            <div className="section_body_dark p-5 text-center">
                                <p>To be the centre of excellence in general education and to develop high- quality human capital that is ready (equipped) to face the challenges of the 21st century and beyond.</p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="section_title_dark mb-4">
                                <p>OUR MISSION</p>
                            </div>
                            <div className="section_body_dark p-5 text-center">
                                <p>Develop human capital and leaders in education through curriculum development, pedagogical intervention and assessment for an improved school system for the 21st century and the 4th industrial revolution.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg_purple_light pt-4 pb-3">
                <div className="container-fluid">
                    <div className="section_title_dark mb-4">
                        <p>CORPORATE OBJECTIVES</p>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="section_body_dark p-5 text-center">
                                <p>Values - values of NIE have been structured to bring out the best and achieve the best for the country's education system. The values of NIE stem from Nation-building and National Development, an Innovative approach, and being Entrepreneurial.</p>
                                <p>The values that guide NIE pivot around the student; the future citizen of the country and the need to establish meaningful learning that empowers and enables them to face the challenges of tomorrow. The institute also upholds the value of diversity, and the richness it brings to any community in culture, heritage, language, abilities and talents of individuals and communities within the country and globally. Stemming from the core values the learning strategies, tools and techniques developed for the implementation of national curricula are formulated based on cognitive scientific findings and best practices from around the globe. Feedback, recommendations, insights, and findings from practitioners and academics of education are sought and welcomed to refine the current practices to better fit the evolving educational landscape of tomorrow.</p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="section_body_dark p-5 text-center align-items-center">
                                <p>The institute's structure has been reorganized to achieve the above objectives and ensure efficient functioning. Under the reorganization, four faculties have been established for the academic functions and two divisions for planning, research and administration functions. There is a secretariat and an advisory board to the director general under whom the examinations unit and internal audit unit directly function.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg_purple_light pt-4">
                <ContactDetails />
            </section>
            <Footer />
        </>
    );
};

export default About;
