//import "../CSS/Welcome.css"
import { useOutletContext } from "react-router-dom"

export default function Welcome(props) {
    var context = useOutletContext()
    return (<div className="Contact LayoutElement">
        <h1>Kontakt</h1>
        <button onClick={() => context.scrollToArea("/")}>Zurück</button>
    </div>)
}