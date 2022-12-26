import React from 'react';
import { Nav } from './Navigation.js';

export function About(props) {

    return (
        <div>
            <Nav currentUser={props.currentUser} />
            <div className="all-footer">
                <div className="container">
                    <div className="about">
                        <h2>About</h2>
                        <p> This website is designed as a photo gallery platform to showcase many wonderful pictures.
                            Having such a platform where users can share their photos/artwork to not only the people around
                            them, but
                            also people from across the internet can significantly improve the photography and digital art
                            culture. A key problem that this
                            website addresses is the obstacles between artists and potential viewers of their work. Through
                            the process of “following”, “liking”, and other interactions, the passion of the artists can be
                            ignited even more, and meanwhile fulfills the need for art “hunting”. The majority of existing
                            image-sharing websites only focus on presenting the pictures, but rarely give enough credits to
                            the creators of those works. As we want to resolve obstacles and bridge the gap between artists
                            and users, we hope to design and refine this website to bring more recognition to the authors of
                            their work.
                        </p>
                    </div>
                </div>
                <div className="container">
                    <div className="contact">
                        <h2>Contact</h2>
                        <address>
                            Contact us at: 
                            <br></br> 
                            <a href="mailto:lliao2@uw.edu">lliao2@uw.edu</a> / <a
                                href="tel:510-696-0790">(510) 696-0790</a>,
                            <br></br>
                            <a href="mailto:scottng@uw.edu"> scottng@uw.edu</a> / <a
                                href="tel:206-468-9944">(206) 468-9944</a>.
                            <br></br>
                            <a href="mailto:pejie36@uw.edu">peijie36@uw.edu</a> / <a
                                href="tel:206-XXX-XXXX">(206) XXX-XXXX</a>.
                        </address>
                        <p>&copy; 2022 Info Team.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}