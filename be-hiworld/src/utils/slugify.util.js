import slugify from "slugify";

const convertToSlug = (string) => {
    return slugify(string, { lower: true });
};

export { convertToSlug };
