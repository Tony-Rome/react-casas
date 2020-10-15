import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

const Contact = ({ setAlert })  => {
    
    useEffect(() => {

        window.scrollTo(0,0);

    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const { name, email, subject, message } = formData;
    const [loading, setLoading] = useState(false);

    const onChange = e => setFormData({ ...formData, [e.target.name] : e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        axios.defaults.headers = {
            "Content-Type" : "application/json"
        };

        setLoading(true);
        axios.post('http://localhost:8000/api/contacts', { name, email, subject, message })
            .then(res => {
                setAlert('Message sent', 'succes');
                setLoading(false);
                window.scrollTo(0,0);
            })
            .catch(err => {
                setAlert('Error to send', 'error');
                setLoading(false);
                window.scrollTo(0,0);
            })
    };

    return (
        <div className='contact'>
            <Helmet>
            <title>Realest Estate - Contact</title>
            <meta
                name='contact'
                content='Contact us'
            />
            </Helmet>
            <form className='contact__form' onSubmite={e => onSubmit(e)}>
                <label className='contact__form__label' htmlFor='name'>Name</label>
                <input className='contact__form__input' name='name' type='text' placeholder='full name' onChange={e => onChange(e)} value={name} required /> 

                <label className='contact__form__label' htmlFor='email'>Email</label>
                <input className='contact__form__input' name='email' type='email' placeholder='email' onChange={e => onChange(e)} value={email} required /> 

                <label className='contact__form__label' htmlFor='subject'>subject</label>
                <input className='contact__form__input' name='subject' type='text' placeholder='Buying home' onChange={e => onChange(e)} value={subject} required /> 

                <label className='contact__form__label' htmlFor='message'>message</label>
                <textarea className='contact__form__textarea' name='message' cols='30' rows='10' placeholder='message' onChange={e => onChange(e)} value={subject} required />
                {
                    loading ? 
                        <div className='contact__form__loader'>
                            <Loader type="Oval" color="#424242" height={50} width={50} />
                        </div> :
                        <button className='contact__form__button' htmltype='submite'>Save</button>
                }
            </form>
        </div>
    );

};

Contact.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert})(Contact);