import "../CSS/Contact.css"
import { useOutletContext } from "react-router-dom"

export default function Welcome(props) {
    var context = useOutletContext()
    return (<div className="Contact LayoutElement">
        <button onClick={() => context.scrollToArea("/")} className="BackButton ContactBackButton">Zurück</button>
        <div className="ContactPageContent">
            <h1 className="ContactTitle">Kontakt</h1>
            <form className="ContactForm">
                <label>Betreff</label>
                <input type="text" id="subject" name="subject"/>
                <label>Nachricht</label>
                <textarea type="text" id="message" name="message"/>
                <button>Senden</button>
            </form>
        </div>
    </div>)
}