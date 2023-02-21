import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import {useEffect,useState} from 'react'
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import {Storage} from '../database/Storage'
import FileDownload from 'js-file-download'

function ActivitySinglePDF(act, imageUrl){

   // const [imageList, setImageList] = useState()

      
    pdfMake.vfs = pdfFonts.pdfMake.vsf

    function createTable(){

        let a = []
        a.push(['Actividade', act.Name])    
        a.push(['Descrição', act.Description])
        a.push(['Lugar', act.Location])
        a.push(['Inicio', act.StartTime])
        a.push(['Data Final', act.DeadLine])
        a.push(['Hora', act.Time])
        a.push(['Duração', act.Duration])
        a.push(['Homens', act.Men])
        a.push(['Mulheres', act.Women])
        a.push(['Meninos', act.Boys])
        a.push(['Meninas', act.Girls])
        a.push(['Esperado', act.Waited])
        a.push(['Etereogenidade', act.Heterogenity])
        a.push(['Proximos Passos', act.NextSteps])
        a.push(['Comentarios', act.Comments])

        if (imageUrl === '' || imageUrl === undefined || imageUrl === null){
            a.push(['Link para Imagem da Actividade ', 'NA'])
        }else{
            a.push(['Link para Imagem da Actividade ', imageUrl])
        }
        return a
    }
    const title = [{
        text:[`Relatorio de Actividade`],
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

export default ActivitySinglePDF