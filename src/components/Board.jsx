import './Board.css'
import  Sticky from './Sticky'
import React from 'react'


/*
    The task must be come from user input.... 
*/
function content(){
    return ([<p>task1 </p>, <p>task2</p>,<p>task3</p>,])
}

export default props =>
        <section >
            <div className='board'>
                <div className='title'> 
                    <i class="bi bi-clipboard"></i>
                        My Board
                </div>

                <div className='stiky-notes-container'>
                    <Sticky header = 'Items' content={content()}
                        leftArrow='bi bi-arrow-bar-right'
                        rigthArrow=''
                        deleteItem='bi bi-trash'
                        ></Sticky>

                    <Sticky header = 'Doing' content={content()}
                            rigthArrow='bi bi-arrow-bar-left'
                            leftArrow='bi bi-arrow-bar-right'
                            deleteItem='bi bi-trash'
                        ></Sticky>
                    
                    <Sticky header = 'Done'  content={content()}
                        leftArrow='bi bi-arrow-bar-right'
                        rigthArrow='bi bi-arrow-bar-left'
                        deleteItem='bi bi-trash'
                    ></Sticky>
                </div>
            </div>
        </section>
