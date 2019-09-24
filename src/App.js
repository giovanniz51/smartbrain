import React from 'react';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

import tachyons from "tachyons";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';



import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.key = `53357022a8df4201ab133e74f98ad864`;
    this.state = {
      input: "",
      box: {},
      route: "signin",
      isSignedIn: false
    }
  }
  
  calculateFaceLocation = (data) => {
    if(data.outputs[0].data.regions){
      const face = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.querySelector("#inputImg");
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height)
      };
    }else {
      return null;
    }
  }
  
  displayFaceBox = (box) => {
    this.setState({box});
  } 
  
  handleChange = (e) => {
    this.setState({input: e.target.value});
  }
  
  handeSubmit = async () => {
    const app = new Clarifai.App({
     apiKey: this.key
    });
    
    try {
      const response = await app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input);
      const box = this.calculateFaceLocation(response)  
      this.displayFaceBox(box);
    } catch (e) {
      console.log(e);  
    }
    
  }
  
  handleRouteChange = (route) => {
    if(route == "signout"){
      this.setState({isSignedIn: false})   
    }else if(route == "home"){
      this.setState({isSignedIn: true})
    }
    
    this.setState({route: route})
    
  }
  
  render() {
      const options = {
                   particles: {
                     number: {
                       value: 60,
                       density: {
                         enable:true,
                         value_area: 900
                       }
                     }
                   }
    }
    
      return (
      <div className="App">
        <Particles params={options} className="particles"/>
        <Navigation onRouteChange={this.handleRouteChange} isSignedIn={this.state.isSignedIn}/>
        { this.state.route == "home" 
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onSubmit={this.handeSubmit} onChange={this.handleChange} />
              <FaceRecognition box={this.state.box} img={this.state.input}/>
            </div>
          : (
            this.state.route == "signin" ?
            <SignIn onRouteChange={this.handleRouteChange}/>
            : <Register onRouteChange={this.handleRouteChange}/>
          )
        }
      </div>
    );
  }

}

export default App;
