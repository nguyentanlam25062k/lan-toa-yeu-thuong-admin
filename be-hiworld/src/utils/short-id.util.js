import shortid from "shortid";

const generateShortId = () => {
    return shortid.generate();
};

export { generateShortId };
