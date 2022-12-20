import React from 'react'
import './Home.css'
import {db} from './database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get,ref } from "firebase/database"

function Home(){
    const [user, setUser ] = useState({})
    const [typedUser, setTypedUser] = useState({})

    function getUsername(e){
        setTypedUser({username: e.target.value, password:typedUser.password})
    }

    function getPassword(e){
        setTypedUser({username: typedUser.username, password: e.target.value})
    }

    useEffect( () => {
        const dbRef = ref(db)
           
            get(child(dbRef, `User`)).then((snapshot) => {
                    if (snapshot.exists())
                        setUser({users: snapshot.val()})
                    else
                        alert('No Users')
            })
        }
    ,[])

    function login(e){
        
        for (let u in user.users){

            if ( user.users[u].Username === typedUser.username && user.users[u].Password === typedUser.password){
                e.target.isVisible = false
                document.getElementById('closemodal').click()
                document.getElementById('welcome').innerHTML = `${typedUser.username}, Bem vindo  ao POMAR!`
                enableMenus()
                clearForm()
                return 
            }
        }    
        
        alert('username and Password not correct')
    }

    function enableMenus(){
        document.getElementsByClassName('dashboard')[0].hidden = false
        document.getElementsByClassName('projects')[0].hidden = false
        document.getElementsByClassName('newsletter')[0].hidden = false
        document.getElementsByClassName('relatorios')[0].hidden = false
        document.getElementsByClassName('usuarios')[0].hidden = false
    }

    function clearForm(){
        document.getElementById('username').value = ''
        document.getElementById('password').value = ''
    }

    return (<div className='homeContainer'>

        <div className='image' style={{textAlign: 'justify', padding: '10px'}}> 
            <b>Informação sobre o Projectos</b>
            <p/>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            
        </div>
        <div className='text' style={{textAlign: 'justify', padding: '10px'}}>
            <b>Informação sobre o Pomar</b>
            <p/>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.        </div>

<p>Desenvolvido por Eltonug

</p>

<button type="button" onClick={clearForm} class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">
  Login
</button>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Login</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Username</label>
                <input type="email" id='username' onChange={getUsername} class="form-control" aria-describedby="emailHelp" placeholder="Usermane"/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" id='password' onChange= {getPassword} class="form-control" placeholder="Password"/>
            </div>
        </form>
            </div>
                <div class="modal-footer">
                    <button type="button" id='closemodal' class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" onClick={login}>Entrar</button>
                </div>
            </div>
        </div>
    </div>    
</div>)
}

export default Home