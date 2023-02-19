import React from 'react'
import {db} from '../database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, ref, remove } from "firebase/database"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import ProductPDF from '../ReportsPDF/ProductPDF'

function Product (){
   const [products, setProducts] = useState({products:  []}) 
   const history = useHistory()
   const dbRef = ref(db)
   const [project, setProject] = useState()
   const projKey = document.URL.split('=')[1]
   const [activities, setActivities] = useState()
   const [macroActivities, setMacroActivities] = useState()

   function getProduct(){

        get(child(dbRef, `Product`)).then((snapshot) => {
            let a = {}
            if (snapshot.exists()){
                for(let key in snapshot.val()){
                    if (snapshot.val()[key].ProjectKey ){
                        if (document.getElementById('role').value === 'operacional')
                            a[key] = snapshot.val()[key]
                        else if (document.getElementById('userarea').innerHTML === snapshot.val()[key].Area){
                            a[key] = snapshot.val()[key]
                        }
                    }
                }
            }
            setProducts(a)
        })
    }

    function getMCS(){
        get(child(dbRef, 'MacroActivity')).then(snapshot => {
            if (snapshot.exists()){
                setMacroActivities(snapshot.val())
            }
        })
    }

    function getActivities(){
        get(child(dbRef, 'Activity')).then(snapshot => {
            if (snapshot.exists()){
                setActivities(snapshot.val())
            }
        })
    }

    useEffect( () => {
        getProject()
        getProduct()
        getMCS()
        getActivities()
    },[])

    function sortByArea(a){
        
        a.sort((a,b) => {
            let fa = a.Area,
            fb = b.Area

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        })
        return a
    }

    function getProject (){
        get(child(dbRef, `Project/${projKey}`)).then((snapshot) => {
            if (snapshot.exists())
                setProject(snapshot.val())
        })
        return project
    }

    function gotoMcs(e){
        history.push({
            pathname: '/macroactivities',
            search: `?key=${e.target.id}`,
        })
    }

    function searchProduct(e){
        
        let a = []
        if (e.target.value === ''){
            getProduct()
        }
        else{

            let array = []
            for( let key in products){
                array.push(products[key])
            }

            const a = array.filter(element => element.Name.toLowerCase().includes(e.target.value.toLowerCase()))
            const b = {}
            for (let key2 in a){
                for (let key3 in products ){
                    if ( a[key2].Name === products[key3].Name){
                       b[key3] = a[key2]
                       break 
                    }
                }
            }
            setProducts(b)
        }
    }

    function updateProduct(e){
        history.push({
            pathname: '/updateproduct',
            search: `?key=${e.target.id.split('.')[2]}`,
        })
    }

    function deleteProduct(e){

        document.getElementById(`${e.target.id}`).click()

        remove(ref(db, `Product/${e.target.value}`)).then(() => {
            alert('Producto removido com sucesso')
            const dbRef = ref(db)
            get(child(dbRef, `Product`)).then((snapshot) => {
                if (snapshot.exists())
                    setProducts(snapshot.val())
        })
        }).catch(() => {
            alert('Erro ao apagar producto')

        })
    }
    
    function createPDF(e){
         ProductPDF (products[e.target.id], macroActivities, activities)    
    }

    function buildTable(){
        
        var values = []
        let count = 0

        if (products !== null ){
            for(let key in products){
               values.push(
                <button 
                    style={{background: 'transparent',
                            border: 'none',
                            width: '100%',
                            outline: 'none',
                        }}
                >
                    <div className='rows-report' id={`${count++}.${products[key].Key}`} >
                        <div className='colmns-report'>
                        <ul >
                            <li >
                                {products[key].Area}
                            </li>
                            <li onClick={gotoMcs} id={`${products[key].Key}`} >
                                {products[key].Name}
                            </li>
                            <li >
                                {products[key].Status}
                            </li>
                            <li id={`${count++}.${key}`} >
                                  <i className="bi bi-pencil" onClick={updateProduct} id={`update.${count++}.${key}`}/>
                            </li>
                            <li id={`delete.${count}.${products[key].Key}`} data-toggle="modal" data-target={`#exampleModal${count}`}>
                                 <i className="bi bi-trash" />
                            </li>
                            <li id={`${count++}.${key}`}>
                                        <i className="bi bi-file-earmark-arrow-down" style={{
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
                
                <div className="modal fade" id={`exampleModal${count}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <div className="form-group" >
                                    <label style={{textAlign: 'left'}} for="exampleInputEmail1">Apagar Producto ?</label>
                                </div>
                            </form>
                                </div>
                                    <div className="modal-footer">
                                        <button type="button" id={`${count}`} className="btn btn-secondary" data-dismiss="modal">Não</button>
                                        <button type="button" value ={key} id={count} onClick={deleteProduct} className="btn btn-primary">Sim</button>
                                    </div>
                                </div>
                            </div>
                        </div>  
                </button>
            )
            }
        }


        function add(e){
            history.push({
                pathname: '/addproducts',
                search: `?key=${document.URL.split('/')[3].split('=')[1]}`,
            })
        }

        function back(e){
            window.history.back()
        }

        return( 
        <div className='product-container'
        >
            <div className='title' id='title'>
              <i className="bi bi-arrow-left" style={{cursor: 'pointer',
                                                         marginRight: '20px'
                }} onClick={back}/>
                <input type='tex' className="form-control" onChange={searchProduct} id="search" aria-describedby="emailHelp" placeholder="Procurar.."/>
                <button type="button" className="btn btn-light" id='addbutton' onClick={add}>Adicionar</button>
            </div>
            
            <div className='table-container'>
                <div className='header-container'>
                    <div className='report-header'>Area</div>
                    <div className='report-header'>Nome do Producto</div>
                    <div className='report-header'>Estado</div>
                    <div className='report-header'>Actualizar</div>
                    <div className='report-header'>Apagar</div>
                    <div className='report-header'>Gerar Relatorio</div>
                </div>
                {values}
            </div>
        </div>
        )
    }

    return buildTable()

}

export default Product