import React from "react";
import "./ImageLinkForm.css";
const ImageLinkForm = props => {

    const handleChange = (e) => {
        props.onChange(e);
    }
    
    const handleClick = () => {
        props.onSubmit();
    }

    return (
        <div className="center">
            <p className="f3">
                {"This magic Brain will detect faces in your pics. Give it a try!"}
            </p>
            <div className="center form pa4 br3 shadow-5">
                <input onChange={handleChange} className="f4 pa2 w-70 center" type="text" name="imageUrl"/>
                <button onClick={handleClick} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
            </div>
        </div>
    );
    
}


export default ImageLinkForm;