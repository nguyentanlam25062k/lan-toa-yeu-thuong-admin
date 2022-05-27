import bcrypt from "bcryptjs";

const hashPassword = (password) => {
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) reject(err);
            resolve(hash);
        });
    });
};

const comparePassword = (password, hashPassword) => {
    console.log({ password, hashPassword });
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashPassword, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};

export { hashPassword, comparePassword };
