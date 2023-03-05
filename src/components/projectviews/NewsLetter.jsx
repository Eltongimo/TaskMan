import React from 'react'
import './NewsLetter.css'
import {db} from '../database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, ref,remove } from "firebase/database"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import {Storage} from '../database/Storage'

function NewsLetter (){
    const [newsLetter, setnewsLetter] = useState({newsLetters:  []}) 
    const [imageList, setImageList] = useState([])
    const listOfImages = storageRef(Storage, 'Newsletter/')
    const history = useHistory()
    const dbRef = ref(db)

      useEffect( () => {
        getNewsletterImages()
        getNewsletter()
         }
     ,[])
 
     function getNewsletterImages(){
        listAll(listOfImages).then((response) => {
            let urls = []
            response.items.forEach(item => getDownloadURL(item).then(url =>{
                urls.push(url)
                setImageList(urls)
            }))
         })
     }

     function getNewsletter(){
        get(child(dbRef, `NewsLetter`)).then((snapshot) => {
            if (snapshot.exists())
                setnewsLetter(snapshot.val())
            else
                alert('Sem newsletter para mostrar')
        })
    }

     function seeMore(e){
        history.push({
            pathname: '/readnewsletter',
            search: `?key=${e.target.id.split('.')[1]}`
        })
     }

     function updateNewsletter(e){
        history.push({
            pathname: '/updatenewsletter',
            search: `?key=${e.target.id}`
        })
     }

     function deleteNewsLetter(e){

        remove(ref(db, `NewsLetter/${e.target.value}`)).then(() => {
            alert('Newsletter apagado com sucesso')
            getNewsletter()
        }).catch(() => {
            alert('Erro ao apagar a Newsletter')
        })

        document.getElementById(`closemodal${e.target.id}`).click()
     }
 
     function buildTable(){
         
         var values  = []     
         let count = 0
 
         if (newsLetter !== null ){
             for(let key in newsLetter){
                for (let innerKey in newsLetter[key]){
                        values.push(
                            <button   style={{background: 'transparent',
                                           border: 'none',
                                           width: '100%',
                                           outline: 'none',
                                       }}>
                               <div className="card card-container" style={{width: '18rem', marginTop: '10px'}}>
                               <div style={{display: 'flex',flexDirection: 'row',width: '100%',padding: '10px'}}>
                                    <button type='button' className='btn btn-danger' data-toggle="modal" data-target={`#exampleModal${key}`} > Apagar </button> 
                                    <button type='button' className='btn btn-secondary' onClick={updateNewsletter} id={key} > Editar </button>
                               </div>
                                   <div className="card-body">
                                       <h5 className="card-title" style={{textAlign: 'justify'}}>{newsLetter[key][innerKey].Title}</h5>
                                       <p className="card-text" style={{textAlign: 'justify'}}>
                                           {newsLetter[key][innerKey].Body.split(" ").splice(0, 20).join(" ")} ...
                                       </p>
                                       <a className="btn btn-primary" onClick={seeMore} id={`${count++}.${key}`}>Ver Mais</a>
                                   </div>
                               </div>
                               <div className="modal fade" id={`exampleModal${key}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                               <div className="modal-dialog" role="document">
                                   <div className="modal-content">
                                   <div className="modal-header">
                                       <h5 className="modal-title" id="exampleModalLabel">Confirmação</h5>
                                       <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                       <span aria-hidden="true">&times;</span>
                                       </button>
                                   </div>
                                   <div className="modal-body">
                                   <form>
                                       <div className="form-group" >
                                           <label style={{textAlign: 'left'}} for="exampleInputEmail1">Apagar Newsletter ?</label>
                                       </div>
                                   </form>
                                       </div>
                                           <div className="modal-footer">
                                               <button type="button" id={`closemodal${count}`} className="btn btn-secondary" data-dismiss="modal">Não</button>
                                               <button type="button" value ={key} id={count} onClick={deleteNewsLetter} className="btn btn-primary">Sim</button>
                                           </div>
                                       </div>
                                   </div>
                               </div>  
                       </button>
                       )
                        break
                }
            }
         }

         function add(e){
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