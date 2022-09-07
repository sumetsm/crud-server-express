const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.headers["authtoken"];
  //   console.log("Middleware", token);
  // console.log('Middleware',token);
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // verify token
  try {
    // decode
    const decoded = jwt.verify(token, "jwtSecret");
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { name } = req.user;
  //ถ้าไม่รอมันจะไม่เข้า admin
  const adminUser = await User.findOne({ name }).exec();
  console.log("adminCheck", adminUser.role);
  if (adminUser.role !== "admin") {
    // console.log("admin check error !");
    res.status(403).json({ err: "Admin access denied" });
  } else {
    // console.log("admin check !");
    next();
  }
};
