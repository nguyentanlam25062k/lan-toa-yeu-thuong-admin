import _ from "lodash";
const { isEmpty } = _;

export const count = async ({ model, where }) => {
  try {
    const query = !isEmpty(where) ? JSON.parse(where) : null;
    const count = await model.find(query).count();

    return { count };
  } catch (error) {
    return null;
  }
};

export const create = async ({ model, data }) => {
  try {
    const user = new model(data);
    let result = await user.save();

    return result;
  } catch (error) {
    return null;
  }
};

export const findOne = async ({ model, where }) => {
  try {
    const query = !isEmpty(where) ? JSON.parse(where) : null;
    const result = await model.findOne(query);

    return result;
  } catch (error) {
    return null;
  }
};

export const findById = async ({ model, id }) => {
  try {
    const result = await model.findById(id);

    return result;
  } catch (error) {
    return null;
  }
};

export const update = async ({ model, id, data }) => {
  try {
    const result = await model.findByIdAndUpdate(id, data, { new: true });

    return result;
  } catch (error) {
    return null;
  }
};

export const find = async ({ model, where, page, limit, pagination }) => {
  try {
    const query = !isEmpty(where) ? JSON.parse(where) : null;

    const data = await model
      .find(query)
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit)
      .lean()
      .exec();
    const total = await model.find(query).count();

    return {
      edges: data,
      pageInfo: {
        total,
      },
    };
  } catch (error) {
    return null;
  }
};

export const deleteFuc = async ({ model, id }) => {
  try {
    const result = await model.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    return result;
  } catch (error) {
    return null;
  }
};
