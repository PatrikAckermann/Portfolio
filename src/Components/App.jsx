import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import "../CSS/index.css"
import Layout, {loader as Dataloader} from "./Layout"
import Home from "./Home"
import Project from "./Project"
import Language from "./Language"
import Welcome from "./Welcome"
import Contact from "./Contact"

export var route = "/"
if (window.location.hostname === "patrikackermann.github.io") { // This is required on pages that have a path before the react router base path. For example on GitHub pages
  route = "/portfolio/"
}

var router = createBrowserRouter(createRoutesFromElements(
    <Route path={route} element={<Layout/>} loader={Dataloader}>
        <Route index element={<Welcome/>}/>
        <Route path="projects" element={<Project/>}/>
        <Route path="languages" element={<Language/>}/>
        <Route path="contact" element={<Contact/>}/>
    </Route>
))

export default function App() {
    return (<RouterProvider router={router}/>)
}

function ErrorPage() {
    return (
        <div className="LayoutElement"></div>
    )
}