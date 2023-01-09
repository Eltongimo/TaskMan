import React from 'react'
import './NewsLetter.css'
import {db} from '../database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, ref } from "firebase/database"
import TaskRow from '../TaskRow'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer'
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import {Storage} from '../database/Storage'

function NewsLetter (){
    const [newsLetter, setnewsLetter] = useState({newsLetters:  []}) 
    const [imageList, setImageList] = useState([])
    const listOfImages = storageRef(Storage, 'Newsletter/')
    const history = useHistory()

    const styles = StyleSheet.create({
        header: {
            fontWeight: 600,
            padding: 10,
            marginTop: 20,
            flexDirection: 'row',
            border: 'solid 0.1 black'
        },
        body: {
          margin: 10,
          padding: 10,
          flexGrow: 1
        }
      });
    
    function NewsletterPDF(props){
        return (
            <Document>
                <Page>
                    <Text style={styles.header} >
                        {props.header}
                    </Text>
                    <Text style={styles.body} >
                        {props.body}
                    </Text>
                </Page>
            </Document>
        )
    }
     useEffect( () => {
         const dbRef = ref(db)
         listAll(listOfImages).then((response) => {
            response.items.forEach(item => getDownloadURL(item).then(url =>{
                setImageList((prev) => [...prev,url])
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
         }
     }
 
     function buildTable(){
         
         var values = []
         let count = 0
         let index = 0
 
         if (newsLetter !== null ){
             for(let key in newsLetter.newsLetters){
                values.push(
                 
                 <div> 
                    <button onClick={handleButtonEvent}
                     style={{background: 'transparent',
                             border: 'none',
                             width: '100%',
                             outline: 'none',
                         }}
                 >
                        <div className='rows-report' id={`${count++}.${newsLetter.newsLetters[key].Key}`} >
                            <div className='colmns-report'>
                                <ul id={`${count++}.${newsLetter.newsLetters[key].Key}`} >
                                    <li id={`${count++}.${newsLetter.newsLetters[key].Key}`} >
                                        {++index}
                                    </li>
                                
                                    <li id={`${count++}.${newsLetter.newsLetters[key].Key}`} >
                                        {newsLetter.newsLetters[key].Title}
                                    </li>
                                    <li id={`${count++}.${newsLetter.newsLetters[key].Key}`}>
                                        <i className="bi bi-trash" id={`delete.${count++}.${newsLetter.newsLetters[key].Key}`} />
                                    </li>
                                    <li id={`${count++}.${newsLetter.newsLetters[key].Key}`}>
                                        <i className="bi bi-pencil" id={`update.${count++}.$${newsLetter.newsLetters[key].Key}`} />
                                    </li>
                                    <li className='project-icons' data-toggle="modal" id={`${count}`} >
                                        <i className="bi bi-info" data-toggle="modal" data-target={`#exampleModal${count}`}
                                            style={{fontSize: '1.3rem'}}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </button>
                    <div className="modal fade" id={`exampleModal${count}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Newsletter</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <ul >
                                            <li className='modal-details-row'>
                                                <label style={{textAlign: 'justify'}}>Titulo </label> 
                                                <div className='activity-detail' style={{ 
                                                    border: 'solid #ccc 0.001px', textAlign: 'justify', padding: '10px', 
                                                    fontWeight: '400'
                                                }}>{newsLetter.newsLetters[key].Title} </div> 
                                            </li> 
                                            
                                            <li className='modal-details-row'>
                                                <label style={{fontWeight: '400', marginTop: '10px'}}> Texto </label> 
                                                <div className='activity-detail'
                                                    style={{border: 'solid #ccc 0.001px', textAlign: 'justify', padding: '10px', fontWeight: '400'}}
                                                > {newsLetter.newsLetters[key].Body}  </div> 
                                            </li> 
                                        </ul>
                                        {imageList.map(url => {
                                            <img src={`${url}`} />
                                        })}
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <PDFDownloadLink 
                                        document={NewsletterPDF({header: newsLetter.newsLetters[key].Title, body: newsLetter.newsLetters[key].Body})}
                                        filename='newsletter'
                                        >
                                            {({loading}) => (loading ? <button type="button" id='closemodal' className="btn btn-secondary" >Carregando documento</button>
                                                :                                     <button type="button" id='closemodal' className="btn btn-secondary" >Baixar Newsletter</button>
                                                ) }

                                    </PDFDownloadLink>
                         
                                </div>
                               </div>
                        </div>
                    </div>
                </div>)
            }
         }

         function add(e){
            history.push({
                pathname: '/addnewsletter'
              })
         }

         return( 
         <div className='table-container'>
            <div className='title' id='title'>
                <input type='tex' className="form-control" id="search" aria-describedby="emailHelp" placeholder="Procurar.."></input>
                <button type="button" className="btn btn-light" id='addbutton' onClick={add}>Adicionar</button>
            </div>
             <div className='header-container'>
                 <div className='report-header'>Nr</div>
                 <div className='report-header'>Titulo</div>
                 <div className='report-header'>Apagar</div>
                 <div className='report-header'>Actualizar</div>
                 <div className='report-header'>Ler</div>
               </div>
             {values}
         </div>
         )
     }
 
     return buildTable()
 
 }

export default NewsLetter