import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import './UpdateServices.css';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert

function UpdateServices() {
    const { id } = useParams();
    const [ServiceID, setServiceID] = useState('');
    const [ServiceType, setServiceType] = useState('');
    const [ServiceName, setServiceName] = useState('');
    const [Description, setDescription] = useState('');
    const [Price, setPrice] = useState('');
    const navigate = useNavigate();

    const currentDate = new Date();
    const DateCreated = currentDate.toLocaleString();

    useEffect(() => {
        axios.get('http://localhost:3000/getService/' + id)
            .then(result => {
                console.log(result)
                setServiceID(result.data.ServiceID)
                setServiceType(result.data.ServiceType)
                setServiceName(result.data.ServiceName)
                setDescription(result.data.Description)
                setPrice(result.data.Price)
            })
            .catch(err => console.log(err))
    }, [id])

    const handleServiceIDChange = (e) => {
        const value = e.target.value;
        // Allow alphanumeric characters and limit length to 4
        if (/^[a-zA-Z0-9]{0,4}$/.test(value)) {
            setServiceID(value);
        }
    }

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value) || value === '') {
            setPrice(value);
        }
    }

    const Update = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3000/UpdateService/" + id, { ServiceID, ServiceType, ServiceName, Description, Price, DateCreated })
            .then(result => {
                console.log(result)
                // Use SweetAlert for success message
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Service updated successfully!',
                });
                navigate('/');
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{opacity:'0.7'}}>
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/" className='text-info'>Home</Link> <br/> <br/>
                    <form onSubmit={Update}>
                        <h2>Update Service</h2>
                        <div className='mb-2'>
                            <label>Service Id</label>
                            <input type="text" placeholder='Enter Service id' className='form-control'
                            value={ServiceID} onChange={handleServiceIDChange}/>
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="choice1">Service Type</label>
                            <select id="choice1" value={ServiceType} onChange={(e) => setServiceType(e.target.value)} className='form-control'>
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
                            value={ServiceName} onChange={(e) => setServiceName(e.target.value)}/>
                        </div>
                        <div className='mb-2'>
                            <label>Description</label>
                            <textarea type="text" placeholder='Description' className='form-control' rows='2'
                            value={Description} onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                        <div className='mb-2'>
                            <label>Basic Price</label>
                            <input type="text" placeholder='Enter basic price' className='form-control'
                            value={Price} onChange={handlePriceChange}/>
                        </div> <br/>
                        <button className='btn btn-success'>Update</button>
                    </form>
            </div>
        </div>
    )
}

export default UpdateServices;
