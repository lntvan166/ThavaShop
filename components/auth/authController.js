const userService = require('./userService')

exports.login = (req, res) => {
    const wrongPassword = req.query['wrong-password'] !== undefined;
    const usernameExist = req.query['username-exist'] !== undefined;
    const passwordConfirmFailed = req.query['password-confirm-failed'] !== undefined;
    res.render('auth/views/login', {
        wrongPassword,
        usernameExist,
        passwordConfirmFailed,
    });
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

exports.register = async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;

    const passwordConfirm = req.body['password-confirm'];
    if (password == passwordConfirm) {
        const checkExists = await userService.checkExists(username);
        if (checkExists.length != 0) {
            res.redirect('/login?username-exist')
        } else {
            const user = await userService.register(username, email, password);
            res.redirect('/login?register-successfully')
        }
    } else {
        res.redirect('/login?password-confirm-failed')
    }

}

exports.editAccount = async (req, res) => {
    let user
    try {
        const body = req.body
        user = await userService.findById(res.locals.user._id)
        with(user) {
            firstname = body.firstname
            lastname = body.lastname
            birthday = body.birthday
            email = body.email
            phone = body.phone
        }
        await user.save();
        // req.flash('success', 'Account editted')
        res.redirect('/')
    } catch (err) {
        console.log(err);
        // req.flash('error', 'Account edit failed')
    }
}

exports.activate = async (req, res) => {
    const {
        email
    } = req.query;
    const activationString = req.query['activation-string'];
    const result = await userService.activate(email, activationString)
    if (result) {
        const user = await userService.findByEmail(email)
        req.login(user, function (err) {
            if (err) return next(err);
            return res.redirect('/')
        })
    } else {
        return res.redirect('/')
    }
}