import "../CSS/AboutMe.css"
import { useOutletContext } from "react-router-dom"
import React from "react"
import Imgs from "./Imgs.jsx"

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
            return <Card key={cardId} id={cardId} selectedCard={selectedCard} title={x.name} text={x.text} imgs={x.imgs} setImgs={switchImgs}/>
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
        <button onClick={() => context.scrollToArea("")} className="BackButton">{strings.back}</button>
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
        <div className={cardClass} onClick={() => props.imgs.length > 0 ? props.setImgs(props.imgs, props.id) : nothing()}>
            <h2 className="CardTitle">{props.title}</h2>
            <p className="CardText">{props.text}</p>
        </div>
    )
}