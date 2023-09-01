import Header from "../../components/student/layouts/Header";
import SideBar from "../../components/student/layouts/SideBar";
import Footer from "../../components/student/layouts/Footer";

export default function AllRecordings() {
    return (
        <>
            <Header />
            <SideBar />
            <main id="main" className="main">
                {/* breadcrumb/////////////// */}
                <div className="pagetitle">
                    <h1>All Recordings</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active">Recordings</li>
                        </ol>
                    </nav>
                </div>
                {/* content ////////////////////////////// */}
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card crd_bg_lgt mb-3">
                                <div className="card-body">
                                    <div className="pt-4 pb-2">
                                        <h5 className="card-title text-start pb-0 fs-4">
                                            All Recordings
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
                    </div>
                </section>
            </main>
            {/* <Footer /> */}
        </>
    )
}
