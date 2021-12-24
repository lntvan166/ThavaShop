const userService = require('./userService')

exports.login = (req, res) => {
    const wrongPassword = req.query['wrong-password'] !== undefined;
    res.render('auth/views/login', {
        wrongPassword
    });
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await userService.register(username, email, password);
    res.redirect('/login')
}

exports.editAccount = async (req, res) => {
    let user
    try {
        const body = req.body
        user = await userService.findById(req.params.id)
        with (user) {
            firstname = body.firstname
            lastname = body.lastname
            birthday = body.birthday
            email = body.email
            phone = body.phone
        }
        req.flash('success', 'Account editted')
        res.redirect('/account')
    } catch (err) {
        console.log(err);
        req.flash('error', 'Account edit failed')
    }
}