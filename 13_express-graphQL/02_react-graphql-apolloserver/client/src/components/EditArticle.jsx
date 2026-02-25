// EditArticle component
import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';

const EDIT_ARTICLE = gql`
  mutation EditArticle($id: ID!, $content: String!) {
    editArticle(id: $id, content: $content) {
      id
      title
      content
    }
  }
`;

const EditArticle = ({ articleId, existingContent, onClose }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Set the initial content when the component mounts
    setContent(existingContent);
  }, [existingContent]);

  const [editArticle] = useMutation(EDIT_ARTICLE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editArticle({ variables: { id: articleId, content } });
      onClose();
    } catch (err) {
      console.error('Error editing article:', err);
      // Handle the error, e.g., show an error message to the user.
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
