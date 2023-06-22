import { Helmet } from "react-helmet"

export default function ErrorPage(props) {
    var strings = props.strings
    
    return (<div className="LayoutElement">
        <Helmet>
            <title>{strings.error + " - Patrik Ackermann"}</title>
            <meta name="description" content={strings.errorMessage}></meta>
        </Helmet>
        <button tabIndex="0" onClick={() => props.scrollToArea("")} className="BackButton">Zurück</button>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1>{strings.error}</h1>
            <p>{strings.errorMessage}</p>
            <p>{props.message}</p>
        </div>
    </div>)
}