import "../CSS/AboutMe.css"
import { useOutletContext } from "react-router-dom"

export default function AboutMe(props) {
    var context = useOutletContext()
    return (<div className="AboutMe">
        <button onClick={() => context.scrollToArea("")} className="BackButton">Zurück</button>
    </div>)
}