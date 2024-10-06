import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './ModifyServices.css'

function ModifyServices() {
    const [services, setServices] = useState([]);
    const [serviceTypeCounts, setServiceTypeCounts] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3000')
        .then(result => {
            const formattedData = result.data.map(service => ({
                ...service,
                ServiceType: capitalizeEachWord(service.ServiceType) // Capitalize each word in service type
            }));
            setServices(formattedData);
            const count = {};
            formattedData.forEach(service => {
                count[service.ServiceType] = (count[service.ServiceType] || []);
                count[service.ServiceType].push(service);
            });
            setServiceTypeCounts(count);
        })
        .catch(err => console.log(err));
    }, []);

    const capitalizeEachWord = (str) => {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const renderServiceTypes = () => {
        return Object.entries(serviceTypeCounts).map(([type, services]) => (
            <div key={type}>
                <h2 className="text-warning">{type}</h2>
                <table className='table'>
                    <thead><br/>
                        <tr>
                            <th>Service ID</th>
                            <th>Service Name</th>
                            <th>Description</th>
                            <th>Basic Price</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service._id}>
                                <td>{service.ServiceID}</td>
                                <td>{service.ServiceName}</td>
                                <td>{service.Description}</td>
                                <td>{service.Price}</td>
                                <td><img src={service.Image} className="img-fluid"/></td>
                            </tr>
                        ))}
                    </tbody><br/>
                </table>
            </div>
        ));
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>

                <Link to="/" className='text-info'>Home</Link> <br/> <br/>

                <button className='btn btn-secondary'>Service Types: {Object.keys(serviceTypeCounts).length}</button><br/><br/>

                {renderServiceTypes()}

            </div>
        </div>
    )
}

export default ModifyServices;