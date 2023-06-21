import "../CSS/Home.css"
import { useNavigate, useLocation } from "react-router-dom"

export default function Home(props) {
    var loaderData = props.loaderData
    var navigate = useNavigate()
    var location = useLocation()
    var languageListItems = []
    var projectListItems = []

    var tabIndex = location.pathname === "/" ? "0" : "-1"

    if(loaderData === undefined) {
        return <div className="Home LayoutElement"></div>
    }

    function changePage(type, item) {
        props.scrollToArea(type)
    }

    // Load programming languages
    for (var key in loaderData.languages) {
        languageListItems.push({key: key, ...loaderData.languages[key]})
    }
    languageListItems = languageListItems.map(item => {
        return <li key={item.key} className="Hover" tabIndex={tabIndex} onClick={() => changePage("languages/" + item.key, item.key)}>{item.name}</li>
    })

    // Load projects
    for (var key in loaderData.projects) {
        projectListItems.push({key: key, ...loaderData.projects[key]})
    }
    projectListItems = projectListItems.map(item => {
        return <li tabIndex={tabIndex} className="Hover" key={item.key} onClick={() => changePage("projects/" + item.key, item.key)}>{item.name}</li>
    })

    return (
    <div className="Home LayoutElement">
        <div className="HomeTitleSection">
            <h1 tabIndex={tabIndex} className="HomeTitle Hover" onClick={() => changePage("about")}>Patrik Ackermann</h1>
            <h2 className="HomeSubtitle">The best developer in the entire universe (pls hire me google)</h2>
        </div>
        <div className="HomeSelectionContainer">
            <div className="HomeSelection">
                <h3>Programmiersprachen</h3>
                <ul>
                    {languageListItems}
                </ul>
            </div>
            <div className="HomeSelection">
                <h3>Projekte</h3>
                <ul>
                    {projectListItems}
                </ul>
            </div>
        </div>
        <div className="HomeButtons">
            <button tabIndex={tabIndex} className="HomeButton" onClick={() => window.open("https://github.com/PatrikAckermann")}>GitHub</button>
            <button tabIndex={tabIndex} className="HomeButton" onClick={() => props.scrollToArea("contact")}>Kontakt</button>
            <button tabIndex={tabIndex} className="HomeButton">Button</button>
        </div>
    </div>)
}