
// importar a dependência do sqlites
const sqlite3 = require("sqlite3").verbose()

// iniciar o objeto que orá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db // exportando o arquivo db.js 


// utilizar o objeto de banco de dados, para nossa operações
db.serialize(() => {

    // com comandos SQL eu vou:
/*
    
        // 1 Criar uma tabela, se tabela não existir ele vai criar, caso existir não será feito nada.
        db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    
    `)
        // 2 Inserir dados da tabela 
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
            "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
            "Papersider",
            "Guilherme Gemballa, Jardim América",
            "Nº 260",
            "Santa Catariana",
            "Rio do Sul",
            "Resíduos Eletrônicos, Lâmpadas"
        ]
    
        // fluxo da aplicação
        function afterInserData(err) {
            if (err) {
                return console.log(err)
            }
    
            console.log("Cadastrado com sucesso!!")
            console.log(this)
        }
    
        db.run(query, values, afterInserData) //inserindo os dados
    */
    /*
     // 3 Consultar os dados da tabela
     db.all(`SELECT * FROM places`, function (err, rows) {
         if (err) {
             return console.log(err)
         }
         console.log("Aqui estão seus registros: ")
         console.log(rows)
     })
*/
/*
    
        // 4 Deletar um dado da tabela
        db.run(`DELETE FROM places WHERE id = ?`, [1], function (err) {
            if (err) {
                return console.log(err)
            }
    
            console.log("Registro deletado com sucesso!!")
        })
    */
})
