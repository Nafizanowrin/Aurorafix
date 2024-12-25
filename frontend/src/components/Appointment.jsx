import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../store/Auth';
import './Appointment.css';
import Footer from "./Footer";
import Nav from "./Nav";

const Appointment = () => {
    const { user, isLoggedin } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: user?.email || '',
        phone: user?.phone || '',
        service: '',
        date: '',
        time: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLoggedin) {
            navigate('/login');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to book an appointment.');
            return;
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_URL}/api/appointment`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Appointment booked successfully!');
            setFormData({
                name: '',
                email: user?.email || '',
                phone: user?.phone || '',
                service: '',
                date: '',
                time: '',
            });
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('Failed to book the appointment. Please try again.');
        }
    };

    return (
        <>
            <Nav />
            <div className="appointment-section">
                <h3>Book Your Appointment</h3>
                <form onSubmit={handleSubmit} className="appointment-form">
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="form-input"
                            readOnly
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="form-input"
                            required
                        >
                            <option value="">Select a Service</option>
                            <option value="Deep Tissue">Deep Tissue - from $48.00</option>
                            <option value="Body Scrub">Body Scrub - from $18.00</option>
                            <option value="Foot Massage">Foot Massage - from $18.00</option>
                            <option value="Scalp Treatments">Scalp Treatments - from $15.00</option>
                            <option value="Fertility Massage">Fertility Massage - from $18.00</option>
                            <option value="Blemish Buster">Blemish Buster - from $40.00</option>
                            <option value="Oxygen Facial">Oxygen Facial - from $32.00</option>
                            <option value="Lash Lift">Lash Lift - from $25.00</option>
                            <option value="Hair Cut">Hair Cut - from $25.00</option>
                            <option value="Hair Color">Hair Color - from $50.00</option>
                            <option value="Manicure">Manicure - from $20.00</option>
                            <option value="Pedicure">Pedicure - from $25.00</option>
                            <option value="Facial">Facial - from $40.00</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <button type="submit" className="appointment-btn">
                        Book Appointment
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Appointment;
