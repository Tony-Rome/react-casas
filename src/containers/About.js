import React, { useState, useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import House from '../assets/images/logo.png';

const About = ()  => {

    const [topSeller, setTopSeller] = useState([]);
    const [realtors, setRealtors] = useState([]);

    useEffect(() => {
        axios.defaults.headers = {
            "Content-Type":"application/json"
        };

        const getTopSeller = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/realtors/topseller');
                setTopSeller(res.data);
            }catch(err){

            }
        };

        getTopSeller();

    }, []);

    useEffect(() => {
        axios.defaults.headers = {
            "Content-Type":"application/json"
        };

        const getRealtors = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/realtors/');
                setRealtors(res.data);
            }catch(err){

            }
        };

        getRealtors();

    },[]);

    const getAllRealtors = () => {
        let allRealtors = [];
        let result = [];

        realtors.map(realtor => {
            return allRealtors.push(
                <Fragment key={realtor.id}>
                <div className='about__display'>
                <img className='about__display__image' sc={realtor.photo} alt='' />
                </div>
                <h3 className='about__realtor'>{realtor.name}</h3>
                <p className='about__contact'>{realtor.phone}</p>
                <p className='about__contact'>{realtor.email}</p>
                <p className='about__about'>{realtor.description}</p>
                </Fragment>
            );
        });

        for (let i = 0; i < realtors.length; i += 3 ){
            result.push(
                <div key={i} className='row'>
                    <div className='col-1-of-3'>
                        {allRealtors}
                    </div>
                    <div className='col-1-of-3'>
                        {allRealtors[i+1] ? allRealtors[i+1] : null}
                    </div>
                    <div className='col-1-of-3'>
                        {allRealtors[i+2] ? allRealtors[i+2] : null}
                    </div>
                </div>
            );
        }

        return result;
    };

    const getTopSeller = () => {
        let result = [];

        topSeller.map(seller => {
            return result.push(
                <Fragment key={seller.id}>
                <div className='about__display'>
                <img className='about__display__image' sc={seller.photo} alt='' />
                </div>
                <h3 className='about__topseller'>Top Seller:</h3>
                <p className='about__realtor'>{seller.name}</p>
                <p className='about__contact'>{seller.phone}</p>
                <p className='about__contact'>{seller.email}</p>
                <p className='about__about'>{seller.description}</p>
                </Fragment>
            );
        });

        return result;
    };

    return(
        <main className='about'>
            <Helmet>
                <title>Realest Estate - About</title>
                <meta
                    name='description'
                    content='About us'
                 />
            </Helmet>
            <header className='about__header'>
                <h1 className='about__heading'>About realst estate</h1>
            </header>
            <section className='about__info'>
                <div className='row'>
                    <div className='col-3-of-4'>
                        <h2 className='about__subheading'>We find the prefect home 4 u</h2>
                        <p className='about__paragraph'>
                        asdasdas
                        </p>
                        <div className='about__display'>
                            <img className='about__display__image' src={House} alt='' />
                        </div>
                        <p className='about__paragraph'>
                        asasdasd
                        </p>
                    </div>
                    <div className='col-1-of-4'>
                        {getTopSeller()}
                    </div>
                </div>
            </section>
            <section className='about__team'>
                <div className='row'>
                    <h2 className='about__subheading'>Meet out awesom team</h2>
                </div>
                    {getAllRealtors()}
            </section>
        </main>
    );
};

export default About;