import React from 'react';

const PresetsContainer = ({setSpeed}) => {
    const handleSelect = (e) => {
        let speed = parseInt(e.target.value);
        console.log(speed)
        setSpeed(speed);
    }
   
    return (
        <div className="presets-container">
            <label htmlFor='speed-selection'>Select speed</label>
            <br/>
            <select onChange={(e) => handleSelect(e)} id='speed-selection'>
                <option selected value='1000'>slow</option>
                <option value='500'>average</option>
                <option value='100'>fast</option>
            </select>
        </div>
    )
}

export default PresetsContainer;