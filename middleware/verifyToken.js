import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  //const token = req.cookies.token;
 const token = req.headers.authorization;
//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjQzYzE2MDhhNzExOWFiOGUxMWVjYiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MTU0MTU1ODQsImV4cCI6MjMyMDIxNTU4NH0.8WExGew2hKZVtvB5DsFzR0OGTqBUIhSlsNfrRA5QXeo";
console.log(token, "donee");
  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not Valid!" });
    req.userId = payload.id;

    next();
  });
};
