import React from 'react'
import { useState,useEffect } from 'react'
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import {Storage} from '../database/Storage'
import { child, get, ref } from "firebase/database"


function Carousel(){

    const [images, setImages] = useState([])
    const listOfImages = storageRef(Storage, 'HomeContent/')

    useEffect(()=> {
        listAll(listOfImages).then((response) => {
         let urls = []
         response.items.forEach(item => getDownloadURL(item).then(url =>{
             urls.push(url)
             setImages(urls)
         }))
      })

    },[])

    function getImage(){
        let img = []

        for (let element in images){
            img.push(
                <div className="carousel-item active">
                    <img className="d-block w-100" height={300} src={images[element]} alt="Slide"/>
                </div>
            ) 
        }
        return img
    }

    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                {getImage()}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="false"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="false"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}

export default Carousel