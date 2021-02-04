import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Footer = () => {

    return (
        <Row className="site-footer justify-content-around" style={{ color : 'white'}}>
            <Col lg={1} med={1} sm={1} className='align-self-center 100vh'>
                <div className='align-items-center'>
                    <a href='https://github.com/suppa-nintendo/team_rocket_project' target='_blank' style={{textDecoration : 'none', color : 'white'}}><i className="nes-icon github is-large"></i></a>
                    <br/>
                    <a href='https://github.com/suppa-nintendo/team_rocket_project' target='_blank' style={{textDecoration : 'none', color : 'white'}}>View Project</a>
                </div>
            </Col>
            <Col lg={2} med={2} sm={2}>
                <div className='nes-container with-title is-centered'>
                    <p className='title nes-container is-rounded' style={{color: 'black'}}>"Jessie"</p>
                    <Row className='align-items-center'>
                        <Col>
                            <img className='profile-pic' src='/Jessie-whiteBG.png' alt='Jessie profile' height='75vh' style={{borderRadius : '50%'}}/>
                        </Col>
                        <Col>
                            <p>Tiff</p>
                            <a href='https://www.linkedin.com/in/tiffanyrkennedy' target='_blank' ><i class="nes-icon linkedin"></i></a>
                            {' '}
                            <a href='https://github.com/teerkay' target='_blank' ><i class="nes-icon github"></i></a>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col lg={2} med={2} sm={2}>
                <div className='nes-container with-title is-centered'>
                    <p className='title nes-container is-rounded' style={{color: 'black'}}>"James"</p>
                    <Row className='align-items-center'>
                        <Col>
                            <img className='profile-pic' src='/James-whiteBG.png' alt='James profile' height='75vh' style={{borderRadius : '50%'}}/>
                        </Col>
                        <Col>
                            <p>Kyle</p>
                            <a href='https://www.linkedin.com/in/kylhowl/' target='_blank' ><i class="nes-icon linkedin"></i></a>
                            {' '}
                            <a href='https://github.com/kylhowl' target='_blank' ><i class="nes-icon github"></i></a>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col lg={2} med={2} sm={2}>
                <div className='nes-container with-title is-centered'>
                    <p className='title nes-container is-rounded' style={{color: 'black'}}>"Meowth"</p>
                    <Row className='align-items-center'>
                        <Col>
                            <img className='profile-pic' src='/Meowth-whiteBG.png' alt='Meowth profile' height='75vh' style={{borderRadius : '50%'}}/>
                        </Col>
                        <Col>
                            <p>Josh</p>
                            <a href='https://www.linkedin.com/in/josh-suppa/' target='_blank' ><i class="nes-icon linkedin"></i></a>
                            {' '}
                            <a href='https://github.com/suppa-nintendo/' target='_blank' ><i class="nes-icon github"></i></a>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default Footer;