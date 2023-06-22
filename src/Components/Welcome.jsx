import "../CSS/Welcome.css"
import { useOutletContext } from "react-router-dom"
import React from "react"

export default function Welcome(props) {
    var context = useOutletContext()

    function setLanguage(language) {
        if (language === "en") {alert("Warning: This language is not finished yet. Some parts of the site might not contain text.")}
        context.setLanguage(language)
        localStorage.setItem("language", language)
    }

    return (<div className="Welcome LayoutElement">
        <h1>Portfolio von Patrik Ackermann</h1>
        <p>Wähle eine Sprache</p>
        <div className="FlagContainer">
            <h1 className={context.language === "de" ? "Flag SelectedFlag" : "Flag"} onClick={() => setLanguage("de")}>🇩🇪</h1>
            <h1 className={context.language === "en" ? "Flag SelectedFlag" : "Flag"} onClick={() => setLanguage("en")}>🇬🇧</h1>
        </div>
        <button onClick={() => context.scrollToArea("")} tabIndex="0">{context.strings.openPortfolio}</button>
    </div>)
}