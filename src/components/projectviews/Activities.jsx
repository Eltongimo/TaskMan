import React from 'react'
import {db} from '../database/DatabaseHelper'
import { child, get, ref } from "firebase/database"
import TaskRow from '../TaskRow'


class Activities extends React.Component{
    
    constructor(props){
        super(props)
        this.state = this.setState({activities: []})
    }
    
    componentDidMount(){
            const dbRef = ref(db)
            
            get(child(dbRef,`Activity`)).then((snapshot) => {
                    if (snapshot.exists())
                    {
                        let acts = []
                        const vals = snapshot.val()

                        for (let a in vals){
                            console.log(vals[a])
                            if (document.URL.split('=')[1] == vals[a].MacroActivityKey){
                                acts.push(vals[a])
                            }
                        }
                    }            
                    else{
                        alert('Sem actividades para carregar')
                    }
            }).finally(snapshot => {
                console.log('finished')
            })
        }

    render(){
        
        var values = []
        console.log(`Activities ${this.state}`)

        if (this.state !== null ){
            for(let key in this.state.activities){
                
               values.push( <TaskRow ProjectName = {this.state.activities[key].Name}
                         LAT = {this.state.activities[key].Description}
                         DeadLine = {this.state.activities[key].Comments}
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