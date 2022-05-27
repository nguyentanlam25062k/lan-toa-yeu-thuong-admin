import { APIfeatures } from "../../../utils";
import User from "./user.model";

export const getUser = async (queryRequest) => {
    try {
        console.log("queryRequest", queryRequest);
        // console.log("queryRequest.age", queryRequest.age);
        const features = new APIfeatures(User.find({}), queryRequest).paginating().sorting().searching().filtering();

        const [users, count] = await Promise.all([features.query, User.countDocuments()]);

        return { code: 0, body: { users, count }, msg: "Lấy người dùng thành công !" };
    } catch (e) {
        console.log(e);
        return { code: -1, msg: "Lỗi từ server !" };
    }
};
