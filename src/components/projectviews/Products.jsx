import React from 'react'
import {db} from '../database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, ref, remove } from "firebase/database"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


function Product (){
   const [products, setProducts] = useState({products:  []}) 
   const history = useHistory()
   const dbRef = ref(db)
   const [project, setProject] = useState()
   const projKey = document.URL.split('=')[1]

   function getProduct(){

        get(child(dbRef, `Product`)).then((snapshot) => {
            let a = []
            if (snapshot.exists()){
                for(let latKey in snapshot.val()){
                    if (snapshot.val()[latKey].ProjectKey === projKey){
                        a.push(
                            snapshot.val()[latKey]
                        )
                    }
                }
            }
            a = sortByArea(a)
            setProducts(a)
        })
    }

   
    useEffect( () => {
        getProject()
        getProduct()

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
            search: `?key=${e.target.id.split('.')[1]}`,
        })
   
    }

    function searchProduct(e){
        
        let a = []
        if (e.target.value === ''){
            getProduct()
        }
        else{
            a = products.filter(element => element.Name.includes(e.target.value))  
            setProducts(a)
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
                    setProducts({projects: snapshot.val()})
        })
        }).catch(() => {
            alert('Erro ao apagar producto')

        })

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
                        <ul id={`${count++}.${products[key].Key}`} >
                            <li id={`${count++}.${products[key].Key}`} >
                                {products[key].Area}
                            </li>
                            <li id={`${count++}.${products[key].Key}`} onClick={gotoMcs}>
                                {products[key].Name}
                            </li>
                            <li id={`${count++}.${products[key].Key}`}>
                                {products[key].Status}
                            </li>
                            <li id={`${count++}.${key}`} onClick={updateProduct}>
                                  <i className="bi bi-pencil" id={`update.${count++}.${key}`}/>
                            </li>
                            <li id={`delete.${count}.${products[key].Key}`} data-toggle="modal" data-target={`#exampleModal${count}`}>
                                 <i className="bi bi-trash" />
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
                </div>
                {values}
            </div>
        </div>
        )
    }

    return buildTable()

}

export default Product