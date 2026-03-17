const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
exports.register = async (req, res) => {
    try{

        const { email, password } = req.body

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return res.status(400).json({ message: "User already exists "})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })

        res.status(201).json({
            message: "User created",
            user
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//login
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid creadentials" })
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid creadentials"})
        }

        const token = jwt.sign(
            { userId: user.id},
            process.env.JWT_SECRET,
            { expiresIn: "1d"}
        )

        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        });

        res.json({
            message: "Login successful"
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}