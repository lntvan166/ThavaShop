const bcrypt = require('bcrypt');
const randomstring = require("randomstring");

const userModel = require('../../models/User');
const sgMail = require('../../service/sendGrid')

exports.findByUsername = (username) => userModel.findOne({
    username: username
}).lean();

exports.findByEmail = (email) => userModel.findOne({
    email: email
}).lean();

exports.findById = (id) => userModel.findById(id);

exports.validPassword = (password, user) => {
    return bcrypt.compare(password, user.password);
}

exports.register = async (username, email, password) => {
    const passwordHash = await bcrypt.hash(password, 10)
    const activationString = randomstring.generate();
    await userModel.create({
        username: username,
        email: email,
        password: passwordHash,
        status: "inactivated",
        activationString: activationString,
    });
    // send email
    const msg = {
        to: email, // Change to your recipient
        from: process.env.EMAIL_SENDER, // Change to your verified sender
        subject: 'ThavaShop account email activation',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<h1>Thanks for register your account with ThavaShop</h1>
        <p>Please activate your account <a href="${process.env.DOMAIN_NAME}/activate?email=${email}&activation-string=${activationString}">Click here!</a></p>`,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}

exports.activate = async (email, activationString) => {
    const user = await userModel.findOne({
        email,
        activationString,
    }).lean();
    if (!user) {
        return false;
    }
    await userModel.updateOne({
        email,
        activationString,
    }, {
        $Set: {
            status: 'activated',
        },
    });
    return true;
}