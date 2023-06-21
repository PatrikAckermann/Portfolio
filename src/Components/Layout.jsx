import {Outlet} from "react-router-dom"
import Footer from "./Footer"
import Home from "./Home"
import Project from "./Project"
import { useLoaderData, useNavigate, useLocation } from "react-router-dom"
import React from "react"


export default function Layout() {
    var loaderData = useLoaderData()
    var data = loaderData[0]
    var german = loaderData[1]
    var english = loaderData[2]

    var [language, setLanguage] = React.useState(localStorage.getItem("language"))
    if (language === null) {setLanguage("de"); localStorage.setItem("language", "de")}

    var strings
    switch(language) {
        case "de":
            strings = loaderData[1]
            break;
        case "en":
            strings = loaderData[2]
            break;
        default:
            strings = loaderData[2]
            break;
    }

    var navigate = useNavigate()
    var location = useLocation()

    function scrollToArea(name) {
        var container = document.getElementsByClassName("LayoutContainer")[0]

        if (name.startsWith("projects")) {
            var obj = {left: window.innerWidth * 2, top: window.innerHeight - 40, behavior: "smooth"}
        } else if (name.startsWith("languages")){
            var obj = {left: 0, top: window.innerHeight - 40, behavior: "smooth"}
        } else if (name === "contact") {
            var obj = {left: window.innerWidth, top: window.innerHeight * 2 - 40, behavior: "smooth"}
        } else if (name === "about") {
            var obj = {left: window.innerWidth, top: 0, behavior: "smooth"}
        } else {
            var obj = {left: window.innerWidth, top: window.innerHeight - 40, behavior: "smooth"}
        }
        container.scroll(obj)
        if (name === "") { // If going to home page wait with changing the Outlet. Otherwise it switches while it still is visible
            setTimeout(() => navigate(name), 300)
        } else {
            navigate(name)
        }
    }

    window.scrollToArea = scrollToArea

    React.useEffect(() => {
        var container = document.getElementsByClassName("LayoutContainer")[0]
        setTimeout(() => container.scrollTo({left: 0, top: window.innerHeight - 40, behavior: "smooth"}), 500)
    }, [])

    return (
    <div className="Layout">
        <div className="LayoutContainer">
            <Empty/>
            {location.pathname.startsWith("/about") ? <Outlet context={{scrollToArea: scrollToArea, data: data, strings: strings}}/> : <Empty/>}
            <Empty/>
            <Outlet context={{scrollToArea: scrollToArea, data: data, language: language, setLanguage: setLanguage, strings: strings}}/>
            <Home loaderData={data} scrollToArea={scrollToArea} strings={strings}/>
            {location.pathname.startsWith("/projects") ? <Outlet context={{scrollToArea: scrollToArea, data: data, strings: strings}}/> : <Empty/>}
            <Empty/>
            {location.pathname.startsWith("/contact") ? <Outlet context={{scrollToArea: scrollToArea, strings: strings}}/> : <Empty/>}
            <Empty/>
        </div>
        <Footer />
    </div>)
}

export function loader() {
    return [require("../data.json"), require("../languages/de.json"), require("../languages/en.json")]
}

function Empty() {
    return (<div className="LayoutElement"></div>)
}