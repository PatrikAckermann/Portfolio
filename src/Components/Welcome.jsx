import "../CSS/Welcome.css"
import { useOutletContext } from "react-router-dom"

export default function Welcome(props) {
    var context = useOutletContext()
    return (<div className="Welcome LayoutElement">
        <h1>Willkommen!</h1>
        <button onClick={() => context.scrollToArea("/")}>Portfolio öffnen</button>
    </div>)
}