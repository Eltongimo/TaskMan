import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import {Storage} from '../database/Storage'

function ProductPDF (prod, mcs, acts){

    const listOfImages = storageRef(Storage, 'HomeContent/')
   
    pdfMake.vfs = pdfFonts.pdfMake.vsf

    function filterResult (){
        let m = {}
        let a = {}

        let signal = false
        for (let mKey in mcs){
            if (mcs[mKey].ProductKey === prod.Key){
                signal = true
                m[mKey] = mcs[mKey]
                for (let key in acts){
                    if (acts[key].MacroActivityKey === mcs[mKey].Key){
                        a[key] = acts[key]
                    }   
                }
            }
        }
        console.log(acts)
        mcs = m
        acts = a

        return signal
    }

    function createTable(){
        
        let a = []
        
        if (!filterResult()){
            alert('Producto sem Macro Actividades')
            return
        }

        for (let mKey in mcs){
            
            a.push(['Macro Actividade', mcs[mKey].Name])
            a.push([' ',' '])   

            for (let aKey in acts){
                a.push(['Actividade', acts[aKey].Name])    
                a.push(['Descrição', acts[aKey].Description])
                a.push(['Lugar', acts[aKey].Location])
                a.push(['Inicio', acts[aKey].StartTime])
                a.push(['Data Final', acts[aKey].DeadLine])
                a.push(['Hora', acts[aKey].Time])
                a.push(['Duração', acts[aKey].Duration])
                a.push(['Homens', acts[aKey].Men])
                a.push(['Mulheres', acts[aKey].Women])
                a.push(['Meninos', acts[aKey].Boys])
                a.push(['Meninas', acts[aKey].Girls])
                a.push(['Total', acts[aKey].Total])
                a.push(['Esperado', acts[aKey].Waited])
                a.push(['Etereogenidade', acts[aKey].Heterogenity])
                a.push(['Proximos Passos', acts[aKey].NextSteps])
                a.push(['Comentarios', acts[aKey].Comments])
                a.push(['',''])
                a.push(['', ''])
            }
        }
        return a
    }
    const title = [{
        text:[`Relatorio de Producto ${prod.Name}`],
        fontSize: 15,
        bold: true,
        margin: [15,20,0,45],
        justify: 'center'
    }]

    
    const details = [
		{
            style: 'tableExample',
			table: {
                body: createTable(),
                widths: [120, '*'],
			},
            layout: 'headerLineOnly',
            images: {
                image: '' 
            }
		}
    ]
    
    function footer (currentPage,pageCount){
        return [
            {
                text: currentPage + '/' + pageCount,
                align: 'right',
                fontSize: 8,
                margin: [0, 10, 20, 0]
            }
        ]
    }

    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],
        header: [title],
        content: [details],
        footer: [footer]
    }

    pdfMake.createPdf(docDefinitions).download()

}

export default ProductPDF