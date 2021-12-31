const express = require('express');
const app = express();
var cors = require('cors');
const { response } = require('express');
app.use(express.json());
app.use(cors())

app.post('/api/pdf', (req, res)=> {
    console.log(req.body.xml);
    const xml = req.body.xml;
    var fs = require('fs');
    var writeStream = fs.createWriteStream("MyXML.xml");
    writeStream.write(xml);
    writeStream.end();
    const { exec} = require("child_process");
    exec("xsltproc -xinclude -o mybook.fo /usr/share/xml/docbook/stylesheet/docbook-xsl-ns/fo/docbook.xsl MyXML.xml", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            // return;
        }
        console.log(`stdout: ${stdout}`);
        exec("fop mybook.fo -pdf MyBook.pdf", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                // return;
            }
            res.download('MyBook.pdf')
        });
    });
});

app.post('/api/html', (req, res)=> {
    console.log(req.body);
    const xml = req.body.xml;
    const path = require('path');
    var fs = require('fs');
    var writeStream = fs.createWriteStream("MyXML.xml");
    writeStream.write(xml);
    writeStream.end();
    const { exec } = require("child_process");
    exec("xsltproc -xinclude -o MyBook.html /usr/share/xml/docbook/stylesheet/docbook-xsl-ns/xhtml-1_1/docbook.xsl MyXML.xml", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.download('MyBook.html');
    });
      
    // var file = fs.createReadStream('MyBook.html');
    // var stat = fs.statSync('MyBook.html');
    // res.setHeader('Content-Length', stat.size);
    // res.setHeader('Content-Type', 'text');
    // file.pipe(res);
});

app.post('/api/rtf', (req, res)=> {
    const rtf = req.body.rtf;
    console.log(rtf)
    var fs = require('fs');
    var writeStream = fs.createWriteStream("MyHTML.html");
    writeStream.write(rtf);
    writeStream.end();
    const { exec } = require("child_process");
    exec("pandoc -f html -t docbook MyHTML.html > temp.txt", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            // return;
        }
        console.log(`stdout: ${stdout}`);
        res.download('temp.txt')
    });
});

app.post('/api/xml', (req, res)=> {
    console.log(req.body);
    const xml = req.body.xml;
    const path = require('path');
    var fs = require('fs');
    var writeStream = fs.createWriteStream("MyXML.xml");
    writeStream.write(xml);
    writeStream.end();
    const { exec} = require("child_process");
    exec("cat MyXML.xml", (error, stdout, stderr) =>{
        res.download('MyXML.xml');
    })
});


//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}..`));

// const xml = '<book xmlns="http://docbook.org/ns/docbook" xmlns:xi="http://www.w3.org/2001/XInclude" version="5.0"><title>lol</title></book>';
// var fs = require('fs');
// var writeStream = fs.createWriteStream("MyBook.xml");
// writeStream.write(xml);
// writeStream.end();
// const { exec } = require("child_process");
// exec("xsltproc -xinclude -o mybook.fo /usr/share/xml/docbook/stylesheet/docbook-xsl-ns/fo/docbook.xsl MyBook.xml", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });
// exec("fop mybook.fo -pdf MyBook.pdf", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });