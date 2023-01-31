import React from 'react' 
import './EditHomeContent.css'
import {useState, useEffect} from 'react'
import {set,ref} from 'firebase/database'
import {db} from '../database/DatabaseHelper'
import {v4 as uuidv4} from 'uuid'
import { child, get } from "firebase/database"
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import { uploadBytes, ref as refStorage } from 'firebase/storage'
import {Storage} from '../database/Storage'

function EditHomeContent(){
    const [imageList, setImageList] = useState([])
    const listOfImages = storageRef(Storage, 'HomeContent/')
    const [image, setImages] = useState({})

    const [aboutPomar, setPomar] = useState({
            Key: uuidv4(),
            About: ''}
        )
        
    useEffect(()=>{
        const dbRef = ref(db)
        
        listAll(listOfImages).then((response) => {
            let urls = []
            response.items.forEach(item => getDownloadURL(item).then(url =>{
                urls.push(url)
                setImageList(urls)
            }))
         })
    
        get(child(dbRef,'HomeContent')).then((snapshot) => {
            if (snapshot.exists())
             for (let key in snapshot.val())
                setPomar({Key: aboutPomar.Key, About: snapshot.val()[key].About})
            }
        )
    }, [])
    
    function back(e){
        window.history.back()
    }

    function setFile(e){
            setPomar({
                Key: aboutPomar.Key,
                About: aboutPomar.About,
                File: e.target.files
            })
    }

    function submit(e){
        
        if (image !== null){
            uploadBytes( refStorage(Storage,`HomeContent/${aboutPomar.Key}`),image)
        }

        set(ref(db, 'HomeContent/' + uuidv4()), aboutPomar)
        back()
    }

    function setAboutPomar(e){
        setPomar({About: e.target.value, Key: aboutPomar.Key})
    }

    function setFile(e){
        setImages(e.target.files)
    }

    return (
        <div className='edit-container'>
              <div className='back-icon'>
                    <i className="bi bi-arrow-left" style={{cursor: 'pointer',
                                                                    marginRight: '20px'
                        }} onClick={back}/>
                        <p>Modificar Conteudo do Home</p>
              </div> 
              
            <div className='about-pomar'>
                <label for="exampleInputEmail1">Sobre o Pomar</label>
                <textarea rows='10' type='text' onChange={setAboutPomar} 
                    className="form-control" aria-describedby="emailHelp"  value={aboutPomar.About}/>
            </div>
            <div className='upload-pic'>
                <label for="exampleInputEmail1">Carregar Imagem</label>
                <input type="file" onChange={setFile} className="form-control" aria-describedby="emailHelp" />
            </div>
            <div className='submit-info'>
                <button className='btn btn-primary' onClick={submit}>
                    Gravar
                </button>
            </div>
        </div>
    )
}

export default EditHomeContent
