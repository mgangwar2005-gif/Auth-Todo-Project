const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const filePath = path.join(__dirname, '..', 'database', 'user.json');

const postRegister = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        // Validation logic...
        
        // 1. Read existing users
        const data = await fs.readFile(filePath, 'utf-8');
        const users = JSON.parse(data || '[]');

        // 2. Check if user exists
        if(users.find(u => u.email === email)) return res.status(400).send("User exists");

        // 3. Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Save User
        users.push({ email, fullName, password: hashedPassword });
        await fs.writeFile(filePath, JSON.stringify(users, null, 2));

        res.status(201).json({ success: true, message: "User registered!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { postRegister };