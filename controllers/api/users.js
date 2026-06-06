const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
    checkToken,
}

async function create(req, res) {
    try {
        const user = await User.create(req.body);
        const token = createJWT(user);
        res.json(token);
    } catch (err) {
        if (err && err.code === 11000) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        if (err && err.name === 'ValidationError' && err.errors) {
            const first = Object.values(err.errors)[0];
            const msg =
                first && typeof first.message === 'string'
                    ? first.message
                    : 'Invalid input';
            return res.status(400).json({ message: msg });
        }
        res.status(400).json({ message: 'Sign up failed' });
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({
            'email': req.body.email,
        });
        if (!user) throw new Error();
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error();
        const token = createJWT(user);
        res.json(token);
    } catch {
        res.status(400).json({ message: 'Bad credentials' });
    }
}

function checkToken(req, res) {
    res.json(req.exp);
}

/*-- Helper Functions --*/

/** JWT carries only public profile fields (no password, no internal fields). */
function createJWT(user) {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
    };
    return jwt.sign({ user: payload }, process.env.SECRET, { expiresIn: '24h' });
}
