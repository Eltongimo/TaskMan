import React from 'react'
import {db} from '../database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, getDatabase, ref } from "firebase/database"
import TaskRow from '../TaskRow'


class Projects extends React.Component{
    
    constructor(props){
        super(props)
        this.state = this.setState({projects: []})
    }
    
    componentDidMount(){
            const dbRef = ref(db)
           
            get(child(dbRef, `Project`)).then((snapshot) => {
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
               values.push( <TaskRow ProjectName = {this.state.projects[key].ProjectName}
                         LAT = {this.state.projects[key].LAT}
                         DeadLine = {this.state.projects[key].Deadline}
                         />)
            }
        }
        return values
    }

}

export default Projects