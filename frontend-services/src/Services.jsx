import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Services.css';
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2'; // Import SweetAlert

function Services() {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [serviceTypeCounts, setServiceTypeCounts] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3000')
        .then(result => {
            const formattedData = result.data.map(service => ({
                ...service,
                ServiceType: capitalizeEachWord(service.ServiceType), // Capitalize each word in service type
                DateCreated: new Date(service.DateCreated) // Add createdAt property as Date object
            }));
            setServices(formattedData);
            const count = {};
            formattedData.forEach(service => {
                count[service.ServiceType] = (count[service.ServiceType] || 0) + 1;
            });
            setServiceTypeCounts(count);
        })
        .catch(err => console.log(err));
    }, []);

    const capitalizeEachWord = (str) => {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const handleDelete = (id) => {
        // Show confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with deletion
                axios.delete(`http://localhost:3000/deleteUser/${id}`)
                    .then(res => {
                        console.log(res);
                        // Show success message
                        Swal.fire(
                            'Deleted!',
                            'Service has been deleted.',
                            'success'
                        );
                        // Reload page or update state as needed
                        window.location.reload();
                    })
                    .catch(err => console.log(err));
            }
        });
    };

    const generateReport = () => {
        const currentDate = new Date();
        const threshold = 10 * 60 * 60 * 1000; // 10 hours in milliseconds
        
        const newlyCreatedServices = services.filter(service => {
            const DateCreated = new Date(service.DateCreated);
            return (currentDate - DateCreated) < threshold;
        });
    
        const oldServices = services.filter(service => !newlyCreatedServices.includes(service));
        
        // Generate report content for the first page
        let reportContentPage1 = '=== Newly Created Services ===\n\n';
        newlyCreatedServices.forEach(service => {
            reportContentPage1 += `Service ID: ${service.ServiceID}\nService Type: ${service.ServiceType}\nService Name: ${service.ServiceName}\nPrice: ${service.Price}\nCreation Date: ${service.DateCreated}\n\n`;
        });
    
        // Generate report content for the second page
        let reportContentPage2 = '=== Old Services ===\n\n';
        oldServices.forEach(service => {
            reportContentPage2 += `Service ID: ${service.ServiceID}\nService Type: ${service.ServiceType}\nService Name: ${service.ServiceName}\nPrice: ${service.Price}\nCreation Date: ${service.DateCreated}\n\n`;
        });
    
        // Create a new jsPDF instance
        const pdf = new jsPDF('p', 'pt', 'a4');
    
        // Add content for the first page
        pdf.setTextColor(0,0,255);
        pdf.text(reportContentPage1, 20, 20);
    
        // Add a new page
        pdf.addPage();
        pdf.setTextColor(0,255,0);
    
        // Add content for the second page
        pdf.text(reportContentPage2, 20, 20);
    
        // Save the PDF
        pdf.save('services_report.pdf');
    };
    

    const countString = `Service Types: ${Object.keys(serviceTypeCounts).length}\nTotal Services: ${services.length}\n${Object.entries(serviceTypeCounts).map(([type, count]) => `${type}: ${count}`).join(" , ")}`;

    const filteredServices = services.filter(service =>
        service.ServiceType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>

            <div className="d-flex">
                <Link to="/createService" className="btn btn-success mr-2" style={{marginRight:'70%'}}>Add +</Link>
                <Link to="/modifyTableService" className="text-dark" style={{marginTop:'5px'}}>Modify Table</Link>
            </div> <br/>

                <Link to="/ServiceHomeScreen" className='btn btn-success'>Home Screen</Link> <br/> <br/>

                <input
                    type="text"
                    placeholder="Search by service type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control mb-3"
                />

                <button className='btn btn-secondary'> <pre>{countString}</pre> </button><br/><br/>

                <button className='btn btn-primary' onClick={generateReport}>Generate Report</button>

                <table className='table'>
                    <thead>
                        <tr>
                            <th>Service ID</th>
                            <th>Service Type</th>
                            <th>Service Name</th>
                            <th>Description</th>
                            <th>Basic Price</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredServices.map((service) => (
                            <tr key={service._id}>
                                <td>{service.ServiceID}</td>
                                <td>{service.ServiceType}</td>
                                <td>{service.ServiceName}</td>
                                <td>{service.Description}</td>
                                <td>{service.Price}</td>
                                <td><img src={service.Image} className="img-fluid"/></td>
                                <td>
                                    <Link to={`/updateService/${service._id}`} className='btn btn-success'>Update</Link> <br/> <br/>
                                    <button className='btn btn-danger' onClick={() => handleDelete(service._id)}>Delete</button> <br/> <br/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Services;