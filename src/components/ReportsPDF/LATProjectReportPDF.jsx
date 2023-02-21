import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import {useEffect,useState} from 'react'
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import {Storage} from '../database/Storage'

function LATProjectReportPDF(lats, project,products, mcs, acts){

    //const listOfImages = storageRef(Storage, 'HomeContent/')
   // const [imageList, setImageList] = useState()

    pdfMake.vfs = pdfFonts.pdfMake.vsf

    function createTable(){

        let a = []
                
        for (let lKey in lats){
            
            if (lats[lKey].ProjectKey === project.Key){
                
                a.push(['LAT', lats[lKey].Description])
              //  la[lKey] = lats[lKey]

                for (let pKey in products ){

                    if (products[pKey].LatKey === lats[lKey].Key){
                        a.push(['  Producto',products[pKey].Name])
                        //po[pKey] = products[pKey]

                        for (let mKey in mcs){

                            if (mcs[mKey].ProductKey === products[pKey].Key){
                                a.push(['    Macro Actividade',mcs[mKey].Name])
                            //    ma[mKey] = mcs[mKey]

                                for (let aKey in acts){

                                    if (mcs[mKey].Key === acts[aKey].MacroActivityKey){
                                   //     ac[aKey] = acts[aKey]
                                        a.push(['     Actividade', acts[aKey].Name])    
                                        a.push(['     Descrição', acts[aKey].Description])
                                        a.push(['     Lugar', acts[aKey].Location])
                                        a.push(['     Inicio', acts[aKey].StartTime])
                                        a.push(['     Data Final', acts[aKey].DeadLine])
                                        a.push(['     Hora', acts[aKey].Time])
                                        a.push(['     Duração', acts[aKey].Duration])
                                        a.push(['     Homens', acts[aKey].Men])
                                        a.push(['     Mulheres', acts[aKey].Women])
                                        a.push(['     Meninos', acts[aKey].Boys])
                                        a.push(['     Meninas', acts[aKey].Girls])
                                        a.push(['     Esperado', acts[aKey].Waited])
                                        a.push(['     Etereogenidade', acts[aKey].Heterogenity])
                                        a.push(['     Proximos Passos', acts[aKey].NextSteps])
                                        a.push(['     Comentarios', acts[aKey].Comments])
                                        a.push(['', ''])
                                        a.push(['', ''])
                                    }
                                }
                            }
                        }
                        a.push(['',''])
                    }
                }
            }
        }
        console.log(a)

        return a 
    }

    const title = [{
        text:[`Relatorio geral do Projecto `+ project.ProjectName],
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

export default LATProjectReportPDF