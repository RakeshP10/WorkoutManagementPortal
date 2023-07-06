import React, { Fragment } from 'react'
import { Button, Card, CardImg, Container, Row } from 'react-bootstrap'
import{ CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

  function UserHome() {

    const styles={backgroundColor:"#F7A51D",color:"black",border:"none"}

    const navigate = useNavigate();

    const navigateToGetAllPlans = (level) => {
          console.log(level)
      navigate('/user/plans', {state: {level: level}, });
    }

  return (
    <Fragment>
    <div>
      {/* <!-- ======= Image Section ======= --> */}
  <section id="home" className="d-flex align-items-center">
    <Container>
      <h1>Welcome to Workout</h1>
      <h2>We are team of trainers to help you out with your workout</h2>
    </Container>
  </section>
  {/* <!-- Image Hero --> */}
      {/* <!-- ======= Plans ======= --> */}
    <section id="plans" className="plans">
      <Container>

        <Row>
          
          <div className="col-lg-12 d-flex align-items-stretch">
            <div className="icon-boxes d-flex flex-column justify-content-center">
              <div className="row">
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box mt-4 mt-xl-0">
                  <img src="../img/home-bg.png" className='image'></img>
                  <h3>Beginner</h3>
                  <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
                  <Button  style={styles} onClick={() => navigateToGetAllPlans("Beginner")}>
                   Explore Plans </Button>
                  </div>
                </div>
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box mt-4 mt-xl-0">
                  <img src="../img/home-bg.png" className='image'></img>
                  <h3>Intermediate</h3>
                  <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis facere</p>
                   <Button style={styles} onClick={() => navigateToGetAllPlans("Intermediete")}>
                    Explore Plans</Button>
                  </div>
                </div>
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box mt-4 mt-xl-0">
                    <img src="../img/home-bg.png" className='image'></img>
                    {/* <i className="bx bx-images"></i>/ */}
                    <h3>Advanced</h3>
                    <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis facere</p>
                     <Button style={styles} onClick={() => navigateToGetAllPlans("Advanced")}>
                    Explore Plans</Button>
                   
                  </div>
                </div>
              </div>
            </div>
           
           </div>
        </Row>
      </Container>
    </section>

    <div>
            <div className='row'>
              {/* <div className='col-2'></div> */}
              <div className='col-3 text_center'>
                <h2>Unlimited Training Plans & A Variety of Runs</h2>
                 <p>New runs, challenges & training plans every week. Choose from 15 minute to 45 minute runs including intervals, tempo and long runs.</p>
              </div>
              {/* <div className='col-2'></div>/ */}
              <div className='col-6 image-gall'>
                <img src="../img/HomePageImage2.png" className='image-gallery'></img>
              </div>
           </div>
            {/* <!-- End .content--> */}
          </div>
    <div>
       <Carousel>
      <Carousel.Item>
        <img
          className="d-block image_slider"
          src="https://tse1.mm.bing.net/th/id/OIP.cgraVm5el6jbbIDSmMvzeAHaEK?pid=ImgDet&rs=1"
          alt="Image 1"
        />
        <Carousel.Caption>
          <h3>Definition of a really good workout: when you hate doing it, but you love finishing it.</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block image_slider"
          src="https://tse3.mm.bing.net/th/id/OIP.Zc45a-uJUgLad5tgCj2P7AHaFG?pid=ImgDet&rs=1"
          alt="Image 2"
        />

        <Carousel.Caption>
          <h3>A good workout is when you make your dry fit shirt look like false advertising.</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block image_slider"
          src="https://tse2.mm.bing.net/th/id/OIP.EewpEFjqPMi13wPHeSJM6AHaEo?w=298&h=186&c=7&r=0&o=5&dpr=1.25&pid=1.7"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    
    <div className='gallery'>
     <h1 className='workout_title'> Workout Programs designed for you </h1>
     <h2 className='gallery-p'> Enter some quick details about yourself,and we’ll tailor programs for your level and<br></br> goals—including a schedule of workout videos to follow, nutrition plans, even rest days.</h2>
     <img src="../img/PlanGallery.jpeg" className='image-gallery'></img>
    </div>
   

    </div>
    </Fragment>
  )
  }

  export default UserHome;
