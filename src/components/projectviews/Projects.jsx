import React from 'react'
import {db} from '../database/DatabaseHelper'
import { child, get, getDatabase, ref } from "firebase/database"
import TaskRow from '../TaskRow'
import {Link} from 'react-router-dom'



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
            })
        }
    
    render(){
        
        var values = []
        
        if (this.state !== null ){
            for(let key in this.state.projects){
               values.push(
                <Link to='/products'>
                    <TaskRow ProjectName = {this.state.projects[key].ProjectName}
                            LAT = {this.state.projects[key].LAT}
                            DeadLine = {this.state.projects[key].Deadline}
                            />
                </Link>)    
            }
        }
        return( 
        <div className='table-container'>
            <div className='header-container'>
                <div className='report-header'>LAT</div>
                <div className='report-header'>Nome do Projecto</div>
                <div className='report-header'>DeadLine Date</div>
            </div>
            {values}
        </div>
        )
    }

}

export default Projects