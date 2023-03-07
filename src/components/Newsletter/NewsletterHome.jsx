import React from 'react'
import {db} from '../database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get,ref} from "firebase/database"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function NewsLetterHome (){
    const [newsLetter, setnewsLetter] = useState({newsLetters:  []}) 
    const history = useHistory()
  
      useEffect( () => {
         const dbRef = ref(db)
             get(child(dbRef, `NewsLetter`)).then((snapshot) => {
                if (snapshot.exists())
                    setnewsLetter(snapshot.val())
                else
                    alert('Sem newsletter para mostrar')
             })
         }
     ,[])
 
     function seeMore(e){

        history.push({
            pathname: '/readnewsletter',
            search: `?key=${e.target.id.split('.')[1]}`
        })
     }

   
     function buildTable(){

         var values  = []     
         let count = 0
         let index = 0
 
         if (newsLetter !== null && newsLetter !== undefined ){
             for(let key in newsLetter){
                for (let innerKey in newsLetter[key].NewsLetters){

                    console.log(newsLetter[key].NewsLetters)
                    values.push(
                        <
                            button   style={{background: 'transparent',
                                        border: 'none',
                                        width: '100%',
                                        outline: 'none',
                                    }} id={key}>
                            <div className="card card-container" style={{width: '18rem', marginTop: '10px'}}>
                                <div className="card-body">
                                    <h5 className="card-title" style={{textAlign: 'justify'}}>{newsLetter[key].GeneralTitle}</h5>
                                    <p className="card-text" style={{textAlign: 'justify'}}>
                                        {newsLetter[key].NewsLetters[innerKey].Body.split(" ").splice(0, 20).join(" ")} ...
                                    </p>
                                    <a className="btn btn-primary" onClick={seeMore} id={`${count++}.${key}`}>Ver Mais</a>
                                </div>
                            </div>
                    </button>
                    )
                    break
                }
            }
         }

         function add(e){
            const key = e.target.id.split('.')
            history.push({
                pathname: '/addnewsletter',
              })
         }

         return( 
         <div className='table-container'>
            {values}
         </div>
         ) 
     }

    return buildTable()
 }

export default NewsLetterHome