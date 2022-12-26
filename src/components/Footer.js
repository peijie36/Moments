import React from "react";

export function Footer(props) {
    return (
        <>
            <div className="all-footer">
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
                                href="tel:206-XXX-XXXX">(206) 403-6282</a>.
                        </address>
                        <p>&copy; 2022 Info Team.</p>
                    </div>
                </div>
            </div>

        </>
    );
}