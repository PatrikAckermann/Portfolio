import "../CSS/Contact.css"
import { useOutletContext } from "react-router-dom"
import React from "react"
import mailtoLink from "mailto-link"
import { Helmet } from "react-helmet"

export default function Welcome(props) {
    var context = useOutletContext()
    var [formData, setFormData] = React.useState({subject: "", message: ""})
    var strings = context.strings

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
        <Helmet>
            <title>{strings.contact} - Patrik Ackermann</title>
            <meta name="description" content={strings.CONTACT}/>
            <link rel="canonical" href="https://ackrmn.dev/contact"/>
        </Helmet>
        <button onClick={() => context.scrollToArea("/home")} className="BackButton ContactBackButton">{strings.back}</button>
        <div className="ContactPageContent">
            <h1 className="ContactTitle">{strings.contact}</h1>
            <form className="ContactForm">
                <label>{strings.subject}</label>
                <input tabIndex="0" type="text" id="subject" name="subject" onChange={handleChange} value={formData.subject}/>
                <label>{strings.message}</label>
                <textarea tabIndex="0" type="text" id="message" name="message" onChange={handleChange} value={formData.message}/>
                <button tabIndex="0" onClick={sendMail}>{strings.sendMail}</button>
            </form>
        </div>
    </div>)
}