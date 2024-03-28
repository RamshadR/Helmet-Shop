import React from 'react';
import './CSS/HelmetAwarenessPage.css';

const HelmetAwarenessPage = () => {
    return (
        <div className="helmet-awareness-container">
            <h1 className='heading'>Motorcycle Helmet Awareness</h1>
            <div className="awareness-content">
                <h2 >Advantages of Wearing a Helmet:</h2>
                <ul>
                    <li>Protection in case of accidents</li>
                    <li>Reduction of head injuries</li>
                    <li>Prevention of fatalities</li>
                    <li>Enhanced visibility on the road</li>
                    <li>Legal requirement in many areas</li>
                </ul>
                <h2>Disadvantages of Not Wearing a Helmet:</h2>
                <ul>
                    <li>Increased risk of head injuries</li>
                    <li>Potential for severe brain damage</li>
                    <li>Higher likelihood of fatalities</li>
                    <li>Exposure to weather elements</li>
                    <li>Legal consequences in some regions</li>
                </ul>
                <h2>Uses of Motorcycle Helmets:</h2>
                <p>Motorcycle helmets are primarily used to provide protection to the rider's head in case of accidents or collisions. They also serve to enhance the rider's visibility on the road and protect against weather conditions.</p>
                <h2>Helmet Awareness Campaign:</h2>
                <p>Our helmet awareness campaign aims to educate riders about the importance of wearing helmets while riding motorcycles. Through various initiatives, we promote helmet use as a crucial safety measure to prevent severe injuries and save lives.</p>
                <p>Join us in spreading awareness and advocating for safer riding practices!</p>
            </div>
        </div>
    );
}

export default HelmetAwarenessPage;
