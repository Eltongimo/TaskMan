import { db } from "./DatabaseHelper"
import {get,set,child,ref} from 'firebase/database'
import React, { useState } from "react"

function CRUDOperations (){

    const [projects, setProjects] = useState()
    const [project, setProject] = useState(['askdjnaskdj'])


    function getProjects(){
        /*
        get(child(this.dbRef, 'Project')).then( snapshot => {

            if (snapshot.exists()){
                setProjects(snapshot.val())            
            }
        })
        
        return projects
        */
       console.log('Ola Projects')
    }

    
    function getProject(key){

        get(child(this.dbRef, `Project/${key}`)).then( snapshot => {

            if (snapshot.exists()){
                setProject(snapshot.val())            
            }
        })
        return project
    }
}

export default CRUDOperations