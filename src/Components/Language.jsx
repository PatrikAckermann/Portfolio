import "../CSS/Language.css"
import { Link, useOutletContext, useParams } from "react-router-dom"

export default function Language() {
    var context = useOutletContext()
    var params = useParams()
    var language = context.data.languages[params.language]

    var projects = []
    var skills = []

    projects = language.projects.map(project => {
        return <li key={project} className="LanguageListItem Pointer" onClick={() => context.scrollToArea("projects/" + project)}>{context.data.projects[project].name}</li>
    })

    skills = language.skills.map(skill => {
        return <li key={skill} className="LanguageListItem">{skill}</li>
    })

    return (
        <div className="Language LayoutElement">
            <button onClick={() => context.scrollToArea("")} className="BackButton">Zurück</button>
            <div className="LanguagePageContent">
                <h1 className="LanguageTitle">{language.name}</h1>
                <div className="LanguageFlexContainer">
                    <div className="LanguageFlexLeft">
                        <p className="LanguageDescription">{language.description}</p>
                    </div>
                    <div className="LanguageFlexRight">
                        <h2 className="LanguageProjectsTitle LanguageFlexRightTitle">Projekte</h2>
                        <ul>
                            {projects}
                        </ul>
                        <h2 className="LanguageSkillsTitle LanguageFlexRightTitle">Skills</h2>
                        <ul>    
                            {skills}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}