import React from 'react'
import {db} from '../database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, getDatabase, ref } from "firebase/database"
import TaskRow from '../TaskRow'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


function Product (){
   const [products, setProducts] = useState({products:  []}) 

   const history = useHistory()

    useEffect( () => {
        const dbRef = ref(db)
           
            get(child(dbRef, `Product`)).then((snapshot) => {
                    if (snapshot.exists())
                        setProducts({projects: snapshot.val()})
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
                            <li id={`${count++}.${products.projects[key].Key}`}>
                                {products.projects[key].Status}
                            </li>
                            <li id={`${count++}.${products.projects[key].Key}`} >
                                 <i class="bi bi-trash" id={`delete.${count++}.${products.projects[key].Key}`} />
                            </li>
                            <li id={`${count++}.${products.projects[key].Key}`}>
                                  <i class="bi bi-pencil" id={`update.${count++}.${products.projects[key].Name}`}/>
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
                <div className='report-header'>Area</div>
                <div className='report-header'>Nome do Producto</div>
                <div className='report-header'>Estado</div>
                <div className='report-header'>Apagar</div>
                <div className='report-header'>Actualizar</div>
            </div>
            {values}
        </div>
        )
    }

    return buildTable()

}

export default Product