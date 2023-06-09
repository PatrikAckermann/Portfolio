import "../CSS/Contact.css"
import { useOutletContext } from "react-router-dom"
import React from "react"
import mailtoLink from "mailto-link"

export default function Welcome(props) {
    var context = useOutletContext()
    var [formData, setFormData] = React.useState({subject: "", message: ""})

    function sendMail(e) {
        e.preventDefault()
        window.location.href = mailtoLink({to: "patrik_ackermann@outlook.com", subject: formData.subject, body: formData.message})
    }

    function handleChange(e) {
        setFormData(data => {
            return {...data, [e.target.name]: e.target.value}
        })
    }

    return (<div className="Contact LayoutElement">
        <button onClick={() => context.scrollToArea("")} className="BackButton ContactBackButton">Zurück</button>
        <div className="ContactPageContent">
            <h1 className="ContactTitle">Kontakt</h1>
            <form className="ContactForm">
                <label>Betreff</label>
                <input type="text" id="subject" name="subject" onChange={handleChange} value={formData.subject}/>
                <label>Nachricht</label>
                <textarea type="text" id="message" name="message" onChange={handleChange} value={formData.message}/>
                <button onClick={sendMail}>E-Mail Senden</button>
            </form>
        </div>
    </div>)
}