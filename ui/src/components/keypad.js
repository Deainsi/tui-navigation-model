import './Keypad.css'
import {Button} from "@mui/material";
const Keypad = ({value, setValue, maxValueLen}) => {
    const buttons = [
        {
            text: '1', onClick: _ => {
                value.length < maxValueLen && setValue(value + '1')
            }
        },
        {
            text: '2', onClick: _ => {
                value.length < maxValueLen && setValue(value + '2')
            }
        },
        {
            text: '3', onClick: _ => {
                value.length < maxValueLen && setValue(value + '3')
            }
        },
        {
            text: '4', onClick: _ => {
                value.length < maxValueLen && setValue(value + '4')
            }
        },
        {
            text: '5', onClick: _ => {
                value.length < maxValueLen && setValue(value + '5')
            }
        },
        {
            text: '6', onClick: _ => {
                value.length < maxValueLen && setValue(value + '6')
            }
        },
        {
            text: '7', onClick: _ => {
                value.length < maxValueLen && setValue(value + '7')
            }
        },
        {
            text: '8', onClick: _ => {
                value.length < maxValueLen && setValue(value + '8')
            }
        },
        {
            text: '9', onClick: _ => {
                value.length < maxValueLen && setValue(value + '9')
            }
        },
        {
            text: '<', onClick: _ => {
                setValue(value.slice(0, value.length - 1))
            }
        },
        {
            text: '0', onClick: _ => {
                value.length < maxValueLen && setValue(value + '0')
            }
        },
        {
            text: '>', onClick: _ => {
                console.log(value)
            }
        },

    ]

    return (
        <div className='keypad'>
            {buttons.map(el =>
                <Button sx={{fontSize: 24}} variant='outlined' color='info' className='keypad-key' onClick={el.onClick}>{el.text}</Button>)}
        </div>
    )
}

export default Keypad