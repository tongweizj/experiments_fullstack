// server/microservices/community-service/graphql/resolvers.js
import CommunityPost from "../models/CommunityPost.js";
import HelpRequest from "../models/HelpRequest.js";

const resolvers = {
  Query: {
    communityPosts: async () => await CommunityPost.find().sort({ createdAt: -1 }),
    communityPost: async (_, { id }) => await CommunityPost.findById(id),
    helpRequests: async () => await HelpRequest.find().sort({ createdAt: -1 }),
    helpRequest: async (_, { id }) => await HelpRequest.findById(id),
  },
  Mutation: {
    createCommunityPost: async (_, { title, content, category }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      const post = new CommunityPost({
        author: user.username,
        title,
        content,
        category,
      });
      return await post.save();
    },
    updateCommunityPost: async (_, args, { user }) => {
      if (!user) throw new Error("Unauthorized");
      const { id, ...updates } = args;
      const post = await CommunityPost.findById(id);
      if (!post) throw new Error("Post not found");
      if (post.author !== user.username) throw new Error("Unauthorized to edit this post");
      return await CommunityPost.findByIdAndUpdate(id, updates, { new: true });
    },
    deleteCommunityPost: async (_, { id }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      const post = await CommunityPost.findById(id);
      if (!post) throw new Error("Post not found");
      if (post.author !== user.username) throw new Error("Unauthorized to delete this post");
      await CommunityPost.findByIdAndDelete(id);
      return true;
    },
    createHelpRequest: async (_, { description, location }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      const request = new HelpRequest({
        author: user.username,
        description,
        location,
      });
      return await request.save();
    },
    updateHelpRequest: async (_, args, { user }) => {
      if (!user) throw new Error("Unauthorized");
      const { id, ...updates } = args;
      const request = await HelpRequest.findById(id);
      if (!request) throw new Error("Request not found");
      if (request.author !== user.username) throw new Error("Unauthorized to edit this request");
      return await HelpRequest.findByIdAndUpdate(id, updates, { new: true });
    },
    volunteerForHelpRequest: async (_, { id }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      return await HelpRequest.findByIdAndUpdate(
        id,
        { $addToSet: { volunteers: user.username } },
        { new: true }
      );
    },
    deleteHelpRequest: async (_, { id }, { user }) => {
      if (!user) throw new Error("Unauthorized");
      const request = await HelpRequest.findById(id);
      if (!request) throw new Error("Request not found");
      if (request.author !== user.username) throw new Error("Unauthorized to delete this request");
      await HelpRequest.findByIdAndDelete(id);
      return true;
    },
  },
  CommunityPost: {
    author: (post) => ({ username: post.author }),
  },
  HelpRequest: {
    author: (request) => ({ username: request.author }),
    volunteers: (request) => request.volunteers.map((v) => ({ username: v })),
  },
};

export default resolvers;
