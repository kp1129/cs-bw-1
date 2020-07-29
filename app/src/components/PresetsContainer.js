import React from 'react';

const PresetsContainer = ({setSpeed}) => {
    const handleSelect = (e) => {
        let speed = parseInt(e.target.value);
        console.log(speed)
        setSpeed(speed);
    }
    return (
        <div className="presets-container">
            <h3>Presets</h3>
            <br/>
            <p>preset 1</p>
            <p>preset 2</p>
            <p>preset 3</p>

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