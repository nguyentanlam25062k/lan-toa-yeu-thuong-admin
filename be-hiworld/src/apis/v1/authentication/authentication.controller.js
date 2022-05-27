import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword, createAccessToken, createRefreshToken, config } from '../../../utils/index';
import User from '../user/user.model';
import {
  signUpValidate,
  loginValidate,
  forgotPasswordValidate,
  changePasswordValidate,
} from './authentication.validate';
import nodemailer from 'nodemailer';
import shortid from 'shortid';

const sendCurrentPassword = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.EMAIL_APP,
      pass: config.EMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: '"Nguyễn Tấn Lâm 👻" <nguyentanlam25062k@gmail.com>',
    to: dataSend?.to,
    subject: 'Thông tin đặt lịch khám bệnh ✔',
    html: `
            <h3>Xin chào ${dataSend?.firstName} ${dataSend?.lastName}!</h3>
            <p>Mật khẩu mới của bạn là <bold>${dataSend?.newPassword}</bold></p>
            <div>Xin chân thành cảm hơn!</div>
        `,
  });
};

export const signUp = async (userRequest) => {
  try {
    const {
      error,
      value: { ...restUserRequest },
    } = signUpValidate.validate(userRequest);

    if (error) {
      return { code: 1, msg: error.details[0].message };
    }

    const [user, hashPasswordUser] = await Promise.all([
      User.findOne({ email: restUserRequest.email }).exec(),
      hashPassword(restUserRequest.password),
    ]);

    if (user) {
      return { code: 2, msg: 'Email của bạn đã tồn tại, vui lòng thử email khác !' };
    }

    await new User({ ...resUserRequest, password: hashPasswordUser }).save();
    return { code: 0, msg: 'Tạo mới người dùng thành công !' };
  } catch (e) {
    return { code: -1, msg: 'Lỗi từ server !' };
  }
};

export const login = async (req, res) => {
  try {
    const userRequest = req.body;

    const {
      error,
      value: { email, password },
    } = loginValidate.validate(userRequest);

    if (error) {
      return { code: 1, msg: error.details[0].message };
    }

    const user = await User.findOne({ email }).select('firstName lastName password gender email').lean().exec();
    if (!user) {
      return { code: 2, msg: 'Email của bạn không tồn tại, vui lòng thử email khác !' };
    }

    const { password: passwordFromDB, ...restUser } = user;
    const matchPassword = await comparePassword(password, passwordFromDB);
    if (!matchPassword) {
      return { code: 3, msg: 'Mật khẩu không chính xác !' };
    }

    const accessToken = createAccessToken({ ...user });
    const refreshToken = createRefreshToken({ ...user });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: config.COOKIE_LIFE,
    });

    return {
      code: 0,
      msg: 'Đăng nhập thành công !',
      body: { accessToken, restUser },
    };
  } catch (e) {
    return { code: -1, msg: 'Lỗi từ server !' };
  }
};

export const logout = (res) => {
  try {
    res.clearCookie('refreshToken');
    return { code: 0, msg: 'Đăng xuất thành công !' };
  } catch (e) {
    return { code: -1, msg: 'Lỗi từ server !' };
  }
};

export const forgotPassword = async (cookies) => {
  try {
    const { refreshToken } = cookies;
    if (!refreshToken) {
      return { code: 1, msg: 'Refresh token không tồn tại, vui lòng đăng nhập !' };
    }

    const user = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
    delete user.iat;
    delete user.exp;
    const accessToken = createAccessToken(user);

    return {
      code: 0,
      msg: 'Refresh token thành công !',
      body: { accessToken },
    };
  } catch (e) {
    return { code: -1, msg: 'Lỗi từ server !' };
  }
};

export const changePassword = async (userRequest) => {
  try {
    const {
      error,
      value: { email },
    } = forgotPasswordValidate.validate(userRequest);

    if (error) {
      return { code: 1, msg: error.details[0].message };
    }

    const user = await User.findOne({ email }).lean().exec();
    if (!user) {
      return { code: 2, msg: 'Email của bạn không tồn tại, vui lòng thử email khác !' };
    }

    const newPassword = shortid.generate();
    const dataSend = {
      to: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      newPassword: newPassword,
    };

    await sendCurrentPassword(dataSend);
    return { code: 0, msg: 'Lấy lại mật khẩu thành công, vui lòng check email để xem mật khẩu !', body: dataSend };
  } catch (e) {
    console.log(e);
    return { code: -1, msg: 'Lỗi từ server !' };
  }
};

export const refreshToken = async (userRequest) => {
  try {
    const {
      error,
      value: { email, password, newPassword },
    } = changePasswordValidate.validate(userRequest);

    if (error) {
      return { code: 1, msg: error.details[0].message };
    }

    const user = await User.findOne({ email }).exec();
    if (!user) {
      return { code: 2, msg: 'Email của bạn không tồn tại, vui lòng thử email khác !' };
    }

    const passwordFromDB = user._doc.password;
    const [matchPassword, newHashPassword] = await Promise.all([
      comparePassword(password, passwordFromDB),
      hashPassword(newPassword),
    ]);

    if (!matchPassword) {
      return { code: 3, msg: 'Mật khẩu hiện tại không chính xác !' };
    }

    user.password = newHashPassword;
    await user.save();

    return { code: 0, msg: 'Đổi mật khẩu thành công !' };
  } catch (e) {
    return { code: -1, msg: 'Lỗi từ server !' };
  }
};
