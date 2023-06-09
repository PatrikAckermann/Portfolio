import "../CSS/Project.css"
import { Link, useOutletContext, useParams } from "react-router-dom"


export default function Project(props) {
    var context = useOutletContext()
    var params = useParams()
    var project = context.data.projects[params.project]
    var currentImg = 0

    var images = []
    var technologies = []

    if (project.imgs !== undefined) {
        images = project.imgs.map(img => {
            var image = img.startsWith("http") ? img : require("./" + img)
            if (img.endsWith("mp4")) {
                return <div className="ProjectImgContainer" key={img}><video loop autoPlay src={image} alt="Bild konnte nicht geladen werden."/></div>
            }
            return <div className="ProjectImgContainer" key={img}><img src={image} alt="Bild konnte nicht geladen werden."/></div>
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
                    {images.length > 1 && <button onClick={scrollImagesLeft}>{"<"}</button>}
                    <div className="ProjectImgsContainer" id="ProjectImgsContainer">
                        {images}
                    </div>
                    {images.length > 1 && <button onClick={scrollImagesRight}>{">"}</button>}
                </div>
            </div>
        </div>
    </div>)
}