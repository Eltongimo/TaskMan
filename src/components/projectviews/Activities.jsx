import React from 'react'
import {db} from '../database/DatabaseHelper'
import { child, get, ref, remove} from "firebase/database"
import {useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import './Activity.css'
import ActivitySinglePDF from '../ReportsPDF/ActivitySinglePDF'
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import { getStorage } from 'firebase/storage'
import {Storage} from '../database/Storage'



function Activities (){
    
    const [activity, setActivity ] = useState([])
    const [keys, setKeys ] = useState([])
    const history =  useHistory()
    const listOfImages = storageRef(Storage, 'Activity/')
    const [imageList, setImageList] = useState([])
    
    const dbRef = ref(db)

    useEffect(() => {
        getActivities()
    },[])


    function getActivities(){
        
        get(child(dbRef,`Activity`)).then((snapshot) => {
            
            if (snapshot.exists())
            {
                let acts = []
                let aa = []
                const vals = snapshot.val()
            
                for (let a in vals){
                
                    if (document.URL.split('=')[1] == vals[a].MacroActivityKey){
                            acts.push(vals[a])
                            aa.push(a)
                    }
                    setActivity(acts)
                    setKeys(aa)
                } 
                listAll(listOfImages).then((response) => {
                    let urls = []
                    response.items.forEach(item => getDownloadURL(item).then(url =>{
                        for (let aKey in activity){
                        //    console.log(url.includes(activity[aKey].Key))
                            if (url.includes(activity[aKey].Key))
                                urls.push(url)
                        }
                    }))
                    setImageList(urls)
                })
            }else{
                alert('Sem actividades para carregar')
            }
        })
        console.log(imageList)

    }
    
    function handleButtonEvent(e){

        let productKey = e.target.id
        let key  = productKey.split('.')
 
        if (key[0] === 'update'){
            history.push({
                pathname: '/updateactivity',
                search: `?key=${key[2]}`,
            })    
        } 
   }

   // create single page report with details from acticit
   function createPDF(e){
        
        console.log(imageList)
        console.log(imageList[e.target.id])

       ActivitySinglePDF(activity[e.target.id],e.target.value)
    }

    function deleteActivity(e){
        
        remove(ref(db, `Activity/${e.target.value}`)).then(
            () => {
                document.getElementById(`closemodal${e.target.id}`).click()
                alert('Actividade Apagada com sucesso')
                getActivities()
            }
        ).catch(() => {
            alert('Erro ao apagar a actividade')
        })
    }

    /*
    function filterImageAndActivity(){

        let a = []

        for (let aKey in activity){

            for (let imgKey in imageList){
                if (imageList[imgKey].includes(activity[aKey].Key)){
                    a[aKey] = imageList[imgKey]
                }
            }
        }
        return a
    }
    */
    function buildTable (){
        var values = []
        let count = 0
        
        for(let key in activity){
              values.push( 
                <div>
                    <button onClick={handleButtonEvent}
                        style={{background: 'transparent',
                                border: 'none',
                                width: '100%',
                                outline: 'none',
                            }}
                        >
                        <div className='rows-report' id={`${count++}.${activity[key].Key}`}>
                            <div className='colmns-report'id={`${count++}.${activity[key].Key}`} >
                                <ul id={`${count++}.${activity[key].Key}`}>
                                   
                                    <li id={`${count++}.${activity[key].Key}`}>
                                        {activity[key].Name}
                                    </li>
                                    
                                    <li className='project-icons' id={`${count++}.${activity[key].Key}`}>
                                        <i className="bi bi-pencil" id={`update.${count++}.${key}`}
                                          />
                                    </li>

                                    <li className='project-icons' id={`${count++}.${activity[key].Key}`}>
                                        <i className="bi bi-trash" id={`delete.${count++}.${activity[key].Key}`} data-toggle="modal" data-target={`#exampleModal${count}`} />
                                    </li>
                                
                                    <li className='project-icons' id={`${count++}`} >
                                        <i className="bi bi-info" data-toggle="modal" data-target={`#exampleModal${key}`}/>                                 </li> 
                                    <li id={`${count++}`} >
                                        <i id={`${key}`}className="bi bi-file-earmark-arrow-down" style={{
                                                fontSize: '1.3rem',
                                                color: 'blue'
                                            }}
                                            onClick={createPDF}
                                            id={`${key}`}
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
                                <h5 className="modal-title" id="exampleModalLabel">Confirmação </h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                 Apagar Actividade ?
                            </div>
                            <div className='modal-footer'>
                                 <button type="button" id={`closemodal${count}`} className="btn btn-secondary" data-dismiss="modal">Não</button>
                                 <button type='button'  id={count} className='btn btn-primary' value= {keys[key]} onClick={deleteActivity}> Sim</button>
                            </div>
                        </div>
                    </div>
                </div >
                    

                    <div className="modal fade" id={`exampleModal${key}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                <label>Actividade </label> <div className='activity-detail'>{activity[key].Name} </div> 
                                            </li> 
                                            
                                            <li className='modal-details-row'>
                                                <label>Descrição </label> <div className='activity-detail'>{activity[key].Description} </div> 
                                            </li> 
                                            <li className='modal-details-row'>
                                                <label>Lugar </label> <div className='activity-detail'>{activity[key].Location} </div> 
                                            </li> 
                                            <li className='modal-details-row'>
                                                <label>Data de Inicio </label> <div className='activity-detail'>{activity[key].StartTime} </div> 
                                            </li> 
                                            <li className='modal-details-row'>
                                                <label>Data Final </label> <div className='activity-detail'>{activity[key].DeadLine} </div> 
                                            </li> 
                                            <li className='modal-details-row'>
                                                <label>Hora </label> <div className='activity-detail'>{activity[key].Time} </div> 
                                            </li > 
                                            
                                            <li className='modal-details-row'>
                                                <label>Duração </label> <div className='activity-detail'>{activity[key].Duration} </div> 
                                            </li> 
                                            
                                            <li className='modal-details-row'>
                                                <label>Homens </label>  <div className='activity-detail'>{activity[key].Men} </div> 
                                            </li > 
                                            
                                            <li className='modal-details-row'>
                                                <label>Mulher </label> <div className='activity-detail'>{activity[key].Women} </div> 
                                            </li> 
                                            
                                            <li className='modal-details-row'>
                                                <label>Meninos </label> <div className='activity-detail'>{activity[key].Boys} </div> 
                                            </li> 
                                            
                                            <li className='modal-details-row'>
                                                <label>Meninas </label> <div className='activity-detail'>{activity[key].Girls} </div> 
                                            </li> 
                                            
                                            <li className='modal-details-row'>
                                                <label>Esperado </label>  <div className='activity-detail'>{activity[key].Waited} </div> 
                                            </li> 
                                            
                                            <li className='modal-details-row'>
                                                <label>Etereonidade </label> <div className='activity-detail'>{activity[key].Heterogenity} </div> 
                                            </li> 
                                            
                                            <li className='modal-details-row'>
                                                <label>Proximos passos </label> <div className='activity-detail'>{activity[key].NextSteps} </div> 
                                            </li> 
                                            
                                            <li className='modal-details-row'>
                                                <label>Comentarios </label>  <div className='activity-detail'>{activity[key].Comments} </div> 
                                            </li>
                                            
                                        {/*  <li className='modal-details-row'>
                                                <label>Imagem </label> 
                                                 <img src={img[key]} alt='Sem Imagem para Carregar'/> 
                                        </li> */}
                                        </ul>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return values
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
                <div className='report-header'>Actividade</div>
                <div className='report-header'>Editar</div>
                <div className='report-header'>Apagar</div>
                <div className='report-header'>Mostrar</div>
                <div className='report-header'>Relatorio</div>
                
                <i className="bi bi-info-circle-fill"
                            style={{'cursor':'pointer','fontSize': '2rem', 'color': 'white'}}
                            />  
            </div>
                {buildTable()}
        </div>
    )
}

export default Activities