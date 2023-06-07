import "../CSS/Project.css"
import { Link, useOutletContext } from "react-router-dom"

export default function Project(props) {
    var context = useOutletContext()
    return (<div className="Project LayoutElement">
        <button onClick={() => context.scrollToArea("/")}>Zurück</button>
        <p>Project page</p>
    </div>)
}