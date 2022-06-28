import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import pauseButton from "../assests/icons/play-button.png";


function Carousel() {

    const API_URL = "https://api.unsplash.com/";
    const accessKey = "WAKW2AfLsa5o9g1T0kWUpIxkqfXjCvtQk8738CYfGOI";

    const [loading, setLoading] = useState(false);
    const [dataReceived, setDataReceived] = useState([]);
    const [imgId, setImgId] = useState('');
    const [imgSrc, setImgeSrc] = useState('');
    const [imgAlt, setImgAlt] = useState('');
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    function previous() {
        setPhotoIndex(photoIndex - 1);
        if (photoIndex <= 0) {
            setPhotoIndex(8);
        }
    };
    function next() {
        setPhotoIndex(photoIndex + 1)
        if (photoIndex >= 9) {
            setPhotoIndex(0);
        }
    };

    useEffect(() => {
        setLoading(true);
        axios.get(`${API_URL}/photos/?client_id=${accessKey}`).then(response => {

            const oneItem = response.data[photoIndex];
            setDataReceived(oneItem);
            const { id, urls, alt_description } = oneItem;
            setImgId(id);
            setImgeSrc(urls.regular);
            setImgAlt(alt_description);
            setLoading(false);
        })
            .catch((error) => { console.log(error) })
    }, [photoIndex])

    useEffect(() => {

        if (isPlaying) {
            let timeout = setTimeout(() => {
                setPhotoIndex(photoIndex + 1)
                if (photoIndex >= 9) {
                    setPhotoIndex(0);
                }
            }, "2500")
            return () => clearTimeout(timeout);
        }
    }, [photoIndex, isPlaying])



    return (
        <Wrapper>
            <div className="carousel">
                <div className="imgContainer">
                    {<img key={imgId} src={imgSrc} alt={imgAlt} />}
                </div>
                <div className="buttons">
                    <button className="btn direction" onClick={previous}>&lt;</button>
                    <button className="btn direction" onClick={next}>&gt;</button>
                    <input className="btn pausePlay" type="button" onClick={() => { setIsPlaying(true) }} value="Play" />
                    <input className="btn pausePlay" type="button" onClick={() => { setIsPlaying(false) }} value="Pause" />
                </div>
            </div>
        </Wrapper>
    )
}

export default Carousel;
const Wrapper = styled.main`

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;



.buttons{
    display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
}

.btn {
z-index:2;
border-radius: 6rem;
background-color: white;
font-weight: 900;
font-size: 1rem;
padding: 0.5rem 0;
width: 3rem;
border: 0.15rem solid black;


  :hover{
    font-size:1.3rem  }


}

.pausePlay{
        width: 5rem;
    }


.imgContainer{
    height: 21rem;
    width:21rem;
    display: flex;
flex-direction: row;
justify-content: center;
align-items: center;


    img{
        width: auto;
        height: 80%;
        
    }
}

`