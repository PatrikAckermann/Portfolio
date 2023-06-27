import "../CSS/Welcome.css"
import { useOutletContext } from "react-router-dom"
import React from "react"

var scrollPos = 0
function anim() {
    var titleContainer = document.getElementById("TextAnimation")
    if (titleContainer !== null) {
        scrollPos = scrollPos < 1 ? scrollPos + 1 : 0
        titleContainer.scroll({left: scrollPos * window.innerWidth, behavior: "smooth"})
    }    
    setTimeout(anim, 4000)
}
anim()

export default function Welcome(props) {
    var context = useOutletContext()
    var tabIndex = context.currentPage === "/" ? "0" : "-1"

    function setLanguage(language) {
        context.setLanguage(language)
        localStorage.setItem("language", language)
    }

    function openPortfolio() {
        context.scrollToArea("/home")
    }

    function onEnter(event) {
        if (event.key === "Enter") {
            setLanguage(event.target.id)
        }
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
            <img alt="🇩🇪" src="/svg/de.svg" tabIndex={tabIndex} id="de" onKeyUp={onEnter} className={context.language === "de" ? "Flag SelectedFlag" : "Flag"} onClick={() => setLanguage("de")}/>
            <img alt="🇬🇧" src="/svg/en.svg" tabIndex={tabIndex} id="en" onKeyUp={onEnter} className={context.language === "en" ? "Flag SelectedFlag" : "Flag"} onClick={() => setLanguage("en")}/>
        </div>
        <button onClick={openPortfolio} tabIndex={tabIndex}>{context.strings.openPortfolio}</button>
    </div>)
}