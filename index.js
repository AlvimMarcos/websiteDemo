const http = require ('http');
const path = require ('path');
const fs = require ('fs');

const server  = http.createServer((req, res) =>{
  /*  //console.log(req.url);
    if(req.url === '/api/users'){
        
    //    fs.readFile(path.join(__dirname, 'public', 'about.html'),(err, content)=>{
    //        res.writeHead(200, {'Context-Type': 'text.html'});
    //        res.end(content)
     //   })
        
     //if(req.url === '/api/users')
        const users = [
            {name: 'Bob Smith', age:40},
            {name: 'Jonh Doe', age:30},
        ];
        res.writeHead(200, {'Context-Type': 'application/json'});
        res.end(JSON.stringify(users));
    }*/

    //BUILD FILE PATH

    let filePath = path.join(__dirname, 'public', req.url === '/' ?
    'index.html' : req.url
    );

    //Extension of file
    let extname = path.extname(filePath);


    //Initial content type
    let contentType = 'text/html';

    //Check extension and set content type
    switch(extname){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image.png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;        
    }

    //read file
    fs.readFile(filePath, (err, content)=>{
        if(err){
            if(err.code == 'ENOENT'){
                //page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), 
                (err, content)=> {
                    res.writeHead(200, {'Context-Type': 'text/html'});
                    res.end(content, 'utf8');
                })

            }else{
                //some sever error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else{
            //Success response
            res.writeHead(200, {'Context-Type': contentType});
            res.end(content, 'utf8');
            
        }
    });



});

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=> console.log(`Server running on ${PORT}`));