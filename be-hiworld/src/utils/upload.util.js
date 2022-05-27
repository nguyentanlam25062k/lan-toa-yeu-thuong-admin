import fs from "fs";

const removeTempFile = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err;
    });
};

export { removeTempFile };
