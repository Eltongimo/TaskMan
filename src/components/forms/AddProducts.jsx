import React from 'react'
import './AddProducts.css'
import { useState } from 'react'
import { useEffect } from 'react'
import {db} from '../database/DatabaseHelper'
import {ref,get,child} from 'firebase/database'

function AddProducts(){

    const [product, setProduct] = useState({
        Area: '',
        LatKey: '',
        Name: '',
        ProductKey: '',
        Status: ''
    })

    const [lat, setLats] = useState({lats: []})
    var op = []
    
    useEffect( () => {
        const dbRef = ref(db)
            get(child(dbRef, `LAT`)).then((snapshot) => {
                    if (snapshot.exists()){
                        setLats({lats: snapshot.val()})
                        for (let key in lat.lats){
                            op.push(
                                <option value={lat.lats[key].Description} id={lat.lats[key].key}>{lat.lats[key].Description}</option>
                            )
                        }
                    }
                    else{
                        alert('no data to load from db server')
                   }
                })
        }
    ,[])

    function setProductName(e){
        
        setProduct({
            Area: product.Area,
            LatKey: product.LatKey,
            Name: e.target.value,
            ProductKey: product.ProductKey,
            Status: product.Status
        })
    }

    return (
        <div className='form-container'>
            <div className="form-group">
                <label for="exampleInputEmail1">Nome do Producto</label>
                <input type="text" onChange={setProductName} className="form-control" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
            <select class="form-select" aria-label="Default select example">
                <option selected>Open this select menu</option>
                {console.log(op)}
                </select>
            </div>
        
            <button type="button"  class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">
                Gravar Projecto         </button>
            <button type="button" className="btn btn-light">Descartar</button>

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Submeter Projecto ?</label>
                    </div>
                </form>
                    </div>
                        <div class="modal-footer">
                            <button type="button" id='closemodal' class="btn btn-secondary" data-dismiss="modal">Não</button>
                            <button type="button" class="btn btn-primary">Sim</button>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default AddProducts