
const express = require("express")
const server = express()


// pegar o banco de dados
const db = require("./database/db.js")



// configurar pasta publica 
server.use(express.static("public"))


// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

// utilizando template angine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})



// configurar caminhos da minha aplicação
// pagina inicial
// req: Requisição
// res: Resposta 
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um Titulo" })
})

server.get("/create-point", (req, res) => {

    // req.query: Query Strings da nossa url
    //console.log(req.query)
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    // req.body: O corpo do nosso formulário
    //console.log(req.body)
    // inserir dados no banco de dados está parte 2 db.js

    const query = `
     INSERT INTO places (
         image, 
         name,
         address,
         address2,
         state,
         city,
         items
     ) VALUES (?,?,?,?,?,?,?);
 `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    // fluxo da aplicação, função callback não irá executar diretamente db.run(query, values,afterInserData )
    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso ")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)

})



server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        return res.render("search-results.html.html", { total: 0 })
    }


    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows)

        const total = rows.length

        //renderizar no html os dados do bancp de dados
        return res.render("search-results.html", { places: rows, total: total })
    })

})



// ligar o servidor 
server.listen(3000)