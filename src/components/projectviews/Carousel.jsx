import React from 'react'
import { useState,useEffect } from 'react'
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import {Storage} from '../database/Storage'
import { child, get, ref } from "firebase/database"
import Carousel from 'react-elastic-carousel';
import ReactDOM from "react-dom";
import Item from "./Item";
import "./Carousel.css";
import * as Dropbox from 'dropbox';

function CarouselHome(){

    const [images, setImages] = useState([])
    const listOfImages = storageRef(Storage, 'HomeContent')
    useEffect(()=> {

    
    /*   listAll(listOfImages).then((response) => {
         let urls = []
         response.items.forEach(item => getDownloadURL(item).then(url =>{
             urls.push(url)
         }))
         setImages(urls)
      })*/

    },[])

    
    
    const breakPoints = [
      { width: 1, itemsToShow: 1 },
      { width: 550, itemsToShow: 2 },
      { width: 768, itemsToShow: 3 },
      { width: 1200, itemsToShow: 4 },
    ];
    
    function buildCarouselImages(){
        let a = []
        images.map((element,index) => {
            a.push( <Item> 
                        <img src={`${element}`} data-toggle="modal" data-target={`#exampleModal${index}`} />
                        <div className="modal fade" id={`exampleModal${index}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false"
                        >
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                    <img className='home-img' src={`${element}`} data-toggle="modal" data-target={`#exampleModal${index}`}
                                        width={700}
                                        style={{marginRight: '200px'}}
                                    />
                            </div>
                        </div>
                    </Item>)
        })
        return a
    }
    return (
    <>
        <div className="App">
        <Carousel breakPoints={breakPoints}
            transitioning={true}           
        >
            {buildCarouselImages()}
        </Carousel>
        </div>
    </>
    )

    
    /*
    return( <Carousel>
                {images.map((item) => {
                    {console.log(item)}
                    <img src={`${item}`} alt='No image to load'/>
                })}
            </Carousel>
    )*/
}

export default CarouselHome