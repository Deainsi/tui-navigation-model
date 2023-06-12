import './Home.css'
import {useNavigate} from "react-router-dom";
import Carousel from "react-material-ui-carousel";

const Home = () => {
    const navigate = useNavigate()
    const menu = [
        [
            {text: 'Keypad', url: 'Transfer'},
            {text: 'Keyboard', url: 'Email'},
            {text: '3', url: ''},
            {text: '4', url: ''},
            {text: '5', url: ''},
            {text: '6', url: ''},
            {text: '7', url: ''},
            {text: '8', url: ''},
            {text: '9', url: ''}],
        [
            {text: 'Keypad', url: 'Transfer'},
            {text: 'Keyboard', url: 'Email'},
            {text: '3', url: ''},
            {text: '4', url: ''},
            {text: '5', url: ''},
            {text: '6', url: ''}
        ]
    ]
    return (

        <Carousel autoPlay={false} sx={{width: '100%', height: '100vh'}} indicators={false}>
            {menu.map(buttons =>
                <div className='landing-page'>
                    {buttons.map(el =>
                        <div className='card' onClick={_ => navigate(el.url)}>
                            {el.text}
                        </div>
                    )}
                </div>
            )}
        </Carousel>
    )
}

export default Home