import { Helmet } from "react-helmet"
import "../CSS/Language.css"
import { Link, useOutletContext, useParams } from "react-router-dom"
import ErrorPage from "./ErrorPage"

export default function Language() {
    var context = useOutletContext()
    var params = useParams()
    var language = context.data.languages[params.language]
    var strings = context.strings

    if (language === undefined) {
        return <ErrorPage message={strings.languageError} strings={strings} scrollToArea={context.scrollToArea}/>
    }

    function onEnter(event) {
        if (event.key === "Enter") {
            context.scrollToArea(event.target.id)
        }
    }

    var projects = []
    var skills = []

    projects = language.projects.map(project => {
        return <li id={"/projects/" + project} onKeyUp={onEnter} tabIndex="0" key={project} className="LanguageListItem Hover" onClick={() => context.scrollToArea("/projects/" + project)}>{strings[context.data.projects[project].name]}</li>
    })

    skills = language.skills.map(skill => {
        return <li key={skill} className="LanguageListItem">{skill}</li>
    })

    return (
        <div className="Language LayoutElement">
            <Helmet>
                <title>{strings[language.name]} - Patrik Ackermann</title>
                <meta name="description" content={strings[language.description]}></meta>
                <link rel="canonical" href={"https://ackrmn.dev/languages/" + params.language}/>
            </Helmet>
            <button tabIndex="0" onClick={() => context.scrollToArea("/")} className="BackButton">Zurück</button>
            <div className="LanguagePageContent">
                <h1 className="LanguageTitle">{strings[language.name]}</h1>
                <div className="LanguageFlexContainer">
                    <div className="LanguageFlexLeft">
                        <h3>{strings.description}</h3>
                        <p className="LanguageDescription">{strings[language.description]}</p>
                    </div>
                    <div className="LanguageFlexRight">
                        <h3 className="LanguageProjectsTitle LanguageFlexRightTitle">{strings.projects}</h3>
                        <ul>
                            {projects}
                        </ul>
                        <h3 className="LanguageSkillsTitle LanguageFlexRightTitle">{strings.skills}</h3>
                        <ul>    
                            {skills}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}