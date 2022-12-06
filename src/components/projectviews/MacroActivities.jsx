import React from 'react'
import {db} from '../database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, getDatabase, ref } from "firebase/database"
import TaskRow from '../TaskRow'

class MacroActivity extends React.Component{
    
    constructor(props){
        super(props)
        this.state = this.setState({products: []})
    }
    
    componentDidMount(){
            const dbRef = ref(db)
           
            get(child(dbRef, `MacroActivity`)).then((snapshot) => {
                    if (snapshot.exists())
                        this.setState({macroactivities: snapshot.val()})
                    else
                        alert('no data to load from db server')
                    console.log(this.state)
               }).finally(snapshot => {
                console.log('finished')
            })
        }

    render(){
        
        var values = []
        
        if (this.state !== null ){
            for(let key in this.state.macroactivities){
               values.push( <TaskRow type='mcs' ProjectName = {this.state.macroactivities[key].Name}
                         />)
            }
        }
        return( 
        <div className='table-container'>
            <div className='header-container'>
                <div className='report-header' style={{'width': '100%',
                                                       'display': 'flex',
                                                       'textAlign': 'center',
                                                       'alignContent': 'center'


            }}>Nome da Macro Actividade</div>
            </div>
            {console.log(values)}
            {values}
        </div>
        )
    }

}

export default MacroActivity