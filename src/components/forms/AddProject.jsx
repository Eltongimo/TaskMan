import React from 'react'
import './AddProject.css'
import {db} from '../database/DatabaseHelper'
import { child, get, ref,set } from "firebase/database"
import { useEffect,useState } from 'react'
import {v4 as uuidv4} from 'uuid';

function AddProjectForm(){

    const [project, setProject] = useState({     
            ProjectName: '',
            Objective: '',
            DeadLine: '',
            GeneralObjective: '',
            Key: uuidv4(),
            OperatorName: '',
            PartnerOrganizations: '',
            PeopleInvolved: '',
            Result: '',
            SpecificObjective: '',
            TypeOfActivity: ''

    })

    
    function saveProject(e){
        
        set(ref(db, 'Project/' + uuidv4()), project);
        document.getElementById('closemodal').click()
    }

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
                    TypeOfActivity: project.TypeOfActivity
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
            TypeOfActivity: project.TypeOfActivity

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
            TypeOfActivity: project.TypeOfActivity
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
            TypeOfActivity: project.TypeOfActivity
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
            TypeOfActivity: e.target.value
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
            TypeOfActivity: project.TypeOfActivity
        })
    }

    function setPeopleInvolved(e){
        setProject({
            ProjectName: project.ProjectName,
            Objective: project.Objective,
            DeadLine: project.DeadLine,
            GeneralObjective: project.GeneralObjective,
            Key: project.Key,
            OperatorName: project.OperatorName,
            PartnerOrganizations: project.PartnerOrganizations,
            PeopleInvolved: e.target.value,
            Result: project.Result,
            SpecificObjective: project.SpecificObjective,
            TypeOfActivity: project.TypeOfActivity
        })
    }

    function setPartnerOrganizarions(e){
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
            TypeOfActivity: project.TypeOfActivity
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
            PartnerOrganizations: e.target.value,
            PeopleInvolved: project.PeopleInvolved,
            Result: project.Result,
            SpecificObjective: project.SpecificObjective,
            TypeOfActivity: project.TypeOfActivity
        })
    }

    return (
        <div className='form-container'>
            <div className="form-group">
                <label for="exampleInputEmail1">Nome do Projecto</label>
                <input type="text" onChange={setProjectName} className="form-control" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">DeadLine</label>
                <input type="date" onChange={setDeadLine} className="form-control" aria-describedby="emailHelp" />
            </div>
            
            <div className="form-group">
                <label for="exampleInputEmail1">Objecto do projecto</label>
                <input type="text" onChange={setObjective} className="form-control" aria-describedby="emailHelp"/>
            </div>

            <div className="form-group">
                <label for="exampleInputEmail1">Resultado</label>
                <input type="text" onChange={setResult} className="form-control" aria-describedby="emailHelp"/>
            </div>

            <div className="form-group">
                <label for="exampleInputEmail1">Nome do operador</label>
                <input type="text" onChange={setOperatorName} className="form-control" aria-describedby="emailHelp" />
            </div>

            <div className="form-group">
                <label for="exampleInputEmail1">Tipo de actividade</label>
                <input type="text" onChange={setTypeOfActivity} className="form-control" aria-describedby="emailHelp" />
            </div>
            
            
            <div className="form-group">
                <label for="exampleInputEmail1">Objectivo Especifico</label>
                <input type="text" onChange={setSpecificObjective} className="form-control" aria-describedby="emailHelp" />
            </div>

            <div className="form-group">
                <label for="exampleInputEmail1">Pessoal Envolvolvido</label>
                <input type="text" onChange={setPeopleInvolved} className="form-control" aria-describedby="emailHelp" />
            </div>

            <div className="form-group">
                <label for="exampleInputEmail1">Organizacoes Parceiras</label>
                <input type="text" onChange={setPartnerOrganizarions} className="form-control" aria-describedby="emailHelp" />
            </div>
          
            <button type="button"  class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">
                Gravar Projecto         </button>
            <button type="button" className="btn btn-light">Descartar</button>

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Confirmação</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Submeter Projecto ?</label>
                    </div>
                </form>
                    </div>
                        <div class="modal-footer">
                            <button type="button" id='closemodal' class="btn btn-secondary" data-dismiss="modal">Não</button>
                            <button type="button" class="btn btn-primary" onClick={saveProject}>Sim</button>
                        </div>
                    </div>
                </div>
            </div>    

        </div>
    )
}

export default AddProjectForm