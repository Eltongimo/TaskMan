import React from 'react'
import {db} from '../database/DatabaseHelper'
import { child, get,ref } from "firebase/database"
import TaskRow from '../TaskRow'


class MacroActivities extends React.Component{
    
    constructor(props){
        super(props)
        this.state = this.setState({macroActivities: []})
    }
    
    componentDidMount(){
            const dbRef = ref(db)
           
            get(child(dbRef, `MacroActivity`)).then((snapshot) => {
                    if (snapshot.exists())
                        this.setState({macroActivities: snapshot.val()})
                    else
                        alert('no data to load from db server')
                    console.log(this.snapshot.val())
                }).finally(snapshot => {
                console.log('finished')
            })
        }

        render(){
        
        var values = []
        
        if (this.state !== null ){
            for(let key in this.state.projects){
               values.push( <TaskRow ProjectName = {this.state.macroActivities[key].Name}
                        />)
            }
        }
        return( 
        <div className='table-container'>
            <div className='header-container'>
                <div className='report-header'>Macro Actividade</div>
            </div>
            {console.log(values)}
        </div>
        )
    }

}

export default MacroActivities