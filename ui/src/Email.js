import InputWindow from "./components/inputWindow";
import Keyboard from "./components/keyboard";
const Email = () => {

    return (
        <InputWindow  maxValueLen={16} Component={Keyboard}/>
    )
}

export default Email