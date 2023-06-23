import {Outlet} from "react-router-dom"
import Footer from "./Footer"
import Home from "./Home"
import Project from "./Project"
import { useLoaderData, useNavigate, useLocation } from "react-router-dom"
import React from "react"
import UAParser from "ua-parser-js"

var currentPage = "welcome"
var parser = new UAParser()
var browser = parser.getBrowser()

export default function Layout() {
    var loaderData = useLoaderData()
    var data = loaderData[0]
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
            strings = loaderData[1]
            break;
    }

    if (mobileCheck() === true) {
        alert(strings.mobileAlert)
    }

    var navigate = useNavigate()
    var location = useLocation()

    function scrollToArea(name, resize=false) {
        if (resize === false) {
            currentPage = name
        }

        var container = document.getElementsByClassName("LayoutContainer")[0]

        if (name.startsWith("welcome")) {
            obj = {left: 0, top: window.innerHeight - 40, behavior: "smooth"}
        } else if (name.startsWith("projects")) {
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
        if (!resize) {
            if (name === "") { // If going to home page wait with changing the Outlet. Otherwise it switches while it still is visible
                var duration = 500 // Duration needs to be different on browsers because of varying smooth scroll behavior animations
                switch(browser.name) {
                    case "Firefox":
                        duration = 300
                        break;
                    case "Chrome":
                        duration = 700
                        break;
                    case "Edge":
                        duration = 500
                        break;
                    default:
                        duration = 500
                        break;
                }
                setTimeout(() => navigate(name), duration)
            } else {
                navigate(name)
            }
        }
        setTimeout(() => container.scroll(obj), 1) // 1ms delay needed on Chromium browser. Otherwise it won't scroll right after navigate
    }

    window.scrollToArea = scrollToArea

    React.useEffect(() => {
        var container = document.getElementsByClassName("LayoutContainer")[0]
        localStorage.setItem("currentPage", "welcome")
        setTimeout(() => container.scrollTo({left: 0, top: window.innerHeight - 40, behavior: "smooth"}), 500)
        addEventListener("resize", (event) => {
            scrollToArea(currentPage, true)
        })
    }, [])

    return (
    <div className="Layout">
        <div className="LayoutContainer">
            <Empty/>
            {location.pathname.startsWith("/about") ? <Outlet context={{scrollToArea: scrollToArea, data: data, strings: strings}}/> : <Empty/>}
            <Empty/>
            <Outlet context={{scrollToArea: scrollToArea, data: data, language: language, setLanguage: setLanguage, strings: strings, currentPage: currentPage}}/>
            <Home loaderData={data} scrollToArea={scrollToArea} strings={strings} currentPage={currentPage}/>
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

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};