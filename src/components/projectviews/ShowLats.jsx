import React, { useEffect } from 'react'
import { useState,  } from 'react'
import {db} from '../database/DatabaseHelper'
import { child, get, getDatabase, ref, remove} from "firebase/database"
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

function ShowLats(){

    const [lats, setLats] = useState()
    const dbRef = ref(db)
    useEffect(() => {
        get(child(dbRef, 'LAT')).then( snapshot => {

            if (snapshot.exists()){
                setLats(snapshot.val())
            }
            console.log(lats)
        })
    },[])
}

export default ShowLats