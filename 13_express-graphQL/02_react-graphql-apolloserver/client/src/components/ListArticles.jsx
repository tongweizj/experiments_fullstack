import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import EditArticle from './EditArticle';

const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      id
      title
      content
    }
  }
`;

const ListArticles = () => {
  const { loading, error, data, refetch } = useQuery(GET_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleRowClick = (articleId) => {
    setSelectedArticle(articleId);
  };

  const truncateContent = (content, maxLength) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div>
      <h2>List of Articles</h2>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {data.articles.map((article, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(article.id)}
              style={{ cursor: 'pointer' }}
            >
              <td>{article.title}</td>
              <td>{truncateContent(article.content, 100)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedArticle && (
  <div>
    <h2>Edit Article</h2>
    <EditArticle
      articleId={selectedArticle}
      existingContent={data.articles.find((article) => article.id === selectedArticle).content}
      onClose={() => setSelectedArticle(null)}
    />
  </div>
)}

      <button onClick={() => refetch()}>Refetch</button>
    </div>
  );
};

export default ListArticles;
