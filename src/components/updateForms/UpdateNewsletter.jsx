import React, { useEffect } from 'react'
import {useState} from 'react'
import {child, ref,set,get, remove} from 'firebase/database'
import {db} from '../database/DatabaseHelper'

function UpdateNewsLetter(){
    
    const dbRef = ref(db)

    const newsletterKey = document.URL.split('=')[1]

    const [formElements, setFormElements ] = useState([
        {Title:  '', Body: '', File: null },
    ])

    
    function getNewsletter(){

        get(child(dbRef, `NewsLetter/${newsletterKey}`)).then((s) => {
           if (s.exists()){
            setFormElements(s.val())
           }
        })
    }

    useEffect(() =>{
        getNewsletter()
    },[])

    function back(e){
        window.history.back()
    }

    function saveNewsLetter(e){
        
        remove(ref(db, `NewsLetter/${newsletterKey}`)).then(s => {
            set(ref(db, `NewsLetter/${newsletterKey}`), formElements).then(()=>
            {
                alert('Newsletter Actualizado com sucesso')
            }
        )
        })

        document.getElementById('closemodal').click()
        window.history.back()
        
    }

    const  handleFormChange = (event, index) => {
        const data = [...formElements]

        data[index][event.target.name] = event.target.value
        setFormElements(data)
    }

    const removeField = (element) => {
        let data = [...formElements]
        const index = element.target.id

        data.splice(index,1)

        setFormElements(data)
    }

    function addField(e){
        let element =  {Title: '', Body: '', File: null}
        setFormElements([...formElements,element])
    }


    function createForm(){
        let a = []

        formElements.map((element, index) => {

            a.push( <div key={index} style={{border: 'solid #ccc 0.1px', marginBottom: '10px'}}>

                 <div className="form-group" style={{display: 'flex', flexDirection: 'column'}}>

                       <button type="button" id={index} onClick={removeField} style={{width: '10%', marginBottom: '15px', marginLeft: '90%'}}className="btn btn-outline-secondary">
                             Apagar 
                       </button>
                     <p>
                          <label for="exampleFormControlInput1">Title</label>
                     </p>
                     <input type="email" value={element.Title} name='Title' onChange={event => handleFormChange(event, index)} className="form-control" id="exampleFormControlInput1" placeholder="Title do Newsletter"/>
           
                 </div>
                 <div className="form-group" style={{'margin-top': '20px'}}>
                     <label for="exampleFormControlTextarea1" style={{'font-weight': '400'}}>Body</label>
                     <textarea name='Body' value={element.Body} className="form-control" onChange={event => handleFormChange(event, index)} id="exampleFormControlTextarea1" rows="10"></textarea>
                 </div>
                 <div className="form-group">
                     <label for="exampleInputEmail1">Carregar Fotografia</label>
                     <input name='ficheiro' value={element.File} type="file" accept='image/*' onChange={event => handleFormChange(event, index)} className="form-control" aria-describedby="emailHelp" />
                 </div>
             </div> )         
         })       
         return a
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
                    Actualizar NewsLetter
                </div>
            </div>
            <div id='newsletter-content'>
                <form>
                    {createForm()}
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
                                <label for="exampleInputEmail1">Actualizar Newsletter ?</label>
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

export default UpdateNewsLetter