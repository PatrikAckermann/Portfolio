import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import "../CSS/index.css"
import Layout, {loader as Dataloader} from "./Layout"
import Home from "./Home"
import Project from "./Project"
import Language from "./Language"
import Welcome from "./Welcome"
import Contact from "./Contact"
import AboutMe from "./AboutMe"

var router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>} loader={Dataloader}>
        <Route index element={<Welcome/>}/>
        <Route path="projects" element={<Project/>}>
            <Route path=":project"/>
        </Route>
        <Route path="languages" element={<Language/>}>
            <Route path=":language"/>
        </Route>
        <Route path="about" element={<AboutMe/>}/>
        <Route path="contact" element={<Contact/>}/>
    </Route>
))

export default function App() {
    return (<RouterProvider router={router}/>)
}