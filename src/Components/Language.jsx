import "../CSS/Language.css"
import { Link, useOutletContext, useParams } from "react-router-dom"

export default function Language() {
    var context = useOutletContext()
    var params = useParams()
    var language = context.data.languages[params.language]
    var strings = context.strings

    var projects = []
    var skills = []

    projects = language.projects.map(project => {
        return <li tabIndex="0" key={project} className="LanguageListItem Hover" onClick={() => context.scrollToArea("projects/" + project)}>{strings[context.data.projects[project].name]}</li>
    })

    skills = language.skills.map(skill => {
        return <li key={skill} className="LanguageListItem">{skill}</li>
    })

    return (
        <div className="Language LayoutElement">
            <button tabIndex="0" onClick={() => context.scrollToArea("")} className="BackButton">Zurück</button>
            <div className="LanguagePageContent">
                <h1 className="LanguageTitle">{strings[language.name]}</h1>
                <div className="LanguageFlexContainer">
                    <div className="LanguageFlexLeft">
                        <p className="LanguageDescription">{strings[language.description]}</p>
                    </div>
                    <div className="LanguageFlexRight">
                        <h2 className="LanguageProjectsTitle LanguageFlexRightTitle">{strings.projects}</h2>
                        <ul>
                            {projects}
                        </ul>
                        <h2 className="LanguageSkillsTitle LanguageFlexRightTitle">{strings.skills}</h2>
                        <ul>    
                            {skills}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}