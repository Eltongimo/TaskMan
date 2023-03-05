import React from 'react'
import { useState,useEffect } from 'react'
import {db} from '../database/DatabaseHelper'
import { child, get, ref } from "firebase/database"
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import {Storage} from '../database/Storage'

function ReadNewsNetter(){

    const [newsletter, setnewsLetter] = useState({})
    const [imageList, setImageList] = useState([])
    const newsletterKey = document.URL.split('=')[1]
    const listOfImages = storageRef(Storage, `Newsletter/${newsletterKey}`)
    const [number, setNumber ] = useState(0)

    useEffect( () => {
        const dbRef = ref(db)

        listAll(listOfImages).then((response) => {
            let a = 0
            response.items.forEach(item => getDownloadURL(item).then(url =>{
            
               if (url !== undefined || url !== null ){

                let divImage = document.getElementsByClassName('images')

                if (divImage !== null && divImage !== undefined )
                    divImage[a++].appendChild(insertImage(url))
               }}))
        })
    
        function insertImage(url){
    
            let img = document.createElement('img')

            img.className = 'card-img-top'
            img.src = url

            return img
            //  <img src={imageList[key]} className="card-img-top" alt="sem imagem para carregar"/>
        }

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

        for(let key in newsletter){
            
            for (let innerKey in newsletter[key]){
                a.push(<div>
                    <div className='title' style={{fontWeight: '500',marginTop: '15px' }}>
                        {newsletter[key].Title}
                    </div>

                    <div className='body'>
                        {newsletter[key].Body}
                    </div>
                    <div className='images'  id={newsletter[key].Key} style={{marginTop: '20px'}}>
                        {console.log(newsletter[key])}
                    </div>
                </div>)
                break
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