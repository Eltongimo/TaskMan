import React from 'react'
import { useState,useEffect } from 'react'
import {db} from '../database/DatabaseHelper'
import { child, get, ref } from "firebase/database"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import {Storage} from '../database/Storage'

function ReadNewsNetter(){

    const [newsletter, setnewsLetter] = useState({})
    const [imageList, setImageList] = useState([])
    const newsletterKey = document.URL.split('=')[1]
    const listOfImages = storageRef(Storage, `Newsletter/${newsletterKey}`)
   
    useEffect( () => {
        const dbRef = ref(db)

        listAll(listOfImages).then((response) => {
         let urls = []
         response.items.forEach(item => getDownloadURL(item).then(url =>{
             urls.push(url)
             setImageList(urls)
         }))
        })


        get(child(dbRef, `NewsLetter/${newsletterKey}`)).then((snapshot) => {
                if (snapshot.exists()){
                        setnewsLetter(snapshot.val())
                }
            }
        )},[])

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
                        <div className='images' style={{marginTop: '20px'}}>
                            <img src={imageList} className="card-img-top" alt="..."/>
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