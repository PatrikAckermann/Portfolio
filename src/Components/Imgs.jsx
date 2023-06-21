import "../CSS/Imgs.css"

export default function Imgs(props) {
    var images = []
    var currentImg = 0

    var count = 0
    if (props.imgs !== undefined) {
        images = props.imgs.map(img => {
            count += 1
            var image = img.startsWith("http") ? img : require("./" + img)
            if (img.endsWith("mp4")) {
                return <div className="ImgContainer" key={count}><video loop autoPlay src={image} alt="Bild konnte nicht geladen werden."/></div>
            }
            return <div className="ImgContainer" key={count}><img src={image} alt="Bild konnte nicht geladen werden."/></div>
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
            <button tabIndex={images.length > 1 ? "0" : "-1"} onClick={scrollImagesLeft} style={images.length > 1 ? {width: "40px"} : {width: "0px"}}>{"<"}</button>
            <div className="ImgsContainer" id="ImgsContainer">
                {images}
            </div>
            <button tabIndex={images.length > 1 ? "0" : "-1"} onClick={scrollImagesRight} style={images.length > 1 ? {width: "40px"} : {width: "0px"}}>{">"}</button>
        </div>
    )
}