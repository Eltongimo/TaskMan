import React from 'react'
import {db} from '../database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, getDatabase, ref } from "firebase/database"
import TaskRow from '../TaskRow'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


function Lat (){
   const [products, setProducts] = useState({products:  []}) 

   const history = useHistory()

    useEffect( () => {
        const dbRef = ref(db)
           
            get(child(dbRef, `Product`)).then((snapshot) => {
                    if (snapshot.exists()){
                        setProducts({projects: snapshot.val()})
                    }
                    else{
                        alert('no data to load from db server')
                   }
                })
        }
    ,[])

    function handleButtonEvent(e){
       
       let productKey = e.target.id
       let key  = productKey.split('.')
       
       history.push({
        pathname: '/macroactivities',
        search: `?key=${key[1]}`,
      })
    }

    function filterProducts(prods){
        let prodArray = []
    
        for(let p in prods.projects){
            
            if (prods.projects[p].LatKey === document.URL.split('=')[1]){
                prodArray.push(prods.projects[p])
                console.log(true)
             }
        }
        return prodArray
    }

    function convertStatusToPercentage(percentage){

        if (percentage === 'Não Iniciado'){
            percentage = 0
        }else if (percentage === 'Em progresso'){
            percentage = 0.5
        }else if (percentage === 'Cancelado'){
            percentage = 0
        }else if (percentage === 'Concluido'){
            percentage = 1
        }
        return percentage
    }

    function buildTable(){
        
        let values = []
        let prods = filterProducts(products)
        
        if (products !== null ){
            for(let index in prods){
                values.push(
                    <div className='rows-report' >
                        <div className='colmns-report'>
                        <ul >
                            <li >
                                {prods[index].Area}
                            </li>
                            <li >
                                {prods[index].Name}
                            </li>
                            <li >
                                {prods[index].Status}
                            </li>
                            <li>
                                {convertStatusToPercentage(prods[index].Status) * 100}%
                            </li>
                        </ul>
                    </div>
                </div>
                )
            }
        }
        return( 
        <div className='table-container'>
            <div className='header-container'>
                <div className='report-header'>Area</div>
                <div className='report-header'>Nome do Producto</div>
                <div className='report-header'>Estado</div>
                <div className='report-header'>%</div>
            </div>
            {values}
        </div>
        )
    }

    return buildTable()
}

export default Lat