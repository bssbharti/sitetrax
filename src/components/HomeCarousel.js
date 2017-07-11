import React from 'react';
import Carousel from 'react-slick';

class HomeCarousel extends React.Component {

  render() {

    const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      fade: true
    };

    return (
      <Carousel {...settings} className="carousel">
        <div className="item">
          <img src="../assets/stich.png" height="100"/>
          <h2>Stich</h2>
          <p>Real-time data analytics.<br/>
              Any data.<br/>
              Any way.<br/>
              Any where.<br/>
              www.sitetrax.io</p>
        </div>
        <div className="item">
          <img src="../assets/analyze.png" height="100"/>
          <h2>Analyze</h2>
          <p>Real-time data analytics.<br/>
            Any data.<br/>
            Any way.<br/>
            Any where.<br/>
            www.sitetrax.io</p>
        </div>
        <div className="item">
          <img src="../assets/automate.png" height="100"/>
          <h2>Automate</h2>
          <p>Real-time data analytics.<br/>
            Any data.<br/>
            Any way.<br/>
            Any where.<br/>
            www.sitetrax.io</p>
        </div>
      </Carousel>
    );
  }
}

export default HomeCarousel;
