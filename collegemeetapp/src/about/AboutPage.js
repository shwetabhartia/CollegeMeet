import React from 'react';
import { Panel } from 'react-bootstrap';
import './AboutPage.css';

const title = (
    <h3>About Collegemeet</h3>
)

const AboutPage = () => (
    <div id="about">
        <Panel header={title}>
            Collegemeet is a social network and dating platform.
        </Panel>
    </div>
)

export default AboutPage;