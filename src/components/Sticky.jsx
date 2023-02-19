import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import './Sticky.css'

function Sticky(props){
    
    const history = useHistory()

    function GetProdNames(propsProd){

        let val = []
        for (let index in propsProd){
            let percentage = convertStatusToPercentage(propsProd[index].Status)

            val.push(
                <div className='element-container'>
                    <div className='element'>{propsProd[index].Name}</div>
                    <div className='percentage'>{percentage * 100}%</div>
                </div> 
            )
        }
        return val
    }

    function convertStatusToPercentage(percentage){

        if (percentage === 'Não Iniciado'){
            percentage = 0
        }else if (percentage === 'Em progresso'){
            percentage = 0.5
        }else if (percentage === 'Cancelado'){
            percentage = 0
        }else if (percentage === 'Concluido'){
            percentage = 1
        }
        return percentage
    }

    function showAllProductOnLAT(e){
        history.push({
            pathname: '/lats',
            search: `?key=${e.target.id}`,})
    }

    function getLATFullPercentage(arrayStatus){

        let percentage = 0
        let cont = 0
        
        for (let status in arrayStatus){
            let p = convertStatusToPercentage(status)    
            percentage += parseFloat(p)
            cont++
        }

        return percentage / cont * 10
    }

    return (
        <div className='sticky-notes' style={{marginLeft: '10px', border: 'solid 0.1px #001489'}}>
            <div className='items' >
                <div className='note-header' >
                    <div className='note-header-title' >
                        {props.header}
                    </div>
                    <div className='note-header-title'>
                        <button type='button' className='btn btn-primary'>
                            Baixar Relatorio da LAT
                        </button>
                    </div>
                    <div className='general-percentage' >
                        {getLATFullPercentage(props.fullProds)}%
                    </div>
                </div>        
            </div>
            <div className='content'>
                {GetProdNames(props.products)}
            </div>
            <div className='sticky-footer'>
                <div className='total-products'>
                    Total : {props.fullProds.length}
                </div>
               <button id={props.Key} type="button" class="btn btn-outline-dark" onClick={showAllProductOnLAT}>Ver Mais</button>
            </div>
        </div>
    )
}
export default Sticky
   