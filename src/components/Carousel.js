import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";



function Carousel() {

    const API_URL = "https://api.unsplash.com/";
    const accessKey = "WAKW2AfLsa5o9g1T0kWUpIxkqfXjCvtQk8738CYfGOI";

    const [loading, setLoading] = useState(false);
    const [dataReceived, setDataReceived] = useState([]);
    const [imgId, setImgId] = useState('');
    const [imgSrc, setImgeSrc] = useState('');
    const [imgAlt, setImgAlt] = useState('');
    const [photoIndex, setPhotoIndex] = useState(0);

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
            // const fetchedResults = [];

            // for (let key in response.data) {
            //     fetchedResults.push({
            //         ...response.data[key],
            //         id: key,
            //     });
            // }
            console.log(photoIndex);
            const oneItem = response.data[photoIndex];
            setDataReceived(oneItem);
            console.log(photoIndex)
            const { id, urls, alt_description } = oneItem;
            setImgId(id);
            setImgeSrc(urls.regular);
            setImgAlt(alt_description);
            // console.log(oneItem);
            setLoading(false);
        })
            .catch((error) => { console.log(error) })
    }, [photoIndex])


    return (
        <Wrapper>
            <button onClick={previous}>previous</button>
            {<img key={imgId} src={imgSrc} alt={imgAlt} />}

            <button onClick={next}>next</button>
        </Wrapper>
    )


}

export default Carousel;

const Wrapper = styled.main`

button {
display: inline-block;
border-radius: 3px;
padding: 0.5rem 0;
margin: 0.5rem 1rem;
width: 11rem;
border: 2px solid black;

  :focus{
    background-color: yellow;
  }
}

img{
    height: 344px;
    width:auto;
}

`