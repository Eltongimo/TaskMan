import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import {useEffect,useState} from 'react'
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import {Storage} from '../database/Storage'

function LATReport(project,acts ){

    const listOfImages = storageRef(Storage, 'HomeContent/')
    const [imageList, setImageList] = useState([])

    pdfMake.vfs = pdfFonts.pdfMake.vsf

    useEffect(() =>{
        /*
        listAll(listOfImages).then((response) => {
            let urls = []
            let items = []
            response.items.forEach(item => getDownloadURL(item).then(url =>{
                console.log(item)
                urls.push(url)
                setImageList(urls)
            }))
         })
         */
    
    },[])

    function createTable(){

        let a = []

        for(let key in acts){
            a.push(['Actividade', acts[key].Name])    
            a.push(['Descrição', acts[key].Description])
            a.push(['Lugar', acts[key].Location])
            a.push(['Inicio', acts[key].StartTime])
            a.push(['Data Final', acts[key].DeadLine])
            a.push(['Hora', acts[key].Time])
            a.push(['Duração', acts[key].Duration])
            a.push(['Homens', acts[key].Men])
            a.push(['Mulheres', acts[key].Women])
            a.push(['Meninos', acts[key].Boys])
            a.push(['Meninas', acts[key].Girls])
            a.push(['Esperado', acts[key].Waited])
            a.push(['Etereogenidade', acts[key].Heterogenity])
            a.push(['Proximos Passos', acts[key].NextSteps])
            a.push(['Comentarios', acts[key].Comments])
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

export default LATReport