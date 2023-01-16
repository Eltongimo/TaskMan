import React from 'react'
import { useState,useEffect } from 'react'
import {db} from '../database/DatabaseHelper'
import { child, get, ref } from "firebase/database"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function ReadNewsNetter(){

    const [newsletter, setnewsLetter] = useState({})
    const newsletterkey = document.URL.split('=')[1]

    useEffect( () => {
        const dbRef = ref(db)
        
        get(child(dbRef, `NewsLetter`)).then((snapshot) => {
                if (snapshot.exists()){

                    for (let key in snapshot.val() ){
                      if( snapshot.val()[key].Key === newsletterkey)
                        setnewsLetter(snapshot.val()[key])
                    }
                }
            }
        )},[])

        function back(e){
            window.history.back()
        }

        return (
            <div className='container'>
                    <div className='title' id='title'>
                        <i className="bi bi-arrow-left" style={{cursor: 'pointer',
                                                                    marginRight: '20px'
                        }} onClick={back}/>
                    </div>
                
                <div className='title'>
                    {newsletter.Title}
                </div>
                <div className='body'>
                        {newsletter.Body}
                </div>
            </div>
        
        )
}

export default ReadNewsNetter