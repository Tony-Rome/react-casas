import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { setAlert } from '../actions/alert';
import { signup } from '../actions/auth';
import PropTypes from 'prop-types';

const SignUp = ({ setAlert, signup, isAuthenticated})  => {

    const [formData, setFormData] = useState({
        name:'',
        email: '',
        password: '',
        password2: ''
    });
 
    const { name, email, password, password2 } = formData;
 
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
 
    const onSubmit = e => {
        e.preventDefault();
        console.log(e);
        console.log(e.preventDefault());
        
        if(password !== password2) setAlert('Password do not math', 'error');
        else
            signup({name, email, password, password2});
    };
 
    if (isAuthenticated) return <Redirect to='/' />
 
    return (
        <div className='auth'>
         <Helmet>
             <title>Ealest Estate - Sign up</title>
             <meta
                 name='description'
                 content='sign up page'
             />
         </Helmet>
         <h1 className='auth__title'>Sign up</h1>
         <p className='auth__lead'>Create ur account</p>
         <form className='auth__form' onSubmit={e => onSubmit(e)}>
             <div className='auth__form__group'>
                 <input className='auth__form__input' type='text' placeholder='name' name='name' value={name} onChange={e => onChange(e)} required />
             </div>
             <div className='auth__form__group'>
                 <input className='auth__form__input' type='email' placeholder='email' name='email' value={email} onChange={e => onChange(e)} required />
             </div>
             <div className='auth__form__group'>
                 <input className='auth__form__input' type='password' placeholder='password' name='password' value={password} onChange={e => onChange(e)} minLength='6' />
             </div>
             <div className='auth__form__group'>
                 <input className='auth__form__input' type='password' placeholder='repeat password' name='password2' value={password2} onChange={e => onChange(e)} minLength='6' />
             </div>
             <button className='auth__form__button'>Register</button>
         </form>
         <p className='auth__authtext'>
             Ya tienes una cuenta? <Link className='auth__authtext__link' to='/login'>Sign in</Link>
         </p>
        </div>
    );
};

SignUp.propTypes = {
    setAlert: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, signup })(SignUp);