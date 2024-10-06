import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './ServiceHomeScreen.css'
import logo from '../images/logo.png'

export default function ServiceHomeScreen() {
    const [showModal, setShowModal] = useState([]); // State for controlling individual modals
    const [services, setServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [serviceTypes, setServiceTypes] = useState([]);

    useEffect(() => {
        // Fetch data from the database when the component mounts
        fetch('http://localhost:3000/')
            .then(response => response.json())
            .then(data => {
                const types = [...new Set(data.map(service => service.ServiceType))];
                setServiceTypes(types);
                // Group services by service type
                const groupedServices = {};
                types.forEach(type => {
                    groupedServices[type] = data.filter(service => service.ServiceType === type);
                });
                setServices(groupedServices);
                // Initialize showModal array with false values for each service type
                const initialShowModal = {};
                types.forEach(type => {
                    initialShowModal[type] = Array(groupedServices[type].length).fill(false);
                });
                setShowModal(initialShowModal);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleClose = (type, index) => {
        const updatedShowModal = {...showModal};
        updatedShowModal[type][index] = false; // Set the corresponding modal state to false
        setShowModal(updatedShowModal);
    };

    const handleShow = (type, index) => {
        const updatedShowModal = {...showModal};
        updatedShowModal[type][index] = true; // Set the corresponding modal state to true
        setShowModal(updatedShowModal);
    };

    const handleSearch = () => {
        // Filter services based on search criteria
        const filteredServices = {};
        Object.keys(services).forEach(type => {
            filteredServices[type] = services[type].filter(service => {
                return (
                    service.ServiceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    service.ServiceName.toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
        });
        setServices(filteredServices);
    };

    return (
        <div className="navcontainer">
            <nav>
                <div className="logocontainer">
                    <img src={logo} alt="logo" style={{ width: '80px', height: 'auto', marginRight: '60px', marginLeft: '30px'}}/>
                </div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/ServiceHomeScreen">Services</Link>
                    </li>
                    <li>
                        <Link to="/courses">Courses</Link>
                    </li>
                    <li>
                        <Link to="/giftvouchers">Gift Vouchers</Link>
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    <li>
                        <Link to="/create">Login</Link>
                    </li>
                    <li>
                        <Link to="/">Admin Page</Link>
                    </li>
                </ul>
            </nav>
            <div>
                <div className="row" style={{opacity: 0.9}}>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search by type or name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="form-control mb-3"
                        />
                        <button onClick={handleSearch} className="btn btn-light">Search</button>
                    </div>

                    {serviceTypes.map((type, typeIndex) => (
                        <div key={typeIndex}>
                            <br/>
                            <h2>{type}</h2>
                            <div className="row">
                                {services[type].map((service, serviceIndex) => (
                                    <div className="col-md-4 p-3" key={serviceIndex}>
                                        <div style={{ margin: '70px'}} className='service-box shadow-lg p-3 mb-5 bg-white rounded'>
                                            <div onClick={() => handleShow(type, serviceIndex)}>
                                                <h1>{service.ServiceName}</h1>
                                                <img src={service.Image} className="img-fluid" alt="Service" />
                                            </div>
                                            <div className="flex-container">
                                                <div className="m-1 w-100">
                                                    <h1 className='mt-1'>Price : {service.Price} Rs /=</h1>
                                                </div>
                                            </div>
                                            <Modal show={showModal[type] && showModal[type][serviceIndex]} onHide={() => handleClose(type, serviceIndex)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>{service.ServiceName}</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <img src={service.Image} className="img-fluid" alt="Service" style={{ height: '400px', width: '300px' }} />
                                                    <p>{service.Description}</p>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <button className="btn btn-danger" onClick={() => handleClose(type, serviceIndex)}>Close</button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
