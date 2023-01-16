import React from 'react'
import {db} from '../database/DatabaseHelper'
import { child, get, ref } from "firebase/database"
import TaskRow from '../TaskRow'
import {useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import './Activity.css'
import ActivitySinglePDF from '../ReportsPDF/ActivitySinglePDF'

function Activities (){
    
        const [activity, setActivity ] = useState({activities: []})
        const history =  useHistory()
        

    
    useEffect(() => {
            const dbRef = ref(db)
            
            get(child(dbRef,`Activity`)).then((snapshot) => {
                    if (snapshot.exists())
                    {
                        let acts = []
                        const vals = snapshot.val()

                     /*   for (let a in vals){
                            if (document.URL.split('=')[1] == vals[a].MacroActivityKey){
                                acts.push(vals[a])
                            }
                        }*/
                        setActivity({activities: vals})
                    }            
                    else{
                        alert('Sem actividades para carregar')
                    }
            })
        },[]
    )

    function handleButtonEvent(e){

        let productKey = e.target.id
        let key  = productKey.split('.')
 
        if (key[0] === 'delete'){
         alert('deleting')
         }
         else if (key[0] === 'update'){
             alert('updating')
         } 
   }

   // create single page report with details from acticit
   function createPDF(e){

        ActivitySinglePDF(activity.activities[e.target.id.split('.')[1]])
    
    }


    function buildTable (){
        
        var values = []

        if (activity.activities !== null ){
            let count = 0
            let index = 0

            for(let key in activity.activities){

               values.push( 
                <div>
                    <button onClick={handleButtonEvent}
                        style={{background: 'transparent',
                                border: 'none',
                                width: '100%',
                                outline: 'none',
                            }}
                        >
                        <div className='rows-report' id={`${count++}.${activity.activities[key].Key}`}>
                            <div className='colmns-report'id={`${count++}.${activity.activities[key].Key}`} >
                                <ul id={`${count++}.${activity.activities[key].Key}`}>

                                    <li id={`${count++}.${activity.activities[key].Key}`}>
                                        {++index}
                                    </li>
                                   
                                    <li id={`${count++}.${activity.activities[key].Key}`}>
                                        {activity.activities[key].Name}
                                    </li>
                                    
                                    <li className='project-icons' id={`${count++}.${activity.activities[key].Key}`}>
                                        <i className="bi bi-pencil" id={`update.${count++}.${activity.activities[key].Key}`}
                                          />
                                    </li>

                                    <li className='project-icons' id={`${count++}.${activity.activities[key].Key}`}>
                                        <i className="bi bi-trash" id={`delete.${count++}.${activity.activities[key].Key}`} 
                                          
                                        />
                                    </li>
                                    
                                    <li className='project-icons' data-toggle="modal" id={`${count}`} >
                                        <i className="bi bi-info" data-toggle="modal" data-target={`#exampleModal${count}`}
                                          
                                        />
                                    </li>
                                    <li id={`${count + 1}.${key}`}>
                                        <i class="bi bi-file-earmark-arrow-down" style={{
                                                fontSize: '1.3rem',
                                                color: 'blue'
                                            }}
                                            onClick={createPDF}
                                            id={`${count + 10}.${key}`}
                                        />   
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </button>
                    <div className="modal fade" id={`exampleModal${count}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Detalhes da actividade</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <form>
                                <ul >
                                    <li className='modal-details-row'>
                                        <label>Actividade </label> <div className='activity-detail'>{activity.activities[key].Name} </div> 
                                    </li> 
                                    
                                    <li className='modal-details-row'>
                                        <label>Descrição </label> <div className='activity-detail'>{activity.activities[key].Description} </div> 
                                    </li> 
                                    <li className='modal-details-row'>
                                        <label>Lugar </label> <div className='activity-detail'>{activity.activities[key].Location} </div> 
                                    </li> 
                                    <li className='modal-details-row'>
                                        <label>Data de Inicio </label> <div className='activity-detail'>{activity.activities[key].StartTime} </div> 
                                    </li> 
                                    <li className='modal-details-row'>
                                        <label>Data Final </label> <div className='activity-detail'>{activity.activities[key].DeadLine} </div> 
                                    </li> 
                                    <li className='modal-details-row'>
                                        <label>Hora </label> <div className='activity-detail'>{activity.activities[key].Time} </div> 
                                    </li > 
                                    
                                    <li className='modal-details-row'>
                                        <label>Duração </label> <div className='activity-detail'>{activity.activities[key].Duration} </div> 
                                    </li> 
                                    
                                    <li className='modal-details-row'>
                                        <label>Homens </label>  <div className='activity-detail'>{activity.activities[key].Men} </div> 
                                    </li > 
                                    
                                    <li className='modal-details-row'>
                                        <label>Mulher </label> <div className='activity-detail'>{activity.activities[key].Women} </div> 
                                    </li> 
                                    
                                    <li className='modal-details-row'>
                                        <label>Meninos </label> <div className='activity-detail'>{activity.activities[key].Boys} </div> 
                                    </li> 
                                    
                                    <li className='modal-details-row'>
                                        <label>Meninas </label> <div className='activity-detail'>{activity.activities[key].Girls} </div> 
                                    </li> 
                                    
                                    <li className='modal-details-row'>
                                        <label>Esperado </label>  <div className='activity-detail'>{activity.activities[key].Waited} </div> 
                                    </li> 
                                    
                                    <li className='modal-details-row'>
                                        <label>Etereonidade </label> <div className='activity-detail'>{activity.activities[key].Heterogenity} </div> 
                                    </li> 
                                    
                                    <li className='modal-details-row'>
                                        <label>Proximos passos </label> <div className='activity-detail'>{activity.activities[key].NextSteps} </div> 
                                    </li> 
                                    
                                    <li className='modal-details-row'>
                                        <label>Comentarios </label>  <div className='activity-detail'>{activity.activities[key].Comments} </div> 
                                    </li> 
                                </ul>
                                </form>
                                </div>
                                </div>
                            </div>
                        </div>
                </div>
                )
            }
        }

        function add(e){
            history.push({
                pathname: '/addactivities',
                search: `?key=${document.URL.split('/')[3].split('=')[1]}`,
            })
        
        }

        function back(e){
            window.history.back()
        }

        return( 
        <div classNameName='table-container'>
             <div className='title' id='title'>
              <i className="bi bi-arrow-left" style={{cursor: 'pointer',
                                                         marginRight: '20px'
                }} onClick={back}/>
                <input type='tex' className="form-control" id="search" aria-describedby="emailHelp" placeholder="Procurar.."></input>
                <button type="button" className="btn btn-light" id='addbutton' onClick={add}>Adicionar</button>
            </div>
           
            <div className='header-container'>
                 <div className='report-header'>Nr</div>
                <div className='report-header'>Actividade</div>
                <div className='report-header'>Editar</div>
                <div className='report-header'>Apagar</div>
                <div className='report-header'>Mostrar</div>
                <div className='report-header'>Relatorio</div>
                
                <i className="bi bi-info-circle-fill"
                              style={{'cursor':'pointer','fontSize': '2rem', 'color': 'white'}}
                              />  
            </div>
            {values}
        </div>
        )
    }

    return buildTable()

}

export default Activities