import React from 'react'
import './AddNewsLetter.css'
import {useState} from 'react'
import {v4 as uuidv4} from 'uuid';
import {ref,set} from 'firebase/database'
import {db} from '../database/DatabaseHelper'
import {Storage} from '../database/Storage'
import { uploadBytes, ref as refStorage } from 'firebase/storage'

function AddNewsLetter(){
    const [newsLetter, setNewsLetter] = useState({
        Key: uuidv4(),
        Title: '',
        Body: '',
        File: null 
    })

    const [formElements, setFormElements ] = useState([
        {Titulo:  '', Corpo: '', Imagem: null },
    ])
    
    function back(e){
        window.history.back()
    }

    function setTitle(e){
        setNewsLetter({
            Key: newsLetter.Key,
            Title: e.target.value,
            Body: newsLetter.Body,
            File: newsLetter.File   
        })
    }

    function setBody(e){
        setNewsLetter({
            Key: newsLetter.Key,
            Title: newsLetter.Title,
            Body: e.target.value,
            File: newsLetter.File   
        })
    }

    function saveNewsLetter(e){

        if (newsLetter.File !== null){
            uploadBytes( refStorage(Storage,`Newsletter/${newsLetter.Key}`),newsLetter.File)
        }

        set(ref(db, 'NewsLetter/' + uuidv4()), newsLetter).then(
            ()=> {
                alert('Newsletter adicionado com sucesso')
            }
        )
        set(ref(db, 'NewsLetter/' + uuidv4()), newsLetter)
        document.getElementById('closemodal').click()
        window.history.back()
    }

    function setFile(e){
        e.preventDefault()
        setNewsLetter({
            Key: newsLetter.Key,
            Title: newsLetter.Title,
            Body: newsLetter.Body,
            File: e.target.files[0]
        })
    }


    const  handleFormChange = (event, index) => {
        const data = [...formElements]

        data[index][event.target.name] = event.target.value
     //   console.log(data[index][event.target.name])
       
        setFormElements(data)
        console.log(formElements)
    }

    const removeField = (element) => {
        let data = [...formElements]
        const index = element.target.id

        data.splice(index,1)

        setFormElements(data)
    }

    function addField(e){
        let element =  {Titulo: '', Corpo: '', Imagem: null}
        setFormElements([...formElements,element])
    }
    
    return (
        <div>
            <div className='title-newsletter'> 
                <div className='back-icon'>
                    <i className="bi bi-arrow-left" style={{cursor: 'pointer',
                                                                    marginRight: '20px'
                        }} onClick={back}/>
                </div>
                <div className='newsletter-title' style={{fontSize: '1.1rem', fontWeight: '400'}}>
                    Adicionar NewsLetter
                </div>
            </div>
            <div id='newsletter-content'>
                <form>
                    {formElements.map((element, index) => {
                       return ( <div key={index} style={{border: 'solid #ccc 0.1px', marginBottom: '10px'}}>
            
                            <div className="form-group" style={{display: 'flex', flexDirection: 'column'}}>

                                  <button type="button" id={index} onClick={removeField} style={{width: '10%', marginBottom: '15px', marginLeft: '90%'}}className="btn btn-outline-secondary">
                                        Apagar 
                                  </button>
                                <p>
                                     <label for="exampleFormControlInput1">Titulo</label>
                                </p>
                               
                                {/*<input type="email"  onChange={setTitle} onChange={event => handleFormChange(event, index)} className="form-control" id="exampleFormControlInput1" placeholder="Titulo do Newsletter"/>*/}
                                <input type="email" value={element.Titulo} name='titulo' onChange={event => handleFormChange(event, index)} className="form-control" id="exampleFormControlInput1" placeholder="Titulo do Newsletter"/>
                      
                            </div>
                            <div className="form-group" style={{'margin-top': '20px'}}>
                                <label for="exampleFormControlTextarea1" style={{'font-weight': '400'}}>Corpo</label>
                                {/*<textarea className="form-control" onChange={setBody} onChange={event => handleFormChange(event, index)} id="exampleFormControlTextarea1" rows="10"></textarea> */}
                                <textarea name='corpo' value={element.Corpo} className="form-control" onChange={event => handleFormChange(event, index)} id="exampleFormControlTextarea1" rows="10"></textarea>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Carregar Fotografia</label>
                             {/*<input type="file" accept='image/*' onChange={setFile} className="form-control" aria-describedby="emailHelp" /> */}
                                <input name='ficheiro' value={element.Imagem} type="file" accept='image/*' onChange={event => handleFormChange(event, index)} className="form-control" aria-describedby="emailHelp" />
                            </div>
                        </div> )         
                    })}
                
                    <div className='buttons-container' style={{'margin-top': '20px'}}>
                        <button type="button"  className="btn btn-secondary" onClick={addField}>
                            Adicionar Campo 
                        </button>
            
                        <button type="button"  className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            Gravar Newsletter 
                        </button>
                    <button type="button" className="btn btn-secundary">Descartar</button>
                    </div>
                </form>

                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <div className="form-group">
                                <label for="exampleInputEmail1">Submeter Newsletter ?</label>
                            </div>
                        </form>
                            </div>
                                <div className="modal-footer">
                                    <button type="button" id='closemodal' className="btn btn-secondary" data-dismiss="modal">Não</button>
                                    <button type="button" onClick={saveNewsLetter} className="btn btn-primary">Sim</button>
                                </div>
                            </div>
                        </div>
                    </div>    
            </div>
        </div>
    )
}

export default AddNewsLetter