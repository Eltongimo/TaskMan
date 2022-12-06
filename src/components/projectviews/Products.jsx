import React from 'react'
import {db} from '../database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, getDatabase, ref } from "firebase/database"
import TaskRow from '../TaskRow'


class Product extends React.Component{
    
    constructor(props){
        super(props)
        this.state = this.setState({products: []})
    }
    
    componentDidMount(){
            const dbRef = ref(db)
           
            get(child(dbRef, `Product`)).then((snapshot) => {
                    if (snapshot.exists())
                        this.setState({projects: snapshot.val()})
                    else
                        alert('no data to load from db server')
            }).finally(snapshot => {
                console.log('finished')
            })
        }

    render(){
        
        var values = []
        
        if (this.state !== null ){
            for(let key in this.state.projects){
               values.push( <TaskRow ProjectName = {this.state.projects[key].Name}
                         LAT = {this.state.projects[key].Area}
                         DeadLine = {this.state.projects[key].Status}
                         />)
            }
        }
        return( 
        <div className='table-container'>
            <div className='header-container'>
                <div className='report-header'>Area</div>
                <div className='report-header'>Nome do Producto</div>
                <div className='report-header'>Estado</div>
            </div>
            {values}
        </div>
        )
    }

}

export default Product