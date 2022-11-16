import React from 'react';
import { Carousel, Container, Card } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container className="text-center align-items-center py-4">
    <h4 className="py-2 text-white font2">Words to Motivate and Start your Day with a Smile!</h4>
    <Carousel className="text-white">
      <Carousel.Item>
        <Card style={{ height: '18rem' }}>
          <Card.Img src="https://media.tenor.com/f6Z_JUiELaMAAAAC/winter-wonderland-snow.gif" />
          <Card.ImgOverlay>
            <h1 className="py-2"><strong>Over the Wintry by Natsume Soseki</strong></h1>
            <h1>Over the wintry</h1>
            <h1>Forest, winds howl in rage</h1>
            <h1>With no leaves to blow.</h1>
          </Card.ImgOverlay>
        </Card>
      </Carousel.Item>
      <Carousel.Item>
        <Card style={{ height: '18rem' }}>
          <Card.Img src="https://media.tenor.com/M4uxQgC_uOEAAAAd/flower-bloom.gif" />
          <Card.ImgOverlay>
            <h1 className="py-2"><strong>A Poppy Blooms by Katsushika Hokusai</strong></h1>
            <h1>I write, erase, rewrite</h1>
            <h1>Erase again, and then</h1>
            <h1>A poppy blooms.</h1>
          </Card.ImgOverlay>
        </Card>
      </Carousel.Item>
      <Carousel.Item>
        <Card style={{ height: '18rem' }}>
          <Card.Img src="https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/media/images/Oceanwaves.gif" alt="Card image" />
          <Card.ImgOverlay>
            <h1 className="py-2"><strong>Spring Ocean by Yosa Buson</strong></h1>
            <h1>Spring ocean</h1>
            <h1>Swaying gently</h1>
            <h1>All day long.</h1>
          </Card.ImgOverlay>
        </Card>
      </Carousel.Item>
    </Carousel>
  </Container>
);

export default Landing;
