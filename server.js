const nodemailer = require('nodemailer')
const express = require('express')
const app = express()
var path = require('path')
    // Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.post('/', function(req, res) {
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass // generated ethereal password
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: req.body.email, // sender address
            to: "josiwele@gmail.com,josephwele@yahoo.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: req.body.message, // plain text body
        });
    }

    main().catch(console.error);
    res.send("Email sent");
})

app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`)
})