const express = require('express');
const cors = require('cors');

const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

/* ===========================
   TEST ROUTE
=========================== */

app.get('/', (req, res) => {
    res.send('Backend Running');
});


/* ===========================
   CREATE FORM
=========================== */

app.post('/create-form', (req, res) => {

    try {

        const { title, themeColor, fields } = req.body;

        const formQuery = `
            INSERT INTO Forms (Title, ThemeColor)
            VALUES (?, ?)
        `;

        db.query(
            formQuery,
            [title, themeColor],

            (err, result) => {

                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }

                const formId = result.insertId;

                if (fields && fields.length > 0) {

                    fields.forEach((field) => {

                        const fieldQuery = `
                            INSERT INTO FormFields
                            (FormId, FieldType, Label, OptionsData)

                            VALUES (?, ?, ?, ?)
                        `;

                        db.query(
                            fieldQuery,
                            [
                                formId,
                                field.type,
                                field.label,
                                JSON.stringify(field.options || [])
                            ],

                            (err) => {
                                if (err) {
                                    console.log(err);
                                }
                            }
                        );
                    });
                }

                res.send({
                    success: true,
                    message: 'Form Created'
                });
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});


/* ===========================
   GET ALL FORMS
=========================== */

app.get('/forms', (req, res) => {

    const query = `
        SELECT * FROM Forms
        ORDER BY Id DESC
    `;

    db.query(query, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        res.send(result);
    });
});


/* ===========================
   GET SINGLE FORM
=========================== */

app.get('/form/:id', (req, res) => {

    const formId = req.params.id;

    const formQuery = `
        SELECT * FROM Forms
        WHERE Id = ?
    `;

    db.query(formQuery, [formId], (err, formResult) => {

        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        const fieldQuery = `
            SELECT * FROM FormFields
            WHERE FormId = ?
        `;

        db.query(fieldQuery, [formId], (err, fieldResult) => {

            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }

            res.send({
                form: formResult[0],
                fields: fieldResult
            });
        });
    });
});


/* ===========================
   SUBMIT RESPONSE
=========================== */

app.post('/submit-response', (req, res) => {

    try {

        const { formId, responseData } = req.body;

        const query = `
            INSERT INTO FormResponses
            (FormId, ResponseData)

            VALUES (?, ?)
        `;

        db.query(
            query,
            [
                formId,
                JSON.stringify(responseData)
            ],

            (err, result) => {

                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }

                res.send({
                    success: true,
                    message: 'Response Submitted'
                });
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});


/* ===========================
   GET RESPONSES
=========================== */

app.get('/responses/:id', (req, res) => {

    const formId = req.params.id;

    const query = `
        SELECT * FROM FormResponses
        WHERE FormId = ?
        ORDER BY Id DESC
    `;

    db.query(query, [formId], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        res.send(result);
    });
});


/* ===========================
   DELETE FORM
=========================== */

app.delete('/delete-form/:id', (req, res) => {

    const formId = req.params.id;

    db.query(
        'DELETE FROM FormFields WHERE FormId = ?',
        [formId],

        (err) => {

            if (err) {
                console.log(err);
            }

            db.query(
                'DELETE FROM FormResponses WHERE FormId = ?',
                [formId],

                (err) => {

                    if (err) {
                        console.log(err);
                    }

                    db.query(
                        'DELETE FROM Forms WHERE Id = ?',
                        [formId],

                        (err, result) => {

                            if (err) {
                                console.log(err);
                                return res.status(500).send(err);
                            }

                            res.send({
                                success: true,
                                message: 'Form Deleted'
                            });
                        }
                    );
                }
            );
        }
    );
});


app.listen(5000, () => {
    console.log('Server running on port 5000');
});