import React from 'react'
import {db} from '../database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, getDatabase, ref } from "firebase/database"
import TaskRow from '../TaskRow'


class Activities extends React.Component{
    
    constructor(props){
        super(props)
        this.state = this.setState({activities: []})
    }
    
    componentDidMount(){
            const dbRef = ref(db)
           
            get(child(dbRef,`Activitiy`)).then((snapshot) => {
                    if (snapshot.exists())
                        this.setState({activities: snapshot.val()})
                    else
                        alert('no data to load from db server')
            }).finally(snapshot => {
                console.log('finished')
            })
        }

    render(){
        
        var values = []
        
        if (this.state !== null ){
            for(let key in this.state.activities){
               values.push( <TaskRow ProjectName = {this.state.projects[key].Name}
                         LAT = {this.state.projects[key].Description}
                         DeadLine = {this.state.projects[key].Comments}
                         />)
            }
        }
        return( 
        <div className='table-container'>
            <div className='header-container'>
                <div className='report-header'>Nome da Actividade</div>
                <div className='report-header'>Descrição</div>
                <div className='report-header'>Comentarios</div>
            </div>
            {values}
        </div>
        )
    }

}

export default Activities