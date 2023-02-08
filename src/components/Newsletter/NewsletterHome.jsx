import React from 'react'
import {db} from '../database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, ref,remove,update, } from "firebase/database"
import TaskRow from '../TaskRow'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import {Storage} from '../database/Storage'

function NewsLetterHome (){
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

     function deleteNewsLetter(e){

        remove(ref(db, `NewsLetter/${e.target.value}`)).then(() => {
            alert('Newsletter apagado com sucesso')
          
            const dbRef = ref(db)

            get(child(dbRef, `NewsLetter`)).then((snapshot) => {
                if (snapshot.exists())
                    setnewsLetter({newsLetters: snapshot.val()})
                else
                    alert('Sem newsletter para mostrar')
        })
        }).catch(() => {
            alert('Erro ao apagar a Newsletter')
        })

        document.getElementById(`closemodal${e.target.id}`).click()
     }
 
     function buildTable(){
         
         var values  = []     
         let count = 0
         let index = 0
 
         if (newsLetter !== null ){
             for(let key in newsLetter){
                console.log(newsLetter)
                
                for (let innerKey in newsLetter[key]){
                    values.push(
                        <button   style={{background: 'transparent',
                                        border: 'none',
                                        width: '100%',
                                        outline: 'none',
                                    }}>
                            <div className="card card-container" style={{width: '18rem', marginTop: '10px'}}>
                            {/*    <img src={imageList} className="card-img-top" alt="..."/> */}
                                <div className="card-body">
                                    <h5 className="card-title" style={{textAlign: 'justify'}}>{newsLetter[key][innerKey].Title}</h5>
                                    <p className="card-text" style={{textAlign: 'justify'}}>
                                        {newsLetter[key][innerKey].Body.split(" ").splice(0, 20).join(" ")} ...
                                    </p>
                                    <a className="btn btn-primary" onClick={seeMore} id={`${count++}.${key}`}>Ver Mais</a>
                                </div>
                            </div>
                    </button>
                    )
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