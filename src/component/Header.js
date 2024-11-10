import React from 'react'
import Logoutbtn from './Logoutbtn'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import Container from './Container'
import { useNavigate } from 'react-router-dom'
const Header = () => {
    const authstatus = useSelector((state) => state.auth.status)  //access the state of status from store
    const navigate = useNavigate();

    // for optimaization
    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authstatus
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authstatus
        },
        {
            name:'allpost',
            slug:'/all-post',
            active:!authstatus,
        }


    ]
    return (
        // <nav class="navbar navbar-expand-lg bg-body-tertiary">
        //     <div class="container-fluid">
        //         <Link class="navbar-brand" to="/">Myblog</Link>
        //         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //             <span class="navbar-toggler-icon"></span>
        //         </button>
        //         <div class="collapse navbar-collapse" id="navbarSupportedContent">
        //             <ul class="navbar-nav me-auto mb-2 mb-lg-0">  
        //                 {navItems.map((item)=>item.active?(
        //                     <li key={item.name}>
        //                         <button className='btn btn-primary btn-sm'onClick={()=>navigate(item.slug)}>{item.name}</button>
        //                     </li>
        //                 ):null)}          
        //             </ul>
        //             {authstatus &&(<li key='logout'><Logoutbtn/></li>)}
        //         </div>
        //     </div>
        // </nav>
        <header>
            <Container>
                <nav className='d-flex navbar navbar-expand-lg bg-body-tertiary'>
                    <div>
                        <Link to='/'>
                            <Logo width='70px' />
                        </Link>
                    </div>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        {navItems.map((item) => item.active ? (
                            <li className='mx-4' key={item.name}>
                                <button className='btn btn-primary btn-sm' onClick={() => navigate(item.slug)}>{item.name}</button>
                            </li>
                        ) : null)}
                        {authstatus && (
                            <li key='logout'>
                                <Logoutbtn/>
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
