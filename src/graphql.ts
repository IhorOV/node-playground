import { GraphQLSchema, GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLFloat, GraphQLList } from "graphql";
import { listings } from "./listings";
import _ from 'lodash';

const Listing = new GraphQLObjectType({
    name: "Listing",
    fields: {
      id: { type: GraphQLNonNull(GraphQLID) },
      title: { type: GraphQLNonNull(GraphQLString) },
      image: { type: GraphQLNonNull(GraphQLString) },
      address: { type: GraphQLNonNull(GraphQLString) },
      price: { type: GraphQLNonNull(GraphQLInt) },
      numOfGuests: { type: GraphQLNonNull(GraphQLInt) },
      numOfBeds: { type: GraphQLNonNull(GraphQLInt) },
      numOfBaths: { type: GraphQLNonNull(GraphQLInt) },
      rating: { type: GraphQLNonNull(GraphQLFloat) }
    }
  });  

const query = new GraphQLObjectType({
    name: "Query",
    fields: {
      listings: {
        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(Listing))),
        resolve: () => {
          return listings;
        }
      }
    }
  });
  

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      deleteListing: {
        type: GraphQLNonNull(Listing),
        args: {
          id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: (_root, { id }) => {
            const filteredList = _.remove(listings, { 'id': id})
            if (_.isEqual(listings.length , filteredList.length)) {
                return filteredList;
            }
            throw new Error("failed to deleted listing");
        }
      }
    }
  });
  

export const schema = new GraphQLSchema({query, mutation});