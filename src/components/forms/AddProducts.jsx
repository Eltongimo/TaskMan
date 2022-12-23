import React from 'react'
import './AddProducts.css'
import { useState } from 'react'
import { useEffect } from 'react'
import {db} from '../database/DatabaseHelper'
import {set,ref,get,child} from 'firebase/database'
import {v4 as uuidv4} from 'uuid';

function AddProducts(){

    const [product, setProduct] = useState({
        Area: 'Urbanização e Regeneração Urbana',
        LatKey: '',
        Name: '',
        ProjectKey: document.URL.split('=')[1],
        Status: 'Não Iniciado',
        Key: uuidv4()
    })

    const [lat, setLats] = useState({})
    
    useEffect( () => {
        const dbRef = ref(db)
        
        get(child(dbRef, `LAT`)).then((snapshot) => {
                if (snapshot.exists()){
                    setLats({lats: snapshot.val()})
                }
             }
        )},[])
    
    function setProductName(e){
        setProduct({
            Area: product.Area,
            LatKey: product.LatKey,
            Name: e.target.value,
            ProjectKey: product.ProjectKey,
            Status: product.Status,
            Key: product.Key
        })
    }

    function setStatus(e){
        setProduct({
            Area: product.Area,
            LatKey: product.LatKey,
            Name: e.target.value,
            ProjectKey: product.ProjectKey,
            Status: e.target.value,
            Key: product.Key
        })
    }   

    function setArea(e){
        console.log(e.target.value)
        setProduct({
            Area: e.target.value,
            LatKey: product.LatKey,
            Name: product.Name,
            ProjectKey: product.ProjectKey,
            Status: product.Status,
            Key: product.Key
        })
    }

    function saveProduct (e){

        for (let key in lat.lats){
            if (lat.lats[key].Description === product.Area ){
                setProduct({
                    Area: product.Area,
                    LatKey: lat.lats[key].Key,
                    Name: product.Name,
                    ProjectKey: product.ProjectKey,
                    Status: product.Status,
                    Key: product.Key
                })        
                break
            }
        }
        
        set(ref(db, 'Product/' + uuidv4()), product);
        document.getElementById('closemodal').click()
        back()
    }

    function back(){
        window.history.back()
    }

    return (
        <div className='form-container'>
            <div className="form-group">
                <label for="exampleInputEmail1">Nome do Producto</label>
                <input type="text" onChange={setProductName} className="form-control" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">LAT</label>
                <select class="form-select" onChange={setArea} aria-label="Default select example">
                    <option selected value="Urbanização e Regeneração Urbana">Urbanização e Regeneração Urbana</option>
                    <option value="Recursos Hídricos e Resiliência">Recursos Hídricos e Resiliência</option>
                    <option value="Ambiente e Resíduos Sólidos">Ambiente e Resíduos Sólidos</option>
                    <option value="Educação Primária e Pré-Escolar">Educação Primária e Pré-Escolar</option>
                    <option value="Sustentabilidade">Sustentabilidade</option>
                </select>
            </div>
    
            <div className="form-group">
                <label for="exampleInputEmail1">Estado do Producto</label>
                <select class="form-select" aria-label="Default select example" onChange={setStatus}>
                    <option selected value="Não Iniciado">Não Iniciado</option>
                    <option value="Em progresso">Em progresso</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Concluido">Concluido</option>
                </select>
            </div>
        
            <button type="button"  class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Gravar Producto   </button>
            <button type="button"  onClik={back} className="btn btn-secundary">Descartar</button>

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Confirmação</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Submeter Producto ?</label>
                    </div>
                </form>
                    </div>
                        <div class="modal-footer">
                            <button type="button" id='closemodal' class="btn btn-secondary" data-dismiss="modal">Não</button>
                            <button type="button" onClick={saveProduct} class="btn btn-primary">Sim</button>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default AddProducts