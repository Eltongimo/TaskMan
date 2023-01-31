import React from 'react'
import './NewsLetter.css'
import {db} from '../database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, ref } from "firebase/database"
import TaskRow from '../TaskRow'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import {Storage} from '../database/Storage'

function NewsLetter (){
    const [newsLetter, setnewsLetter] = useState({newsLetters:  []}) 
    const [imageList, setImageList] = useState([])
    const listOfImages = storageRef(Storage, 'Newsletter/')
    const history = useHistory()
  
      useEffect( () => {
         const dbRef = ref(db)
           listAll(listOfImages).then((response) => {
            let urls = []
            response.items.forEach(item => getDownloadURL(item).then(url =>{
                urls.push(url)
                setImageList(urls)
            }))
         })

             get(child(dbRef, `NewsLetter`)).then((snapshot) => {
                     if (snapshot.exists())
                         setnewsLetter({newsLetters: snapshot.val()})
                     else
                         alert('no data to load from db server')
             })
         }
     ,[])
 
     function handleButtonEvent(e){
        
        let productKey = e.target.id
        let key  = productKey.split('.')
 
         if (key[0] === 'delete'){
            alert('deleting')
         }
         else if (key[0] === 'update'){
             alert('updating')
         }else{
            history.push({
                pathname: '/readnewsletter',
                search: `?key=${key[1]}`
            })
         }
     }
 
     function buildTable(){
         
         var values = []
         let count = 0
         let index = 0
 
         if (newsLetter !== null ){
             for(let key in newsLetter.newsLetters){
                values.push(
                    <button onClick={handleButtonEvent}
                              style={{background: 'transparent',
                                       border: 'none',
                                       width: '100%',
                                       outline: 'none',
                                   }}>
                        <div className="card card-container" style={{width: '18rem', marginTop: '10px'}}>
                        {/*    <img src={imageList} className="card-img-top" alt="..."/> */}
                            <div className="card-body">
                                <h5 className="card-title" style={{textAlign: 'justify'}}>{newsLetter.newsLetters[key].Title}</h5>
                                <p className="card-text" style={{textAlign: 'justify'}}>
                                    {newsLetter.newsLetters[key].Body.split(" ").splice(0, 20).join(" ")} ...
                                </p>
                                <a className="btn btn-primary" id={`${count++}.${newsLetter.newsLetters[key].Key}`}>Ver Mais</a>
                            </div>
                        </div>
                </button>
                )
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
            <div className='title' id='title'>
                <input type='tex' className="form-control" id="search" aria-describedby="emailHelp" placeholder="Procurar.."></input>
                <button type="button" className="btn btn-light" id='addbutton' onClick={add}>Adicionar</button>
            </div>
            {values}
         </div>
         ) 
     }
    
     return buildTable()
 
 }

export default NewsLetter