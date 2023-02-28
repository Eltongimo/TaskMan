import './Dashboard.css'
import Stricky from './Sticky'
import React from 'react'
import {db} from './database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, ref } from "firebase/database"

function Dashboard  (){

    const [lats, setLats] = useState({})
    const [products, setProducts ] = useState({})
    const [project, setProject] = useState({})
    const dbRef = ref(db)

    useEffect( () => {
        getProject()
        getLATs()
        getProducts()
    },[])

    function getProject(){

        get(child(dbRef, `Project/${document.URL.split('=')[1]}`)).then((snapshot) => {

            if (snapshot.exists())
                setProject(snapshot.val())
        })
    }

    function getLATs(){
        let a = []
        get(child(dbRef, `LAT`)).then((snapshot) => {
                if (snapshot.exists()){
                    setLats(snapshot.val())
                }
            })
        }
    
    function getProducts(){
        get(child(dbRef, `Product`)).then((snapshot) => {
            if (snapshot.exists()){
                setProducts(snapshot.val())
            }
        })
    }

    function buildCards(){
        
        let cards = []
        for(let key in lats){
            let prods = []
            let fullProdsArray = []
            let cont = 0
            let signal = false
            for(let prodsKey in products){
                if ( products[prodsKey].Area == lats[key].Description && lats[key].ProjectKey === project.Key){
                    if (cont < 5 ){
                        prods.push(products[prodsKey])   
                    }
                    cont++
                    fullProdsArray.push(products[prodsKey].Status)
                    signal = true
                }
            }

            if (signal ){
                
                let row = ''

                if (cont % 2 !== 0)
                    row = 'row-1'
                else
                    row = 'row-2'
                    
                cards.push(
                    <Stricky rownum={row} header={lats[key].Description}
                        products={prods}        
                        fullProds = {fullProdsArray}
                        Key={lats[key].Key}
                />)
            }
            signal = false
        }

        return cards
    }

    function back (e){
        window.history.back()
    }

    function add(){

    }

    return (
        <div  style={{
            border: 'solid #ccc red '
        }}>
             <div className='title' id='title'>
              <i className="bi bi-arrow-left" style={{cursor: 'pointer',
                                                         marginRight: '20px'
                                                     }} 
                onClick={back}/>
            </div>
            <div className='home-container'>
                {buildCards()}
            </div>
        </div>
    )
}

export default Dashboard