import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {db} from '../database/DatabaseHelper'
import {ref,get,child,update} from 'firebase/database'

function UpdateProduct(){

    const [product, setProduct] = useState({
        Area: '',
        LatKey: '',
        Name: '',
        ProjectKey: '',
        Status: '',
        Key: ''
    })

    const [lats, setLats] = useState()

    const [nodeKey, setNodeKey] = useState('')
    const dbRef = ref(db)
    
    function getLats(){
        get(child(dbRef, `LAT`)).then((snapshot) => {
            if (snapshot.exists()){
                setLats(snapshot.val())
            }
        })
    }

    useEffect( () => {
        getLats()
        get(child(dbRef, `Product`)).then((snapshot) => {
            if (snapshot.exists())
                for (let key in snapshot.val())
                    if (document.URL.split('=')[1] === snapshot.val()[key].Key){
                        setProduct(snapshot.val()[key])
                        setNodeKey(key)
                    }
        })},[])

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
        setProduct({
            Area: e.target.value,
            LatKey: product.LatKey,
            Name: product.Name,
            ProjectKey: product.ProjectKey,
            Status: product.Status,
            Key: product.Key
        })
    }

    function updateProduct (e){
        const dbRef = ref(db)

        update(child(dbRef, `Product/${nodeKey}`),product).then(() => {
            alert('Producto Actualizado com Sucesso')
        }).catch(() => {
            alert('Erro ao actualizar o Producto')
        })
        window.history.back()
        document.getElementById('closemodal').click()
    }

    function back(){
        window.history.back()
    }

    function generateLATS(){
        let a = []

        console.log(product)
        for (let key in lats){
            a.push(<option value={lats[key].Description}> {lats[key].Description} </option>)
        }
        return a
    }

    function setStates(){

        let a = []

        if (product.Status === 'Não Iniciado' ){
            a.push(<option selected value="">Não Iniciado</option>)
            a.push(<option value="Em progresso">Em progresso</option>)
            a.push(<option value="Cancelado">Cancelado</option>)
            a.push(<option value="Concluido">Concluido</option>)
        } else if (product.Status === 'Em progresso'){
            a.push(<option selected value="Em progresso">Em progresso</option>)
            a.push(<option value="">Não Iniciado</option>)
            a.push(<option value="Cancelado">Cancelado</option>)
            a.push(<option value="Concluido">Concluido</option>)
        }else if ( product.Status === 'Cancelado'){
            a.push(<option selected value="Cancelado">Cancelado</option>)
            a.push(<option  value="Em progresso">Em progresso</option>)
            a.push(<option value="">Não Iniciado</option>)
            a.push(<option value="Concluido">Concluido</option>)
        }else if (product.Status === 'Concluido'){
            a.push(<option selected value="Concluido">Concluido</option>)
            a.push(<option value="Cancelado">Cancelado</option>)
            a.push(<option value="Em progresso">Em progresso</option>)
            a.push(<option value="">Não Iniciado</option>)
        }
        return a
    }
    
    return (    
        <div className='form-container'>
              <div className='title'> 
                <div className='back-icon'>
                    <i className="bi bi-arrow-left" style={{cursor: 'pointer',
                                                                    marginRight: '20px'
                        }} onClick={back}/>
                </div>
                <div className='form-title'>
                    Actualizar Producto
                </div>
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Nome do Producto</label>
                <input type="text" value={product.Name} onChange={setProductName} className="form-control" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">LAT</label>
                <select className="form-select" value={product.Area} onChange={setArea} aria-label="Default select example">
                    {generateLATS()}
                </select>
            </div>
    
            <div className="form-group">
                <label for="exampleInputEmail1">Estado do Producto</label>
                <select className="form-select" aria-label="Default select example" onChange={setStatus}>
                    {setStates()}
                </select>
            </div>
        
            <button type="button"  className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Actualizar   </button>
            <button type="button"  onClik={back} className="btn btn-secundary">Descartar</button>

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
                        <label for="exampleInputEmail1">Actualizar Producto ?</label>
                    </div>
                </form>
                    </div>
                        <div className="modal-footer">
                            <button type="button" id='closemodal' className="btn btn-secondary" data-dismiss="modal">Não</button>
                            <button type="button" onClick={updateProduct} className="btn btn-primary">Sim</button>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default UpdateProduct