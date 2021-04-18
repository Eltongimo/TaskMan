import React from 'react'
import './Footer.css'

function Footer(params) {
    return(
        <footer >
                <div className='container-footer'>
                    <div className='footer-box'>
                        <ul>
                            <li>Contacts</li>
                        </ul>
                    </div>

                    <div className='footer-box'>
                        <ul>
                            <li>Address</li>
                        </ul>
                    </div>

                    <div className='footer-box'>
                        <ul> 
                            <li>
                                Newsletter
                            </li>
                        </ul>
                    </div>

                    <div className='footer-box'>
                        <ul>
                            Support
                        </ul>
                    </div>

                </div>
        </footer>
    )
}
export default Footer
   