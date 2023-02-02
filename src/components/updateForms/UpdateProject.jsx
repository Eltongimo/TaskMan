import React, { useEffect } from 'react'
import {db} from '../database/DatabaseHelper'
import { ref,set,get,update,child } from "firebase/database"
import { useState } from 'react'

function UpdateProject(){
    
    const [project, setProject] = useState({     
            ProjectName: '',
            Objective: '',
            DeadLine: '',
            GeneralObjective: '',
            Key: '  ',
            OperatorName: '',
            PartnerOrganizations: '',
            PeopleInvolved: '',
            Result: '',
            SpecificObjective: '',
            TypeOfActivity: '',
            Implementadores: ' ',
            Parceiros: ' ',
            Financiadores: ' '
    })

    function setProjectName(e){
        setProject({
                    ProjectName: e.target.value,
                    Objective: project.Objective,
                    DeadLine: project.DeadLine,
                    GeneralObjective: project.GeneralObjective,
                    Key: project.Key,
                    OperatorName: project.OperatorName,
                    PartnerOrganizations: project.PartnerOrganizations,
                    PeopleInvolved: project.PeopleInvolved,
                    Result: project.Result,
                    SpecificObjective: project.SpecificObjective,
                    TypeOfActivity: project.TypeOfActivity,
                    Implementadores: project.Implementadores,
                    Parceiros: project.Parceiros,
                    Financiadores: project.Financiadores
        })
    }

    function setObjective(e){
        setProject({
            ProjectName: project.ProjectName,
            Objective: e.target.value,
            DeadLine: project.DeadLine,
            GeneralObjective: project.GeneralObjective,
            Key: project.Key,
            OperatorName: project.OperatorName,
            PartnerOrganizations: project.PartnerOrganizations,
            PeopleInvolved: project.PeopleInvolved,
            Result: project.Result,
            SpecificObjective: project.SpecificObjective,
            TypeOfActivity: project.TypeOfActivity,
            Implementadores: project.Implementadores,
            Parceiros: project.Parceiros,
            Financiadores: project.Financiadores
        })
    }

    function setResult(e){
        setProject({ProjectName: e.target.value,
            Objective: project.Objective,
            DeadLine: project.DeadLine,
            GeneralObjective: project.GeneralObjective,
            Key: project.Key,
            OperatorName: project.OperatorName,
            PartnerOrganizations: project.PartnerOrganizations,
            PeopleInvolved: project.PeopleInvolved,
            Result: e.target.value,
            SpecificObjective: project.SpecificObjective,
            TypeOfActivity: project.TypeOfActivity,
            Implementadores: project.Implementadores,
            Parceiros: project.Parceiros,
            Financiadores: project.Financiadores

        })
    }

    function setOperatorName(e){
        setProject({ProjectName: e.target.value,
            Objective: e.target.value,
            DeadLine: project.DeadLine,
            GeneralObjective: project.GeneralObjective,
            Key: project.Key,
            OperatorName: e.target.value,
            PartnerOrganizations: project.PartnerOrganizations,
            PeopleInvolved: project.PeopleInvolved,
            Result: project.Result,
            SpecificObjective: project.SpecificObjective,
            TypeOfActivity: project.TypeOfActivity,
            Implementadores: project.Implementadores,
            Parceiros: project.Parceiros,
            Financiadores: project.Financiadores
        })
    }

    function setTypeOfActivity(e){
        setProject({ProjectName: e.target.value,
            Objective: e.target.value,
            DeadLine: project.DeadLine,
            GeneralObjective: project.GeneralObjective,
            Key: project.Key,
            OperatorName: project.OperatorName,
            PartnerOrganizations: project.PartnerOrganizations,
            PeopleInvolved: project.PeopleInvolved,
            Result: project.Result,
            SpecificObjective: project.SpecificObjective,
            TypeOfActivity: e.target.value,
            Implementadores: project.Implementadores,
            Parceiros: project.Parceiros,
            Financiadores: project.Financiadores
        })
    }

    function setSpecificObjective(e){
        setProject({
            ProjectName: project.ProjectName,
            Objective: project.Objective,
            DeadLine: project.DeadLine,
            GeneralObjective: project.GeneralObjective,
            Key: project.Key,
            OperatorName: project.OperatorName,
            PartnerOrganizations: project.PartnerOrganizations,
            PeopleInvolved: project.PeopleInvolved,
            Result: project.Result,
            SpecificObjective: e.target.value,
            TypeOfActivity: project.TypeOfActivity,
            Implementadores: project.Implementadores,
            Parceiros: project.Parceiros,
            Financiadores: project.Financiadores
        })
    }

    function setDeadLine(e){
        setProject({
            ProjectName: project.ProjectName,
            Objective: project.Objective,
            DeadLine: e.target.value,
            GeneralObjective: project.GeneralObjective,
            Key: project.Key,
            OperatorName: project.OperatorName,
            PartnerOrganizations: e.PartnerOrganizations,
            PeopleInvolved: project.PeopleInvolved,
            Result: project.Result,
            SpecificObjective: project.SpecificObjective,
            TypeOfActivity: project.TypeOfActivity,
            Implementadores: project.Implementadores,
            Parceiros: project.Parceiros,
            Financiadores: project.Financiadores
        })
    }

    function setImplementadores(e){
        setProject({
            ProjectName: project.ProjectName,
            Objective: project.Objective,
            DeadLine: project.DeadLine,
            GeneralObjective: project.GeneralObjective,
            Key: project.Key,
            OperatorName: project.OperatorName,
            PartnerOrganizations: e.target.value,
            PeopleInvolved: project.PeopleInvolved,
            Result: project.Result,
            SpecificObjective: project.SpecificObjective,
            TypeOfActivity: project.TypeOfActivity,
            Implementadores: e.target.value,
            Parceiros: project.Parceiros,
            Financiadores: project.Financiadores
        })
    }

    
    function setParceiros(e){
        setProject({
            ProjectName: project.ProjectName,
            Objective: project.Objective,
            DeadLine: project.DeadLine,
            GeneralObjective: project.GeneralObjective,
            Key: project.Key,
            OperatorName: project.OperatorName,
            PartnerOrganizations: e.target.value,
            PeopleInvolved: project.PeopleInvolved,
            Result: project.Result,
            SpecificObjective: project.SpecificObjective,
            TypeOfActivity: project.TypeOfActivity,
            Implementadores: project.Implementadores,
            Parceiros: e.target.value,
            Financiadores: project.Financiadores
        })
    }

    
    function setFinanciadores(e){
        setProject({
            ProjectName: project.ProjectName,
            Objective: project.Objective,
            DeadLine: project.DeadLine,
            GeneralObjective: project.GeneralObjective,
            Key: project.Key,
            OperatorName: project.OperatorName,
            PartnerOrganizations: e.target.value,
            PeopleInvolved: project.PeopleInvolved,
            Result: project.Result,
            SpecificObjective: project.SpecificObjective,
            TypeOfActivity: project.TypeOfActivity,
            Implementadores: project.Implementadores,
            Parceiros: project.Parceiros,
            Financiadores: e.target.value
        })
    }

    function back(e){
        window.history.back()
    }

    function updateProject(e){

        update(ref(db, `Project/${e.target.value}` ), project).then(() => {
            alert('Projecto Actualizado com sucesso')
        }).catch(() => {
            alert('Erro ao Actualizado com sucesso')
        })
        document.getElementById('closemodal').click()
        back()
    }

    function setKey(){
        setProject({
            ProjectName: project.ProjectName,
            Objective: project.Objective,
            DeadLine: project.DeadLine,
            GeneralObjective: project.GeneralObjective,
            Key: project.Key,
            OperatorName: project.OperatorName,
            PartnerOrganizations: project.PartnerOrganizations,
            PeopleInvolved: project.PeopleInvolved,
            Result: project.Result,
            SpecificObjective: project.SpecificObjective,
            TypeOfActivity: project.TypeOfActivity,
            Implementadores: project.Implementadores,
            Parceiros: project.Parceiros,
            Financiadores: project.Financiadores
        })
    }

    return (
        
        <div className='form-container'>

        <div className='title'> 
            <div className='back-icon'>
                <i className="bi bi-arrow-left" style={{cursor: 'pointer',
                                                                marginRight: '20px'
                    }} onClick={back}/>
            </div>
            <div className='form-title'>
                Actualizar Projecto
            </div>
        </div>
        <div className="form-group">
            <label for="exampleInputEmail1">Nome do Projecto</label>
            <input type="text" value={project.ProjectName} id='projectName'onChange={setProjectName} className="form-control" aria-describedby="emailHelp" />
        </div>
        <div className="form-group">
            <label for="exampleInputEmail1">DeadLine</label>
            <input type="date" id='deadLine' value={project.DeadLine} onChange={setDeadLine} className="form-control" aria-describedby="emailHelp" />
        </div>
        
        <div className="form-group">
            <label for="exampleInputEmail1">Objecto do projecto</label>
            <input type="text" id='projectObjective' value={project.GeneralObjective} onChange={setObjective} className="form-control" aria-describedby="emailHelp"/>
        </div>

        <div className="form-group">
            <label for="exampleInputEmail1">Resultado</label>
            <input type="text" id='results' value={project.Result} onChange={setResult} className="form-control" aria-describedby="emailHelp"/>
        </div>

        <div className="form-group">
            <label for="exampleInputEmail1">Nome do operador</label>
            <input type="text" id='operatorName' value={project.OperatorName} onChange={setOperatorName} className="form-control" aria-describedby="emailHelp" />
        </div>

        <div className="form-group">
            <label for="exampleInputEmail1">Tipo de actividade</label>
            <input type="text" id='typeOfActivity' value={project.TypeOfActivity} onChange={setTypeOfActivity} className="form-control" aria-describedby="emailHelp" />
        </div>

        <div className="form-group">
            <label for="exampleInputEmail1">Objectivo Especifico</label>
            <input type="text" id='specificObjective' value={project.SpecificObjective} onChange={setSpecificObjective} className="form-control" aria-describedby="emailHelp" />
        </div>

        <div className="form-group">
            <label for="exampleInputEmail1">Implementadores</label>
            <input type="text" id='implementadores' value={project.Implementadores} onChange={setImplementadores} className="form-control" aria-describedby="emailHelp" />
        </div>
      
        <div className="form-group">
            <label for="exampleInputEmail1">Parceiros</label>
            <input type="text" id='parceiros' value={project.Parceiros} onChange={setParceiros} className="form-control" aria-describedby="emailHelp" />
        </div>
        
        <div className="form-group">
            <label for="exampleInputEmail1">Financiadores</label>
            <input type="text" id='finaciadores' value={project.Financiadores} onChange={setFinanciadores} className="form-control" aria-describedby="emailHelp" />
        </div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Actualizar Projecto         </button>

        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Confirmação</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
            <form>
                <div className="form-group">
                    <label for="exampleInputEmail1">Actualizar Projecto ?</label>
                </div>
            </form>
                </div>
                    <div className="modal-footer">
                        <button type="button" id='closemodal' className="btn btn-secondary" data-dismiss="modal">Não</button>
                        <button type="button" value={document.URL.split('=')[1]}className="btn btn-primary" onClick={updateProject}>Sim</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default UpdateProject