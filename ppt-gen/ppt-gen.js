var PptxGenJS = require("pptxgenjs");
var pptx = new PptxGenJS();


// Set Metadata //

pptx.setAuthor('David Franco');
pptx.setCompany('S.T.A.R. Laboratories');
pptx.setRevision('1');
pptx.setSubject('Just a Test');
pptx.setTitle('PptxGenJS Sample Presentation');
pptx.setLayout('LAYOUT_16x9');

var slideWidth = 10.0;
var slideHeight = 5.625;

// Slide Master //

pptx.defineSlideMaster({
  title: 'MASTER_SLIDE',
  bkgd:  {path:'images/background_geral.png'},
});

////////////////////////////////////////////////
//                 Slide Capa                 //
////////////////////////////////////////////////
function addSlideCapa() {
    var slide = pptx.addNewSlide();

    slide.back = '00B4CD';

    //images
    slide.addImage({ path:'images/waves_capa.png', 
        x:0.0, y:0.0, w:'100%', h:'100%'});
    slide.addImage({ path:'images/Logo_placeholder.png', 
        x:0.2, y:0.3, w:3.5, h:1.70 });
    slide.addImage({ path:'images/logo.png', 
        x:5.5, y:0.9, w:3.7, h:3.7 });

    //Texts
    slide.addText('Teste <Cliente>\n<Nome App>', 
        { x:0.3, y:2.20, w:5.0, align:'l', fontFace: 'Calibri', fontSize:20, color:'FFFFFF', 
            bold: true, italic: true });

    slide.addText('Bateria XX de <data da excução>', 
        { x:0.3, y:4.1, w:5.0, align:'l', fontFace: 'Calibri', fontSize:20, color:'FFFFFF', 
            bold: true, italic: true });

    slide.addText('Teste', 
        { x:0.3, y:5.2, align:'l', fontFace: 'Calibri', fontSize:14, color:'FFFFFF'});

    slide.addText('www.rsinet.com.br', 
        { x:7.6, y:5.2, align:'l', fontFace: 'Calibri', fontSize:14, color:'FFFFFF'});
}

////////////////////////////////////////////////
//               Slide Agenda                 //
////////////////////////////////////////////////
function addSlideAgenda(topics) {
    var slide = pptx.addNewSlide('MASTER_SLIDE');

    //Forms
    slide.addShape(pptx.shapes.RECTANGLE, 
        { x:0.0, y:0.0, w:'30%', h:'99.3%', fill:'FF9F1C' });

    //Text
    slide.addText('Agenda', 
        { x:0.3, y:1.8, fontFace:'Calibri', fontSize:54, color:'FFFFFF', bold:true });

    slide.addText(topics,
        { x:4.2, y:2.5, color:'00B4CD', fontFace:'Calibri', fontSize:24, bold:true}
    );
};



////////////////////////////////////////////////
//               Slide Objetivo               //
////////////////////////////////////////////////
function addSlideObjetivo(title, timestamp, users, requests) {
    var slide = pptx.addNewSlide('MASTER_SLIDE');

    //Forms
    slide.addShape(pptx.shapes.RECTANGLE, 
        { x:'70%', y:0.0, w:'30%', h:'99.3%', fill:'F3F3F3' });

    //Texts
    slide.addText('1.' + title, 
        { x:0.1, y:0.4, fontFace:'Calibri', fontSize:44, color:'00B4CD', bold:true });

    slide.addText([
            {text:'Mussum Ipsum, cacilds vidis litro abertis. Leite de capivaris, leite de mula manquis sem cabeça.', options:{ bullet:true }},
            {text:'Manduma pindureta quium dia nois paga. Si num tem leite então bota uma pinga aí cumpadi!', options:{ bullet:true }},
            {text:'Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.', options:{ bullet:true }},
            {text:'Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Interagi no mé, cursus quis, vehicula ac nisi.', options:{ bullet:true }},
            {text:'Detraxit consequat et quo num tendi nada. Viva Forevis aptent taciti sociosqu ad litora torquent.', options:{ bullet:true }}
        ], 
        { x:7.1, y:2.5, w:2.7, fontFace:'Calibri', fontSize:12, color:'000000', bold:false, paraSpaceBefore:1.5 });

    //Charts
    var dataUsers = [
        {
            name  : 'Usuários',
            labels: timestamp,
            values: users
        }
    ];

    var dataRPM = [
        {
            name  : 'Requisições',
            labels: timestamp,
            values: requests
        }
    ];

    slide.addChart([
        {type: pptx.charts.AREA, data: dataRPM, 
            options: { secondaryValAxis: true, secondaryCatAxis: true, chartColors: ['EC7C30']}},
        {type: pptx.charts.LINE, data: dataUsers, options:{ chartColors: ['4371C3'] }}
    ], 
    {
        //Title
        title: 'Rampa x Tempo em Minutos',
        showTitle: true,
        titleFontSize: 20,
        bold: true, 
        x:0.0, y:1.0, w:6.7, h:4.42, showLegend: true, legendPos: 't',
        valAxes:[
            {
                showValAxisTitle: true, valAxisTitle: 'Usuários Simultâneos \[s\]',
                valAxisTitleFontFace: 'Calibri', valAxisTitleFontSize: 14,
                catAxisOrientation  : 'maxMin', valGridLine: 'none'
            },
            {
                showValAxisTitle: true, valAxisTitle: 'Requisições por Minuto',
                valAxisTitleFontFace: 'Calibri', valAxisTitleFontSize: 14,
            
            }
        ],
        catAxes: [
            {
                showCatAxisTitle:false,
                catAxisMinVal: 0,
                catAxisLabelRotate: -45.0

            }, 
            {
                showCatAxisTitle: true,
                catAxisTitle: 'Tempo em Minutos',
                catAxisTitleFontFace: 'Calibri', 
                catAxisTitleFontSize: 14,
                catAxisHidden: true
            }
        ]
    });

    stepNumXPos = [0.89, 1.32, 1.74, 2.14, 2.56, 3.39, 4.19, 4.59, 5.00, 5.33];
    stepNumYPos = [4.02, 3.80, 3.56, 3.31, 3.08, 2.82, 2.59, 2.34, 2.11, 1.87];

    for (var i = 0; i <= 9; i++) {
        slide.addText((i+1), 
            { x:stepNumXPos[i], y:stepNumYPos[i], w:0.48, h:0.4, align:'l', 
            fontFace: 'Calibri', fontSize:18, color:'FF0000', bold: true});
    }
};

////////////////////////////////////////////////
//             Slide Visao Geral              //
////////////////////////////////////////////////
function addSlideVisaoGeral(title, timestamp, respTime, reqPerMinute) {
    var slide = pptx.addNewSlide('MASTER_SLIDE');

    //Forms
    slide.addShape(pptx.shapes.RECTANGLE, 
        { x:'70%', y:0.0, w:'30%', h:'99.3%', fill:'F3F3F3' });

    //Texts
    slide.addText('2.' + title, 
        { x:0.1, y:0.4, fontFace:'Calibri', fontSize:44, color:'00B4CD', bold:true });

    slide.addText([
            {text:'Mussum Ipsum, cacilds vidis litro abertis. Leite de capivaris, leite de mula manquis sem cabeça.', options:{ bullet:true }},
            {text:'Manduma pindureta quium dia nois paga. Si num tem leite então bota uma pinga aí cumpadi!', options:{ bullet:true }},
            {text:'Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.', options:{ bullet:true }},
            {text:'Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Interagi no mé, cursus quis, vehicula ac nisi.', options:{ bullet:true }},
            {text:'Detraxit consequat et quo num tendi nada. Viva Forevis aptent taciti sociosqu ad litora torquent.', options:{ bullet:true }}
        ], 
        { x:7.1, y:2.5, w:2.7, fontFace:'Calibri', fontSize:12, color:'000000', bold:false, paraSpaceBefore:1.5 });

    //Charts
    var dataRespTime = [
        {
            name  : 'Tempo de Resposta',
            labels: timestamp,
            values: respTime
        }
    ];

    var dataRPM = [
        {
            name  : 'Requisições',
            labels: timestamp,
            values: reqPerMinute
        }
    ];

    slide.addChart([
        {type: pptx.charts.AREA, data: dataRPM, 
            options: { secondaryValAxis: true, secondaryCatAxis: true, chartColors: ['EC7C30']}},
        {type: pptx.charts.LINE, data: dataRespTime, options:{ chartColors: ['4371C3'] }}
         
    ], 
    {
        //Title
        title: 'Tempo de Reposta x Threads',
        showTitle: true,
        titleFontSize: 20,
        bold: true, 
        x:0.0, y:1.0, w:6.7, h:4.42, showLegend: true, legendPos: 't',
        valAxes:[
            {
                showValAxisTitle: true, valAxisTitle: 'Tempo de Resposta \[s\]',
                valAxisTitleFontFace: 'Calibri', valAxisTitleFontSize: 14,
                catAxisOrientation  : 'maxMin', valGridLine: 'none'
            },
            {
                showValAxisTitle: true, valAxisTitle: 'Requisições por Minuto',
                valAxisTitleFontFace: 'Calibri', valAxisTitleFontSize: 14,
            
            }
        ],
        catAxes: [
            {
                showCatAxisTitle:false,
                catAxisMinVal: 0,
                catAxisLabelRotate: -45.0 

            }, {
                catAxisHidden: true
            }
        ]
    })
};

////////////////////////////////////////////////
//                Slide Erros                 //
////////////////////////////////////////////////
function addSlideErros(title, dictErr) {
    var slide = pptx.addNewSlide('MASTER_SLIDE');

    //Forms
    slide.addShape(pptx.shapes.RECTANGLE, 
        { x:'70%', y:0.0, w:'30%', h:'99.3%', fill:'F3F3F3' });

    //Texts
    slide.addText('3.' + title, 
        { x:0.1, y:0.4, fontFace:'Calibri', fontSize:44, color:'00B4CD', bold:true });

    slide.addText([
            {text:'Mussum Ipsum, cacilds vidis litro abertis. Leite de capivaris, leite de mula manquis sem cabeça.', options:{ bullet:true }},
            {text:'Manduma pindureta quium dia nois paga. Si num tem leite então bota uma pinga aí cumpadi!', options:{ bullet:true }},
            {text:'Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.', options:{ bullet:true }},
            {text:'Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Interagi no mé, cursus quis, vehicula ac nisi.', options:{ bullet:true }},
            {text:'Detraxit consequat et quo num tendi nada. Viva Forevis aptent taciti sociosqu ad litora torquent.', options:{ bullet:true }}
        ], 
        { x:7.1, y:2.5, w:2.7, fontFace:'Calibri', fontSize:12, color:'000000', bold:false, paraSpaceBefore:1.5 });

    //Charts
	var dataErr = [];
  
	for (var key in dictErr) {
		
		var axisLabel = [];
		var axisVal = [];
		
		for (var values in dictErr[key]) {
		  axisLabel.push(dictErr[key][values][0]);
		  axisVal.push(dictErr[key][values][1]);
		}

		dataErr.push({ name: key, labels: axisLabel, values: axisVal});

	}

    slide.addChart(pptx.charts.BAR, dataErr, { 
        //Title
        title: 'Distribuicao de Erros',
        showTitle: true,
        titleFontSize: 20,
        bold: true, 
        x:0.0, y:1.0, w:6.7, h:4.42, showLegend: true, legendPos: 't',
        barDir: 'col',
		barGrouping: 'stacked',
		//valAxis
        showValAxisTitle: true, 
        valAxisTitle: 'Quantidade de Erros',
        valAxisTitleFontFace: 'Calibri', 
        valAxisTitleFontSize: 14,
        catAxisOrientation  : 'minMax', 
  		//catAxes
  		catAxisMinVal: 0,
  		catAxisLabelRotate: -45.0,
    })
};

///////////////////////////////////////////////////////////////
//                Slide RespTime Transaction                 //
///////////////////////////////////////////////////////////////
function addSlideRespTimePerTransac(title, dictTransaction) {
    var slide = pptx.addNewSlide('MASTER_SLIDE');

    //Forms
    slide.addShape(pptx.shapes.RECTANGLE, 
        { x:'70%', y:0.0, w:'30%', h:'99.3%', fill:'F3F3F3' });

    //Texts
    slide.addText('3.' + title, 
        { x:0.1, y:0.4, fontFace:'Calibri', fontSize:44, color:'00B4CD', bold:true });

    slide.addText([
            {text:'Mussum Ipsum, cacilds vidis litro abertis. Leite de capivaris, leite de mula manquis sem cabeça.', options:{ bullet:true }},
            {text:'Manduma pindureta quium dia nois paga. Si num tem leite então bota uma pinga aí cumpadi!', options:{ bullet:true }},
            {text:'Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.', options:{ bullet:true }},
            {text:'Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Interagi no mé, cursus quis, vehicula ac nisi.', options:{ bullet:true }},
            {text:'Detraxit consequat et quo num tendi nada. Viva Forevis aptent taciti sociosqu ad litora torquent.', options:{ bullet:true }}
        ], 
        { x:7.1, y:2.5, w:2.7, fontFace:'Calibri', fontSize:12, color:'000000', bold:false, paraSpaceBefore:1.5 });

    //Charts
	var dataRespTimeTransact = [];
  
	for (var key in dictTransaction) {
		
		var axisLabel = [];
		var axisVal = [];
		
		for (var values in dictTransaction[key]) {
		  axisLabel.push(dictTransaction[key][values][0]);
		  axisVal.push(dictTransaction[key][values][2]);
		}

		dataRespTimeTransact.push({ name: key, labels: axisLabel, values: axisVal});
	}

	// console.log(dataRespTimeTransact);

    slide.addChart(pptx.charts.LINE, dataRespTimeTransact, { 
	    x:0.0, y:1.0, w:6.7, h:4.42, showLegend: true, legendPos: 't',

	    //Title
	    title: 'Tempo de Resposta por Transação',
	    showTitle: true,
	    titleFontSize: 20,
	    bold: true,
	    
	    //Axis
	    showValAxisTitle: true, 
	    valAxisTitle: 'Tempo de Resposta [ms]',
	    valAxisTitleFontFace: 'Calibri',
	    valAxisTitleFontSize: 14,
	    
	    //catAxes
	    catAxisOrientation  : 'minMax',
  		catAxisMinVal: 0,
  		catAxisLabelRotate: -45.0,     
	})
};

//////////////////////////////////////////////////////////
//                Slide RPM Transaction                 //
//////////////////////////////////////////////////////////
function addSlideRPMPerTransac(title, dictTransaction) {
    var slide = pptx.addNewSlide('MASTER_SLIDE');

    //Forms
    slide.addShape(pptx.shapes.RECTANGLE, 
        { x:0.0, y:0.0, w:'30%', h:'99.3%', fill:'bce4e5' });

    //Texts
    slide.addText('3.' + title, 
        { x:'35%', y:0.4, fontFace:'Calibri', fontSize:44, color:'00B4CD', bold:true });

    slide.addText([
            {text:'Mussum Ipsum, cacilds vidis litro abertis. Leite de capivaris, leite de mula manquis sem cabeça.', options:{ bullet:true }},
            {text:'Manduma pindureta quium dia nois paga. Si num tem leite então bota uma pinga aí cumpadi!', options:{ bullet:true }},
            {text:'Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.', options:{ bullet:true }},
            {text:'Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Interagi no mé, cursus quis, vehicula ac nisi.', options:{ bullet:true }},
            {text:'Detraxit consequat et quo num tendi nada. Viva Forevis aptent taciti sociosqu ad litora torquent.', options:{ bullet:true }}
        ], 
        { x:0.1, y:2.5, w:2.7, fontFace:'Calibri', fontSize:12, color:'000000', bold:false, paraSpaceBefore:1.5 });

    //Charts
	var dataRPMTransact = [];
  
	for (var key in dictTransaction) {
		
		var axisLabel = [];
		var axisVal = [];
		
		for (var values in dictTransaction[key]) {
		  axisLabel.push(dictTransaction[key][values][0]);
		  axisVal.push(dictTransaction[key][values][1]);
		}
		dataRPMTransact.push({ name: key, labels: axisLabel, values: axisVal});
	}

    slide.addChart(pptx.charts.LINE, dataRPMTransact, { 
	    x:3.0, y:1.0, w:6.7, h:4.42, showLegend: true, legendPos: 't',

	    //Title
	    title: 'Requests por Minuto por Transação',
	    showTitle: true,
	    titleFontSize: 20,
	    bold: true,
	    
	    //Axis
	    showValAxisTitle: true, 
	    valAxisTitle: 'Requests por Minuto',
	    valAxisTitleFontFace: 'Calibri',
	    valAxisTitleFontSize: 14,
	    
	    //catAxes
	    catAxisOrientation  : 'minMax',
  		catAxisMinVal: 0,
  		catAxisLabelRotate: -45.0,     
	})
};

////////////////////////////////////////////////
//           Slide Proximos Passos            //
////////////////////////////////////////////////
function addSlideProxPassos() {
    var slide = pptx.addNewSlide();

    //images
    slide.addImage({ path:'images/proximos_passos_fundo.png', 
        x:0.0, y:0.0, w:slideWidth, h: slideHeight + 0.01 });

    //Forms
    slide.addText('1',{
        shape:pptx.shapes.OVAL, x:2.30, y:4.18, w:0.4, h:0.4, fill:'00B4CD', line: 'FFFFFF', linesize: 60, 
        align:'center', fontSize:14, fontFace: 'Calibri', margin: 0, bold: true, color: 'FFFFFF' });
    slide.addText('2',{
        shape:pptx.shapes.OVAL, x:3.95, y:2.72, w:0.4, h:0.4, fill:'00B4CD', line: 'FFFFFF', linesize: 60, 
        align:'center', fontSize:14, fontFace: 'Calibri', margin: 0, bold: true, color: 'FFFFFF' });
    slide.addText('3',{
        shape:pptx.shapes.OVAL, x:5.6, y:1.5, w:0.4, h:0.4, fill:'00B4CD', line: 'FFFFFF', linesize: 60, 
        align:'center', fontSize:14, fontFace: 'Calibri', margin: 0, bold: true, color: 'FFFFFF' });
    slide.addText('4',{
        shape:pptx.shapes.OVAL, x:7.34, y:0.23, w:0.4, h:0.4, fill:'00B4CD', line: 'FFFFFF', linesize: 60, 
        align:'center', fontSize:14, fontFace: 'Calibri', margin: 0, bold: true, color: 'FFFFFF' });

    //Texts
    slide.addText('Próximos\nPassos', 
       { x:0.5, y:1.0, w:3.0, align:'l', fontFace: 'Calibri', fontSize:36, color:'FFFFFF', 
        bold: true, italic: true});
    
    slide.addText('Análise do ambiente e da aplicação', 
        { x:2.58, y:4.80, w:1.8, h:0.3, fontFace:'Calibri', fontSize:18, color:'FFFFFF', bold:true });
    slide.addText('Identificar pontos de contenção caso existam', 
        { x:4.23, y:3.51, w:1.8, h:0.3, fontFace:'Calibri', fontSize:18, color:'FFFFFF', bold:true });
    slide.addText('Sugerir possíveis melhorias', 
        { x:5.92, y:2.13, w:1.8, h:0.3, fontFace:'Calibri', fontSize:18, color:'FFFFFF', bold:true });
    slide.addText('Implementação das melhorias sugeridas, caso existam', 
        { x:7.65, y:1.03, w:2.1, h:0.3, fontFace:'Calibri', fontSize:18, color:'FFFFFF', bold:true });
};

////////////////////////////////////////////////
//                 Slide FIM                  //
////////////////////////////////////////////////
function addSlideFim() {
    var slide = pptx.addNewSlide();

    //images
    slide.addImage({ path:'images/background_pag_final.png', x:0.0, y:0.0, w:'100%', h:'100%' });

    //Texts
    slide.addText('Obrigado!', 
        { x:0.8, y:1.0, align:'l', fontFace: 'Calibri', fontSize:54, 
        color:'FFFFFF', bold: true});
};

//////////////////////////////////////////////////////
// Main function and exports to be called by others //
//////////////////////////////////////////////////////
module.exports = { 
    createPptx: (pptName, timestampOK, responseTimeOK, reqPerMinute,
        dictErr, dictTransaction) => {
        addSlideCapa();

        var topics = [
            { text: 'Objetivos', options: { bullet: { type: 'number' } } },
            { text: 'Visão Geral', options: { bullet: { type: 'number' } } },
            { text: 'Erros', options: { bullet: { type: 'number' } } },
            { text: 'Vazão', options: { bullet: { type: 'number' } } },
            { text: 'Proximos Passos', options: { bullet: false } },
        ];
        addSlideAgenda(topics);
        addSlideObjetivo(topics[0].text,
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120],
            [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 360, 360, 360, 360, 360, 360, 360, 360, 360, 360, 420, 420, 420, 420, 420, 420, 420, 420, 420, 420, 480, 480, 480, 480, 480, 480, 480, 480, 480, 480, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540],
            [0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 216, 216, 216, 216, 216, 216, 216, 216, 216, 216, 324, 324, 324, 324, 324, 324, 324, 324, 324, 324, 432, 432, 432, 432, 432, 432, 432, 432, 432, 432, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 648, 648, 648, 648, 648, 648, 648, 648, 648, 648, 756, 756, 756, 756, 756, 756, 756, 756, 756, 756, 864, 864, 864, 864, 864, 864, 864, 864, 864, 864, 972, 972, 972, 972, 972, 972, 972, 972, 972, 972]);
        addSlideVisaoGeral(topics[1].text, timestampOK, responseTimeOK, reqPerMinute);
        addSlideErros(topics[2].text, dictErr);
        addSlideRespTimePerTransac(topics[3].text, dictTransaction);
        addSlideRPMPerTransac(topics[3].text, dictTransaction);
        addSlideProxPassos();
        addSlideFim();

        pptx.save(pptName);
    }
}
