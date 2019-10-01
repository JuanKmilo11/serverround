var express = require('express');
var app = express();
const axios = require('axios');

var dbcon = require('../server-roundRobin/DbConnection');
var connection = dbcon();
connection.connect();
var pdf = require('html-pdf');

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

let count = 0;
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public','views', 'home.html'));
});

app.get('/search', function (req, res) {
    
    connection.query('SELECT CONCAT(nombre," "+apellidos) AS total,ciudad as city    from datos where institucion ="' + req.query.key + '"',(err, rows, fields)=> {
        res.json(JSON.stringify(rows));
        
       // res.json(rows.lenth);

        //console.log(JSON.stringify(rows))

    })
});


app.get('/pdf', function (req, res) {
    const company = req.query.key;
    let sql = 'SELECT CONCAT(nombre," "+apellidos) AS name ,ciudad as city   from datos where institucion ="' + req.query.key + '"';
    let query = connection.query(sql, (err, results) => {
        if (err) throw err;
        var current_datetime = new Date();
        var format_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes();
        //PDF
        var docDefinition = {
            footer: {
                columns: [
                    `Reporte generado: ${format_date}`,
                    { text: `${results.length} resultados encontrados`, alignment: 'right' }
                ]
            },
            content: [
                { text: `Reporte de la empresa ${company} - Asistencia Heroes Fest 2017`, style: 'title' },
                table(HEADERS, results, Object.keys(results[0]))
            ],
            styles: {
                title: {
                    fontSize: 22,
                    bold: true
                }
            }
        };


        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.getBase64((data) => {
            res.set('Content-Type', 'application/pdf');
            res.send(Buffer.from(data.toString('utf-8'), 'base64'));
        });

    });
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//pdf


var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const HEADERS = [
    { text: "Nombre", bold: true },
    { text: "Ciudad", bold: true },
];

function buildTableBody(headers, data, columns) {
    var body = [];

    body.push(headers);

    data.forEach(function (row) {
        var dataRow = [];

        columns.forEach(function (column) {
            dataRow.push(row[column].toString());
        })

        body.push(dataRow);
    });

    return body;
}

function table(headers, data, columns) {
    return {
        table: {
            headerRows: 1,
            body: buildTableBody(headers, data, columns)
        }
    };
}

// Create connection




