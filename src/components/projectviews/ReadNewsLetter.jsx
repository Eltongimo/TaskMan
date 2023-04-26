import React from 'react'
import { useState,useEffect } from 'react'
import {db} from '../database/DatabaseHelper'
import { child, get, ref } from "firebase/database"
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import {Storage} from '../database/Storage'

function ReadNewsNetter(){

    const [newsletter, setnewsLetter] = useState()
    const newsletterKey = document.URL.split('=')[1]
    const listOfImages = storageRef(Storage, `Newsletter/${newsletterKey}`)

    useEffect( () => {
        const dbRef = ref(db)
/*
        listAll(listOfImages).then((response) => {
            let a = 0
            response.items.forEach(item => getDownloadURL(item).then(url =>{
            
               if (url !== undefined && url !== null ){

                let divImage = document.getElementsByClassName('images')

                if (divImage !== null && divImage !== undefined )
                    if( a < divImage.length )
                        divImage[a++].appendChild(insertImage(url))
               }}))
        })
  */  
        get(child(dbRef, `NewsLetter/${newsletterKey}`)).then((snapshot) => {
                if (snapshot.exists()){
                    setnewsLetter(snapshot.val())
                }
            }
        )

    },[])
    function back(e){
        window.history.back()
    }

    function buildNewsLetter(){
        let a = []


        if (newsletter !== null && newsletter !== undefined){

            for (let innerKey in newsletter.NewsLetters){
                a.push(<div id={innerKey}>
                    <div className='title' style={{fontWeight: '500',marginTop: '15px' }}>
                        {newsletter.NewsLetters[innerKey].Title}
                    </div>

                    <div className='body'>
                        {newsletter.NewsLetters[innerKey].Body}
                    </div>
                    <div className='images' style={{marginTop: '20px'}}>
                        <img className='card-img-top' src={newsletter.NewsLetters[innerKey].Image} alt='No Image' />
                    </div>
                </div>)
            }
        }
        return a 
    }
        
    return (
        <div className='container'>
            <div className='title' id='title'>
                <i className="bi bi-arrow-left" style={{cursor: 'pointer',
                                                    marginRight: '20px'
                }} onClick={back}/>
            </div>
                {buildNewsLetter()}        
        </div>
    )
}

export default ReadNewsNetter