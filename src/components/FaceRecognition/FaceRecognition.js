import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = props => (
    <div className="center ma">
        
            {props.img && props.box ?
                <div className="absolute mt2" style={{left: "40%"}}>
                    <img id="inputImg" alt="faceImg" width="300" height="auto" src={props.img} /> 
                    <div className="bounding-box" style={{top: props.box.topRow, right: props.box.rightCol, bottom: props.box.bottomRow, left: props.box.leftCol}}></div>
                
                </div>
            : 
                <p>no face</p>
            }
            
    </div>    
);

export default FaceRecognition;