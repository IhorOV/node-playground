import { IResolvers } from "apollo-server-express";
import { listings } from "../listings";

export const resolvers: IResolvers = {
  Query: {
    listings: () => {
      return listings;
    }
  },
  Mutation:  {
    deleteListing: (_root: undefined, { id }: { id: string }) => {
        const filteredList = _.remove(listings, { 'id': id})
        if (_.isEqual(listings.length , filteredList.length)) {
            return filteredList;
        }
        throw new Error("failed to deleted listing");
    }
  }
};
