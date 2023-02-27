import {get,set,child,ref,update} from 'firebase/database'
import React, { useState } from "react"
import {db} from './DatabaseHelper'
import { Component } from 'react'

class CRUDOperations extends Component{

    constructor(){
        this.state = { users: 

                            function getUsers(){

                                get(child(ref(db), `User`)).then((snapshot) => {
                                    if (snapshot.exists())
                                        this.setState({
                                            users: snapshot.val()
                                        })
                                    else
                                        this.setState({users: null})
                                })
                        
                                console.log(this.state)
                                return this.state.users
            }
        }
    }
  
}

export default CRUDOperations