import "../CSS/Project.css"
import { Link, useOutletContext } from "react-router-dom"


export default function Project(props) {
    var context = useOutletContext()
    var project = context.project
    var currentImg = 0

    var images = []
    var technologies = []

    if (project.imgs !== undefined) {
        images = project.imgs.map(img => {
            return <div className="ProjectImgContainer" key={img}><img src={require("./" + img)} alt="Bild konnte nicht geladen werden."/></div>
        })
    }

    if (project.technologies !== undefined) {
        technologies = project.technologies.map(item => {
            return <li key={item}>{item}</li>
        })
    }

    function scrollImagesLeft() {
        var divs = document.getElementsByClassName("ProjectImgsContainer")
        currentImg -= 1
        if (currentImg < 0) {currentImg = images.length - 1}
        for(var key in divs) {
            if (["0", "1", "2", "3", "4", "5", "6"].includes(key)) {
                divs[key].scrollTo({left: divs[key].offsetWidth * currentImg, behavior: "smooth"})
            }
        }
    }

    function scrollImagesRight() {
        var divs = document.getElementsByClassName("ProjectImgsContainer")
        currentImg += 1
        if (currentImg >= images.length) {currentImg = 0}
        for(var key in divs) {
            if (["0", "1", "2", "3", "4", "5", "6"].includes(key)) {
                divs[key].scrollTo({left: divs[key].offsetWidth * currentImg, behavior: "smooth"})
            }
        }
    }

    return (<div className="Project LayoutElement">
        <button onClick={() => context.scrollToArea("/")} className="BackButton">Zurück</button>
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
                        <button id="button1">{project.button1.name}</button>
                        <button>{project.button2.name}</button>
                    </div>}
                </div>
                <div className="ProjectFlexRight">
                    <button onClick={scrollImagesLeft}>{"<"}</button>
                    <div className="ProjectImgsContainer" id="ProjectImgsContainer">
                        {images}
                    </div>
                    <button onClick={scrollImagesRight}>{">"}</button>
                </div>
            </div>
        </div>
    </div>)
}