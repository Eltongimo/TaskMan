import './Home.css'
import Stricky from './Sticky'
import React from 'react'
import {db} from './database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, ref } from "firebase/database"

function Home  (){

    const [lats, setLats] = useState({})
    const [products, setProducts ] = useState({})

    useEffect( () => {
        const dbRef = ref(db)
           
            get(child(dbRef, `LAT`)).then((snapshot) => {
                    if (snapshot.exists()){
                        setLats(snapshot.val())
                    }
                    else{
                        alert('no data to load from db server')
                    }
                })
            }

    ,[])

    useEffect( () => {
        const dbRef = ref(db)
           
            get(child(dbRef, `Product`)).then((snapshot) => {
                    if (snapshot.exists()){
                        setProducts(snapshot.val())
                    }
                })
            }
    ,[])


    let cards = []
    for(let key in lats){
            let prods = []
            let fullProdsArray = []
            let cont = 0
            for(let prodsKey in products){
                if ( products[prodsKey].Area == lats[key].Description){
                    if (cont < 5 ){
                        prods.push(products[prodsKey])   
                    }
                    cont++
                    fullProdsArray.push(products[prodsKey].Status)
                }
            }
            cards.push(
                <Stricky header={lats[key].Description}
                       products={prods}        
                       fullProds = {fullProdsArray}
                       Key={lats[key].Key}
            />)
    }

    return (
        <div className='home-container'>
            {cards}
        </div>
    )
}

export default Home