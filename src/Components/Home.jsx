import { Helmet } from "react-helmet"
import "../CSS/Home.css"
import { useNavigate, useLocation } from "react-router-dom"

export default function Home(props) {
    var loaderData = props.loaderData
    var navigate = useNavigate()
    var location = useLocation()
    var languageListItems = []
    var projectListItems = []
    var strings = props.strings

    var tabIndex = props.currentPage === "/" ? "0" : "-1"

    if(loaderData === undefined) {
        return <div className="Home LayoutElement"></div>
    }

    function changePage(type) {
        props.scrollToArea(type)
    }

    function onEnter(event) {
        if (event.key === "Enter") {
            props.scrollToArea(event.target.id)
        }
    }

    // Load programming languages
    for (var key in loaderData.languages) {
        languageListItems.push({key: key, ...loaderData.languages[key]})
    }
    languageListItems = languageListItems.map(item => {
        return <li id={"/languages/" + item.key} onKeyUp={onEnter} key={item.key} className="Hover" tabIndex={tabIndex} onClick={() => changePage("/languages/" + item.key)}>{strings[item.name]}</li>
    })

    // Load projects
    for (var key in loaderData.projects) {
        projectListItems.push({key: key, ...loaderData.projects[key]})
    }
    projectListItems = projectListItems.map(item => {
        return <li id={"/projects/" + item.key} onKeyUp={onEnter} tabIndex={tabIndex} className="Hover" key={item.key} onClick={() => changePage("/projects/" + item.key)}>{strings[item.name]}</li>
    })

    return (
    <div className="Home LayoutElement">
        <Helmet>
            <title>Portfolio - Patrik Ackermann</title>
            <meta name="description" content="Entwicklerportfolio von Patrik Ackermann"/>
        </Helmet>
        <div className="HomeTitleSection">
            <h1 tabIndex={tabIndex} className="HomeTitle Hover" onClick={() => changePage("/about")} id="about" onKeyUp={onEnter}>Patrik Ackermann</h1>
            <h2 style={{fontSize: "24px", fontWeight: "500"}}className="HomeSubtitle">{strings.subtitle}</h2>
        </div>
        <div className="HomeSelectionContainer">
            <div className="HomeSelection">
                <h3>{strings.programmingLanguages}</h3>
                <ul>
                    {languageListItems}
                </ul>
            </div>
            <div className="HomeSelection">
                <h3>{strings.projects}</h3>
                <ul>
                    {projectListItems}
                </ul>
            </div>
        </div>
        <div className="HomeButtons">
            <button tabIndex={tabIndex} className="HomeButton" onClick={() => window.open("https://github.com/PatrikAckermann")}>GitHub</button>
            <button tabIndex={tabIndex} className="HomeButton" onClick={() => props.scrollToArea("/contact")}>{strings.contact}</button>
            <button tabIndex={tabIndex} className="HomeButton">Button</button>
        </div>
    </div>)
}