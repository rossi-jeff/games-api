import * as jwt from "jsonwebtoken";

const secret = process.env.Sercet || "S3cr3t!";

interface UserPayload {
  UserId?: number;
  UserName?: string;
}

export const decodeToken = (token?: string) => {
  let results: UserPayload = {};
  if (!token) return results;
  try {
    const decoded = jwt.verify(token.split(" ")[1], secret);
    if (typeof decoded === "object") {
      const { UserId, UserName } = decoded;
      results.UserId = UserId;
      results.UserName = UserName;
    }
  } catch (error) {
    console.log(error);
  }
  return results;
};
