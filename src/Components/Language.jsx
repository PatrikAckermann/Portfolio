import "../CSS/Language.css"
import { Link, useOutletContext } from "react-router-dom"

export default function Language() {
    var context = useOutletContext()
    return (
        <div className="Language LayoutElement">
            <button onClick={() => context.scrollToArea("/")} className="BackButton">Zurück</button>
        </div>
    )
}