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

    setTimeout(() => {
        var scrollPos = 0
        var titleContainer = document.getElementById("TextAnimation")
        function anim() {
            if (titleContainer !== null) {
                scrollPos = scrollPos < 1 ? scrollPos + 1 : 0
                titleContainer.scroll({left: scrollPos * window.innerWidth, behavior: "smooth"})
                setTimeout(anim, 5000)
            }    
        }
        anim()
    }, 5000)

    function openPortfolio() {
        context.scrollToArea("")
        animationActive = false
    }

    return (<div className="Welcome LayoutElement">
        <div className="WelcomeTitleContainer TextAnimation" id="TextAnimation">
            <div className="titleContainer">
                <h1 className="WelcomeTitle">Portfolio von Patrik Ackermann</h1>
                <p>Wähle eine Sprache</p>
            </div>
            <div className="titleContainer">
                <h1 className="WelcomeTitle">Portfolio from Patrik Ackermann</h1>
                <p>Choose a language</p>
            </div>
        </div>
        <div className="FlagContainer">
            <h1 className={context.language === "de" ? "Flag SelectedFlag" : "Flag"} onClick={() => setLanguage("de")}>🇩🇪</h1>
            <h1 className={context.language === "en" ? "Flag SelectedFlag" : "Flag"} onClick={() => setLanguage("en")}>🇬🇧</h1>
        </div>
        <button onClick={openPortfolio} tabIndex="0">{context.strings.openPortfolio}</button>
    </div>)
}