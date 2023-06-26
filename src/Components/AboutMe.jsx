import "../CSS/AboutMe.css"
import { useOutletContext } from "react-router-dom"
import React from "react"
import Imgs from "./Imgs.jsx"
import { Helmet } from "react-helmet"

export default function AboutMe(props) {
    var context = useOutletContext()
    var cards = []
    var [imgs, setImgs] = React.useState([])
    var [imgsHidden, setImgsHidden] = React.useState(true)
    var [selectedCard, setSelectedCard] = React.useState(-1)
    var strings = context.strings
    
    var cardId = -1
    if (context.data !== undefined) {
        cards = context.data.about.map(x => {
            cardId += 1
            return <Card key={cardId} strings={strings} id={cardId} selectedCard={selectedCard} title={x.name} text={x.text} imgs={x.imgs} setImgs={switchImgs}/>
        })
    }

    function switchImgs(newImgs, cardId) {
        if (imgs === newImgs) {
            setImgsHidden(true)
            setSelectedCard(-1)
            setTimeout(() => setImgs([]), 500)
        } else {
            setSelectedCard(cardId)
            setImgsHidden(false)
            setImgs(newImgs)
        }
    }
    
    return (<div className="AboutMe LayoutElement">
        <Helmet>
            <title>{strings.about} - Patrik Ackermann</title>
            <meta name="description" content={strings.ABOUT}/>
            <link rel="canonical" href="https://ackrmn.dev/about"/>
        </Helmet>
        <button onClick={() => context.scrollToArea("/home")} className="BackButton">{strings.back}</button>
        <h1 className="AboutTitle">{strings.about}</h1>
        <div className="AboutFlex">
            <div className="AboutFlexLeft">
                {cards}
            </div>
            <div className="AboutFlexRight" style={imgsHidden === false && imgs.length > 0 ? {width: "50vw"} : {width: "0vw"}}>
                <Imgs imgs={imgs}/>
            </div>
        </div>
    </div>)
}

function Card(props) {
    var cardClass = "Card"
    if (props.imgs.length > 0) {
        cardClass += " CardImgs Hover"
    }
    if (props.id === props.selectedCard) {
        cardClass += " SelectedCard"
    }

    function nothing() {/* Nothing */}

    return (
        <div tabIndex="0" className={cardClass} onClick={() => props.imgs.length > 0 ? props.setImgs(props.imgs, props.id) : nothing()}>
            <h2 className="CardTitle">{props.strings[props.title]}</h2>
            <p className="CardText">{props.strings[props.text]}</p>
        </div>
    )
}