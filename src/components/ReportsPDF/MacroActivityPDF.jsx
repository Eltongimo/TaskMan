import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import {useEffect,useState} from 'react'
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import {Storage} from '../database/Storage'

function MacroActivityPDF(name, acts){

    const listOfImages = storageRef(Storage, 'HomeContent/')
   // const [imageList, setImageList] = useState()

    pdfMake.vfs = pdfFonts.pdfMake.vsf

    function createTable(){
        
        let a = []

        for(let actKey in acts){
            a.push(['Actividade', acts[actKey].Name])    
            a.push(['Descrição', acts[actKey].Description])
            a.push(['Lugar', acts[actKey].Location])
            a.push(['Inicio', acts[actKey].StartTime])
            a.push(['Data Final', acts[actKey].DeadLine])
            a.push(['Hora', acts[actKey].Time])
            a.push(['Duração', acts[actKey].Duration])
            a.push(['Homens', acts[actKey].Men])
            a.push(['Mulheres', acts[actKey].Women])
            a.push(['Meninos', acts[actKey].Boys])
            a.push(['Meninas', acts[actKey].Girls])
            a.push(['Esperado', acts[actKey].Waited])
            a.push(['Etereogenidade', acts[actKey].Heterogenity])
            a.push(['Proximos Passos', acts[actKey].NextSteps])
            a.push(['Comentarios', acts[actKey].Comments])
            a.push([' ', ' '])
            a.push([' ', ' '])
        }
        return a
    }
    const title = [{
        text:[`Relatorio da Macro Actividade ${name}`],
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

export default MacroActivityPDF