import "../CSS/Project.css"
import { Link, useOutletContext, useParams } from "react-router-dom"
import Imgs from "./Imgs.jsx"
import { Helmet } from "react-helmet"
import ErrorPage from "./ErrorPage"

export default function Project(props) {
    var context = useOutletContext()
    var params = useParams()
    var project = context.data.projects[params.project]
    var strings = context.strings

    if (project === undefined) {
        return <ErrorPage message={strings.projectError} strings={strings} scrollToArea={context.scrollToArea}/>
    }

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
            <Helmet>
                <title>{strings[project.name]} - Patrik Ackermann</title>
                <meta name="description" content={strings[project.description]}/>
                <link rel="canonical" href={"https://ackrmn.dev/projects/" + params.project}/>
            </Helmet>
            <h1 className="ProjectTitle">{strings[project.name]}</h1>
            <div className="ProjectFlexContainer">
                <div className="ProjectFlexLeft">
                    <h3 className="ProjectDescriptionTitle">{strings.description}</h3><br/>
                    <p className="ProjectDescription">{strings[project.description]}</p>
                    <br/><br/><h3 className="ProjectDescriptionTitle">{strings.technologies}</h3><br/>
                    <ul className="ProjectTechnologies">
                        {technologies}
                    </ul>
                    {project.button1 !== undefined && <div className="ProjectButtonsDiv">
                        <button tabIndex="0" id="button1" onClick={() => window.open(project.button1.link)}>{strings[project.button1.name]}</button>
                        <button tabIndex="0" id="button2" onClick={() => window.open(project.button2.link)}>{strings[project.button2.name]}</button>
                    </div>}
                </div>
                <div className="ProjectFlexRight">
                    <Imgs imgs={images}/>
                </div>
            </div>
        </div>
    </div>)
}