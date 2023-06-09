import "../CSS/Home.css"
import { useNavigate } from "react-router-dom"

export default function Home(props) {
    var loaderData = props.loaderData
    var navigate = useNavigate()
    var languageListItems = []
    var projectListItems = []

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
        return <li key={item.key} onClick={() => changePage("languages/" + item.key, item.key)}>{item.name}</li>
    })

    // Load projects
    for (var key in loaderData.projects) {
        projectListItems.push({key: key, ...loaderData.projects[key]})
    }
    projectListItems = projectListItems.map(item => {
        return <li key={item.key} onClick={() => changePage("projects/" + item.key, item.key)}>{item.name}</li>
    })

    return (
    <div className="Home LayoutElement">
        <div className="HomeTitleSection">
            <h1 className="HomeTitle" onClick={() => changePage("about")}>Patrik Ackermann</h1>
            <h2 className="HomeSubtitle">Irgend ein Untertitel, keine Ahnung</h2>
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
        <button className="HomeContactButton" onClick={() => props.scrollToArea("contact")}>Kontakt</button>
    </div>)
}

function listButton(props) {
    return (<li onClick={onClick}>{props.Text}</li>)
}