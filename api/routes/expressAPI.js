var router = require("express").Router();

//router.get("/", function (req, res, next) {
  //  res.send("API is working properly");
//});

var sql = require("mssql");

var config = {
    user: 'sa',
    password: '123',
    server: 'DESKTOP-65N8NPI\SQLEXPRESS',
    database: 'emp'
};

router.get("/", function (req, res, next) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query('select * from emp', function (err, recordset) {
            if (err) console.log(err)
            res.send(recordset);
        });
    });
});

//  Create New Customer  
router.post('/', (req, res) => {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        let employee = req.body;
        connection.query("Insert into emp set ?; ", emp, (err, result) => {
            if (err) throw err;
            else {
                return res.send({ error: false, data: result, message: 'New emp has been created successfully.' });
            }
        });
    });
});

// Update an existing customer
router.put('/:id', (request, response) => {
    const id = request.params.id;

    connection.query('UPDATE emp SET ? WHERE id = ?', [request.body, id], (error, result) => {
        if (error) throw error;

        response.send('employee updated successfully.');
    });
});

// Delete a  Customer
router.delete('/:id', (request, response) => {
    const id = request.params.id;

    connection.query('DELETE FROM emp WHERE id = ?', id, (error, result) => {
        if (error) throw error;

        response.send('employee deleted.');
    });
});

module.exports = router;