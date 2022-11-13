import React from 'react';
import { Carousel, Image, Container } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container className="text-center align-items-center">
    <h4>React-Bootstrap Carousel Component</h4>
    <Carousel>
      <Carousel.Item interval={1500}>
        <Image
          className="d-block w-100"
          src="/images/3.jpg"
          alt="Image One"
        />
        <Carousel.Caption>
          <h3>Label for first slide</h3>
          <p>Sample Text for Image One</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <Image
          className="d-block w-100"
          src="/images/4.jpg"
          alt="Image Two"
        />
        <Carousel.Caption>
          <h3>Label for second slide</h3>
          <p>Sample Text for Image Two</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </Container>
);

export default Landing;
