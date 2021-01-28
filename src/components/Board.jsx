import './Board.css'
import  Sticky from './Sticky'
import React from 'react'


/*
    The task must be come from user input.... 
*/
function content(){
    return ([<p>task1</p>, <p>task2</p>,<p>task3</p>,])
}

export default props =>
        <section >
            <div className='board'>
                <div className='title'> 
                    <i className="bi bi-clipboard"></i>
                        My Board
                </div>

                <div className='stiky-notes-container'>
                    <Sticky header='Items' content={content()}
                        leftArrow=''
                        rigthArrow='bi bi-arrow-bar-right'
                        >
                    </Sticky>

                    <Sticky header = 'Doing' content={content()}
                            rigthArrow='bi bi-arrow-bar-right'
                            leftArrow='bi bi-arrow-bar-left'
                        ></Sticky>
                    
                    <Sticky header = 'Done'  content={content()}
                        leftArrow='bi bi-arrow-bar-left'
                        rigthArrow=''
                    ></Sticky>
                </div>
            </div>
        </section>
