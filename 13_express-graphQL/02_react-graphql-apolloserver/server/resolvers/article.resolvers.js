import ArticleModel from '../models/article.server.model.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'some_secret_key';

export const articleResolvers = {
  Query: {
    articles: async () => await ArticleModel.find(),
    article: async (_, { id }) => await ArticleModel.findById(id),
  },
  Mutation: {
    addArticle: async (_, { title, content }, { req }) => {
      if (!req.user) throw new Error('Not authenticated');
      const newArticle = new ArticleModel({ title, content, authorId: req.user.id });
      return await newArticle.save();
    },
    editArticle: async (_, { id, content }, { req }) => {
      const article = await ArticleModel.findById(id);
      if (!article || article.authorId.toString() !== req.user.id) throw new Error('Unauthorized');
      return await ArticleModel.findByIdAndUpdate(id, { content }, { new: true });
    },
  },
};
