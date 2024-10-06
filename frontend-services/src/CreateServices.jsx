import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert
import './CreateServices.css';

function CreateServices() {
    const [ServiceID, setServiceID] = useState()
    const [ServiceType, setServiceType] = useState()
    const [ServiceName, setServiceName] = useState()
    const [Description, setDescription] = useState()
    const [Price, setPrice] = useState()
    const navigate = useNavigate()
    const [Image, setImage] = useState('')

    const currentDate = new Date();
    const DateCreated = currentDate.toLocaleString();

    const Submit = (e) => {
        e.preventDefault();

        if (!ServiceID || !ServiceType || !ServiceName || !Description || !Price || !Image) {
            // Use SweetAlert for error message
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'All the fields are required!',
            });
            return;
        }

        if (ServiceID.length !== 4) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Service ID must be 4 characters long!',
            });
            return;
        }

        if(isNaN(Number(Price)))
        {
            // Use SweetAlert for error message
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid data type. Please enter a number for price!',
            });
            return;
        }

        axios.post("http://localhost:3000/CreateService", {ServiceID, ServiceType, ServiceName, Description, Price, Image, DateCreated})
        .then(result => {
            console.log(result)
            // Use SweetAlert for success message
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Service added successfully!',
            });
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{opacity:'0.8'}}>
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/" className='text-info'>Home</Link> <br/> <br/>
                    <form onSubmit={Submit}>  
                        <h2>Add a new Service</h2>
                        <div className='mb-2'>
                            <label>Service Id</label>
                            <input type="text" placeholder='Enter Service id' className='form-control'
                            onChange={(e) => setServiceID(e.target.value)}/>
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="choice1">Service Type</label>
                            <select id="choice1" onChange={(e) => setServiceType(e.target.value)} className='form-control'>
                                <option value=''>Select a Service type</option>
                                <option value='Hair Cuts'>Hair Cuts</option>
                                <option value='Dressing'>Dressing</option>
                                <option value='Nail Care'>Nail Care</option>
                                <option value='Skin Care'>Skin Care</option>
                            </select>
                        </div>
                        <div className='mb-2'>
                            <label>Service Name</label>
                            <input type="text" placeholder='Enter Service name' className='form-control'
                            onChange={(e) => setServiceName(e.target.value)}/>
                        </div>
                        <div className='mb-2'>
                            <label>Description</label>
                            <textarea type="text" placeholder='Description' className='form-control' rows='2'
                            onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                        <div className='mb-2'>
                            <label>Basic Price</label>
                            <input type="text" placeholder='Enter basic price' className='form-control'
                            onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="choices">Image</label>
                            <select id="choices"onChange={(e) => setImage(e.target.value)} className='form-control'>
                                <option value=''>Select an Image</option>
                                <option value='./images/blunt.jpg'>Blunt Hair</option>
                                <option value='./images/bridal_hair.jpg'>Bridal Hair</option>
                                <option value='./images/bridal.jpeg'>Bridal Dressing</option>
                                <option value='./images/dressing.jpg'>Kandiyan Dressing</option>
                                <option value='./images/facilaB.jpg'>FacialB</option>
                                <option value='./images/Frenchmanicure.jpeg'>French ManiCure</option>
                                <option value='./images/gelmanicure.jpeg'>Gel ManiCure</option>
                                <option value='./images/HotOilManicure.jpg'>Hot Oil Manicure</option>
                                <option value='./images/HydratingFacial.jpg'>Hydrating Facial</option>
                                <option value='./images/IPLFacial.jpg'>IPL Facial</option>
                                <option value='./images/layered.jpg'>Layered Cut</option>
                                <option value='./images/makeup.jpg'>Makeup</option>
                                <option value='./images/nailCare.jpg'>NailCare</option>
                                <option value='./images/normal.jpeg'>Normal Dressing</option>
                                <option value='./images/modern_dressing.jpg'>Modern Wedding Dressing</option>
                                <option value='./images/services.jpg'>Services</option>
                                <option value='./images/wedge.jpg'>Wedge Hair Cut</option>
                            </select>
                        </div>
                        <br/>
                        <button className='btn btn-success'>Submit</button>
                    </form>
            </div>
        </div>
    )
}

export default CreateServices;
