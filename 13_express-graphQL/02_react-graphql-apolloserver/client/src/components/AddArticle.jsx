import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { Form, Button } from 'react-bootstrap'; // Import React Bootstrap components

// AddArticle mutation
const ADD_ARTICLE = gql`
  mutation AddArticle($title: String!, $content: String!) {
    addArticle(title: $title, content: $content) {
      title
    }
  }
`;

// AddArticle component
const AddArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [addArticle] = useMutation(ADD_ARTICLE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addArticle({ variables: { title, content } });
      // Clear input fields
      setTitle('');
      setContent('');
      navigate('/listarticles');
    } catch (err) {
      console.error('Error creating article:', err);
      // Handle the error, e.g., show an error message to the user.
    }
  };

  // AddArticle component UI with React Bootstrap components
  return (
    <div>
      <h2>Create Article</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title:</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Content:</Form.Label>
          <Form.Control as="textarea" value={content} onChange={(e) => setContent(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Article
        </Button>
      </Form>
    </div>
  );
};

export default AddArticle;
