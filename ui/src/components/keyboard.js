import {useState} from "react";
import Carousel from 'react-material-ui-carousel'
import './keyboard.css'
import {Button} from "@mui/material";


const keyboard3DArray = [
    [
        ['1', '2', '3', '4', '5'],
        ['q', 'w', 'e', 'r', 't'],
        ['a', 's', 'd', 'f', 'g'],
        ['z', 'x', 'c', 'v', 'b']
    ],
    [
        ['6', '7', '8', '9', '0'],
        ['y', 'u', 'i', 'o', 'p'],
        ['h', 'j', 'k', 'l'],
        ['n', 'm']
    ],
    [
    ['@', '#', '$', '%'],
    ['&', '*', '(', ')'],
    ['!', '?', '.', ',']
  ],
];


const Keyboard = ({value, setValue}) => {
    const [caps, setCaps] = useState(false)
    return (
        <div style={{display: 'flex', gap: '1rem'}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                <Button variant='outlined' className='spec-key' onClick={_ => setValue(value.slice(0, value.length - 1))}>Backspace</Button>
                <Button variant={caps ? 'contained':'outlined'} className='spec-key' onClick={_ => setCaps(!caps)}>Caps Lock</Button>
                <Button variant='outlined' className='spec-key' onClick={_ => setValue(value + ' ')}>Space</Button>
            </div>
            <Carousel autoPlay={false} sx={{width: '100%'}}>
                {keyboard3DArray.map(half =>
                    <div className='keyrow'>
                        {half.map(r =>
                            <div className='keyboard'>
                                {r.map(k => <Button className='key' variant='outlined' sx={{fontSize: 24}}
                                                    onClick={_ => setValue(value + (caps ? k.toUpperCase() : k))}>{k}</Button>)}
                            </div>)}
                    </div>)
                }
            </Carousel>
        </div>
    )
}

export default Keyboard