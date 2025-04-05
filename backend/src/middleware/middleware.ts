import jwt from "jsonwebtoken";

export const authTokenMiddleware = (req: any, res: any, next: any) => {
  const authToken = req.headers['x-auth-token'];

  if (authToken) {
    try {
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET as string);
      req.user = decoded; // Attach the decoded token payload to the request object
      next();
    } catch (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
};
