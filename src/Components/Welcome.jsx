import "../CSS/Welcome.css"
import { useOutletContext } from "react-router-dom"

export default function Welcome(props) {
    var context = useOutletContext()
    return (<div className="Welcome LayoutElement">
        <h1>Willkommen!</h1>
        <div className="FlagContainer">
            <h1 className="Flag" id="Flag1" style={{fontSize: "0vh"}}>🇦🇶</h1>
            <h1 className="Flag" id="Flag2" style={{fontSize: "20vh", color: "rgba(0,0,0,0.5)"}}>🇦🇶</h1>
            <h1 className="Flag" id="Flag3">🇩🇪</h1>
            <h1 className="Flag" id="Flag4" style={{fontSize: "20vh", color: "rgba(0,0,0,0.5)"}}>🇬🇧</h1>
            <h1 className="Flag" id="Flag5" style={{fontSize: "0vh"}}>🇦🇶</h1>
        </div>
        <button onClick={() => context.scrollToArea("")} tabIndex="0">Portfolio öffnen</button>
    </div>)
}