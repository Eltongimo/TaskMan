import React from 'react'
import { useState,useEffect } from 'react'
import {db} from '../database/DatabaseHelper'
import { child, get, ref } from "firebase/database"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function ReadNewsNetter(){

    const [newsletter, setnewsLetter] = useState({})

    useEffect( () => {
        const dbRef = ref(db)
        
        get(child(dbRef, `NewsLetter/${document.URL.split('=')[1]}`)).then((snapshot) => {
                if (snapshot.exists()){
                        setnewsLetter(snapshot.val())
                }
            }
        )},[])

        function back(e){
            window.history.back()
        }

        function buildNewsLetter(){
            
            let values = []

            for (let key in newsletter){

                values.push(

                    <div>
                        <div className='title' style={{fontWeight: '500',marginTop: '15px' }}>
                            {newsletter[key].Title}
                        </div>

                        <div className='body'>
                            {newsletter[key].Body}
                        </div>
                        <div className='images'>
                            
                        </div>
                    </div>
                )
            }

            return values
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