const express = require('express');
const conn = require('./conn');
const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render('index')
});

app.get('/register',(req,res)=>{
    res.render('register')
});

app.post('/register',(req,res)=>{

    const fn= req.body.fn;
    const ln = req.body.ln;
    const add = req.body.add;

    const insert=`INSERT INTO student_register
    VALUES('0', '${fn}', '${ln}', '${add}')`;
    
    conn.query(insert, (err)=>{
        if(err) throw err;
        res.send(
        `<script
            alert('Data Inserted');
            location.href='/';
        </script>
        >`
        )
    
    });
});

//route for displaying data
app.get('/view',(req,res)=>{
    const getData = `SELECT * FROM student_register`;

    // to execute the query
    conn.query(getData,(err, data)=>{
        if(err) throw err;
        res.render('view',{
            student: data 
        });
    });
}); 

// closing of displaying data
app.get('/delete/:id', (req,res)=>{

    const del_id = req.params.id;

    const toDelete = `DELETE FROM student_register WHERE student_id = '${del_id}'`;

    conn.query(toDelete,(err)=>{
        if(err) throw err;
        res.send(`<script>
            alert('Data Deleted!')
            location.href='/view'
            </script>
            `)
    });
});

app.listen(5000);