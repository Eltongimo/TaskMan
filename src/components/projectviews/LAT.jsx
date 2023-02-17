import React from 'react'
import {db} from '../database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, getDatabase, ref } from "firebase/database"
import TaskRow from '../TaskRow'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


function Lat (){
   const [products, setProducts] = useState({products:  []}) 
   const history = useHistory()
   const dbRef = ref(db)
        
    useEffect( () => {
           
            get(child(dbRef, `Product`)).then((snapshot) => {
                    if (snapshot.exists()){
                        console.log(snapshot.val())
                        setProducts({projects: snapshot.val()})
                    }
                    else{
                        alert('no data to load from db server')
                   }
                })
        }
    ,[])


    function filterProducts(prods){
        let prodArray = []
    
        for(let p in prods.projects){
            
            if (prods.projects[p].LatKey === document.URL.split('=')[1]){
                prodArray.push(prods.projects[p])
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

        function back(){
            window.history.back()
        }
        return( 
        <div className='table-container'>

            <div className='header-container'>
                <i className="bi bi-arrow-left" style={{cursor: 'pointer',
                                                         marginRight: '20px'
                                                     }} 
                onClick={back}/>
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