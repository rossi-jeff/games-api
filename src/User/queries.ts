import { QueryResolvers, QueryUserArgs } from "../../generated/graphql";
import { getUser } from "./db/get-user";

export const user: QueryResolvers["user"] = async (_, args: QueryUserArgs) => {
  return await getUser(args);
};
