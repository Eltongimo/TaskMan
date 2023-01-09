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
        set(ref(db, 'NewsLetter/' + uuidv4()), newsLetter);
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
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Titulo</label>
                        <input type="email"  onChange={setTitle} className="form-control" id="exampleFormControlInput1" placeholder="Titulo do Newsletter"/>
                    </div>
                    <div className="form-group" style={{'margin-top': '20px'}}>
                        <label for="exampleFormControlTextarea1" style={{'font-weight': '400'}}>Corpo</label>
                        <textarea className="form-control" onChange={setBody} id="exampleFormControlTextarea1" rows="10"></textarea>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Carregar Fotografia</label>
                        <input type="file" accept='image/*' onChange={setFile} className="form-control" aria-describedby="emailHelp" />
                    </div>
                
                    <div className='buttons-container' style={{'margin-top': '20px'}}>
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