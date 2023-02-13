import React from 'react'
import {db} from './database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, ref } from "firebase/database"
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import './ShowDashboard.css'

function ShowDashboard(){
    const history = useHistory()

    const [projects, setProjects ] = useState()
    const [lats, setLats ] = useState()
    const dbRef = ref(db)
    
    
    function getProject(){
        get(child(dbRef, `Project`)).then((snapshot) => {
            if (snapshot.exists()){
                setProjects(snapshot.val())
            }
            else{
                alert('no data to load from db server')
            }
        })

    }

    useEffect( () => {
        getProject()
           
        get(child(dbRef, `LAT`)).then((snapshot) => {
            if (snapshot.exists()){
                let a = []    
                for (let projKeys in projects ){
                    for (let latKey in snapshot.val()){
                        if (projects[projKeys].Key === snapshot.val()[latKey].ProjectKey){
                            a.push(
                                snapshot.val()[latKey]
                            )
                        }
                    }
                }
                setLats(a)
            }
            else{
                alert('no data to load from db server')
            }
        })

    }
    ,[])

    function gotoDashboardProduct(e){
        history.push({
            pathname: '/dashboard',
            search: `?key=${e.target.id}`
        })
    }

    let cards = []
    let count = 0
    for(let key in projects){
            let la = []
            count = 0
            for (let latKey in lats){
                
                if (lats[latKey].ProjectKey === projects[key].Key){
                    la.push (
                        <div className='card-content'>
                            {lats[latKey].Description}
                        </div>
                    )
                count++
                }

            }
                        
            cards.push(
                <div class="col-sm">
                     <div className="card" style={{
                         marginTop: '15px',
                         textAlign: 'justify'
                        }}>
                             <h5 className="card-header"
                             style={{
                                 color: 'white', 
                                 background: '#001489'
                             }}>
                                 {projects[key].ProjectName}
                             </h5>
                         <div className="card-body">
                             <h5 className="card-title">Linha de Acção Tematica</h5>
                               {la}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr', 
                                marginTop: '10px'  
                            }}>
                                <a  className="btn btn-primary" onClick={gotoDashboardProduct} id={`${key}`}>
                                    Ver Projecto
                                </a> 
                                <h5 >Total : {count} </h5>
                            </div>
                       </div>
                     </div>
                 </div>
            )
    }

    return (
        <div className='home-container'>
            {cards}
        </div>
    )
}

export default ShowDashboard