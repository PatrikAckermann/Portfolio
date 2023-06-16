import "../CSS/Imgs.css"

export default function Imgs(props) {
    var images = []
    var currentImg = 0

    if (props.imgs !== undefined) {
        images = props.imgs.map(img => {
            var image = img.startsWith("http") ? img : require("./" + img)
            if (img.endsWith("mp4")) {
                return <div className="ImgContainer" key={img}><video loop autoPlay src={image} alt="Bild konnte nicht geladen werden."/></div>
            }
            return <div className="ImgContainer" key={img}><img src={image} alt="Bild konnte nicht geladen werden."/></div>
        })
    }

    function scrollImagesLeft() {
        var divs = document.getElementsByClassName("ImgsContainer")
        currentImg -= 1
        if (currentImg < 0) {currentImg = images.length - 1}
        for(var key in divs) {
            if (["0", "1", "2", "3", "4", "5", "6"].includes(key)) {
                divs[key].scrollTo({left: divs[key].offsetWidth * currentImg, behavior: "smooth"})
            }
        }
    }

    function scrollImagesRight() {
        var divs = document.getElementsByClassName("ImgsContainer")
        currentImg += 1
        if (currentImg >= images.length) {currentImg = 0}
        for(var key in divs) {
            if (["0", "1", "2", "3", "4", "5", "6"].includes(key)) {
                divs[key].scrollTo({left: divs[key].offsetWidth * currentImg, behavior: "smooth"})
            }
        }
    }

    return (
        <div className="Imgs">
            <button onClick={scrollImagesLeft} style={images.length > 1 ? {width: "40px"} : {width: "0px"}}>{"<"}</button>
            <div className="ImgsContainer" id="ImgsContainer">
                {images}
            </div>
            <button onClick={scrollImagesRight} style={images.length > 1 ? {width: "40px"} : {width: "0px"}}>{">"}</button>
        </div>
    )
}