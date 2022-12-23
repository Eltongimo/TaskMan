import React from 'react'
import './NewsLetter.css'
import {db} from '../database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, ref } from "firebase/database"
import TaskRow from '../TaskRow'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
/*
function NewsLetter (){
    const [products, setProducts] = useState({products:  []}) 
 
    const history = useHistory()
 
     useEffect( () => {
         const dbRef = ref(db)
            
             get(child(dbRef, `Newsletter`)).then((snapshot) => {
                     if (snapshot.exists())
                         setProducts({newsletter: snapshot.val()})
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
         }   
         else{
         
             history.push({
                 pathname: '/macroactivities',
                 search: `?key=${key[1]}`,
             })
         }
     }
 
     function buildTable(){
         
         var values = []
         let count = 0
 
         if (products !== null ){
             for(let key in products.projects){
                values.push(
                 <button onClick={handleButtonEvent}
                     style={{background: 'transparent',
                             border: 'none',
                             width: '100%',
                             outline: 'none',
                         }}
                 >
                     <div className='rows-report' id={`${count++}.${products.projects[key].Key}`} >
                         <div className='colmns-report'>
                         <ul id={`${count++}.${products.projects[key].Key}`} >
                             <li id={`${count++}.${products.projects[key].Key}`} >
                                 {products.projects[key].Area}
                             </li>
                             <li id={`${count++}.${products.projects[key].Key}`}>
                                 {products.projects[key].Name}
                             </li>
                         </ul>
                     </div>
                 </div>
                 </button>
             )
             }
         }
         return( 
         <div className='table-container'>
             <div className='header-container'>
                 <div className='report-header'>Nr</div>
                 <div className='report-header'>Titulo</div>
               </div>
             {values}
         </div>
         )
     }
 
     return buildTable()
 
 }
 */

function NewsLetter(props){

    return (
        <div className='newsletter-container'>
            <form>
                <div class="form-group">
                    <label for="exampleFormControlInput1">Titulo</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Titulo do Newsletter"/>
                </div>
                <div class="form-group" style={{'margin-top': '20px'}}>
                    <label for="exampleFormControlTextarea1" style={{'font-weight': '400'}}>Corpo</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="10"></textarea>
                </div>
                <div className='buttons-container' style={{'margin-top': '20px'}}>
                    <button type="button" class="btn btn-light">Gravar</button>
                    <button type="button" class="btn btn-danger">Descartar</button>
                </div>
            </form>
        </div>
    )
}

export default NewsLetter