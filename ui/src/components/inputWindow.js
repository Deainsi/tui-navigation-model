import {useState} from "react";
import './inputWindow.css'

const InputWindow = ({formatValue = null, maxValueLen, Component}) => {
    const [value, setValue] = useState('');

    return (
        <div className='input-window'>
            <div className='value-field'>{formatValue? formatValue(value) : value}</div>
            <Component maxValueLen={maxValueLen} value={value} setValue={setValue}/>
        </div>
    )
}

export default InputWindow