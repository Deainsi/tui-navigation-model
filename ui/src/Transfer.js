import InputWindow from "./components/inputWindow";
import Keypad from "./components/keypad";

const Transfer = () => {
    const formatCard = (value) => {
        return value.slice(0, 4) + ' ' + value.slice(4, 8) + ' ' + value.slice(8, 12) + ' ' + value.slice(12, 16)
    }
    return (
        <InputWindow formatValue={formatCard} maxValueLen={16} Component={Keypad}/>
    )
}

export default Transfer