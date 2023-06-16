import "../CSS/Project.css"
import { Link, useOutletContext, useParams } from "react-router-dom"
import Imgs from "./Imgs.jsx"


export default function Project(props) {
    var context = useOutletContext()
    var params = useParams()
    var project = context.data.projects[params.project]

    var images = project.imgs
    var technologies = []

    if (project.technologies !== undefined) {
        technologies = project.technologies.map(item => {
            return <li key={item}>{item}</li>
        })
    }

    return (<div className="Project LayoutElement">
        <button onClick={() => context.scrollToArea("")} className="BackButton">Zurück</button>
        <div className="ProjectPageContent">
            <h1 className="ProjectTitle">{project.name}</h1>
            <div className="ProjectFlexContainer">
                <div className="ProjectFlexLeft">
                    <a className="ProjectDescriptionTitle">Beschreibung</a><br/>
                    <a className="ProjectDescription">{project.description}</a>
                    <br/><br/><a className="ProjectDescriptionTitle">Technologien</a><br/>
                    <ul className="ProjectTechnologies">
                        {technologies}
                    </ul>
                    {project.button1 !== undefined && <div className="ProjectButtonsDiv">
                        <button id="button1" onClick={() => window.open(project.button1.link)}>{project.button1.name}</button>
                        <button id="button2" onClick={() => window.open(project.button2.link)}>{project.button2.name}</button>
                    </div>}
                </div>
                <div className="ProjectFlexRight">
                    <Imgs imgs={images}/>
                </div>
            </div>
        </div>
    </div>)
}