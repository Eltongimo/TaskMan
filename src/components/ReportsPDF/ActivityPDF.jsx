import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

function ActivityPDF(acts,mcs){

    pdfMake.vfs = pdfFonts.pdfMake.vsf
    
    function getTableRows(){

        let a = []

        for (let index in acts ){
            
            a.push(['Actividade', acts[index].Name])
            a.push(['Descrição', acts[index].Description])
            a.push(['Lugar', acts[index].Location])
            a.push(['Inicio', acts[index].StartTime])
            a.push(['Data Final', acts[index].DeadLine])
            a.push(['Hora', acts[index].Time])
            a.push(['Duração', acts[index].Duration])
            a.push(['Homens', acts[index].Men])
            a.push(['Mulheres', acts[index].Women])
            a.push(['Meninos', acts[index].Boys])
            a.push(['Meninas', acts[index].Girls])
            a.push(['Esperado', acts[index].Waited])
            a.push(['Etereogenidade', acts[index].Heterogenity])
            a.push(['Proximos Passos', acts[index].NextSteps])
            a.push(['Comentarios', acts[index].Comments]) 
            a.push([' ', ' '])  
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
                body: getTableRows(),
                widths: [120, '*'],
			},
            layout: 'headerLineOnly'
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

export default ActivityPDF