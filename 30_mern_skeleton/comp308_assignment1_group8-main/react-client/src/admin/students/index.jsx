import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';

const GET_STUDENTS = gql`
  query GetStudents {
    students {
      id
      studentNumber
      firstName
      lastName
      email
      courses {
        id
        courseCode
        courseName
      }
    }
  }
`;

const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      courseCode
      courseName
      semester
    }
  }
`;

const UPDATE_STUDENT_COURSES = gql`
  mutation UpdateStudent($id: ID!, $courses: [ID]) {
    updateStudent(id: $id, courses: $courses) {
      id
      courses {
        id
        courseCode
        courseName
      }
    }
  }
`;

function Students() {
  let navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  // State for edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const { loading: loadingStudents, error: errorStudents, data: studentsData, refetch: refetchStudents } = useQuery(GET_STUDENTS);
  const { loading: loadingCourses, error: errorCourses, data: coursesData } = useQuery(GET_COURSES);

  const [updateStudentMutation, { loading: updating }] = useMutation(UPDATE_STUDENT_COURSES, {
    refetchQueries: [
      { query: GET_STUDENTS },
      { query: GET_COURSES }
    ],
    onCompleted: () => {
      showAlertMessage('Student updated successfully!', 'success');
      setShowEditModal(false);
    },
    onError: (error) => {
      showAlertMessage(`Error: ${error.message}`, 'danger');
    }
  });

  const showDetail = (id) => {
    navigate('/admin/student/' + id);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    const currentCourseIds = student.courses.map(c => c.id);
    setSelectedCourses(currentCourseIds);
    setShowEditModal(true);
  };

  const handleCourseSelection = (courseId, isSelected) => {
    if (isSelected) {
      setSelectedCourses([...selectedCourses, courseId]);
    } else {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateStudentMutation({
      variables: {
        id: editingStudent.id,
        courses: selectedCourses
      }
    });
  };

  const showAlertMessage = (message, variant) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingStudent(null);
    setSelectedCourses([]);
  };

  if (loadingStudents || loadingCourses) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (errorStudents || errorCourses) {
    return (
      <Alert variant="danger" className="m-3">
        Error loading data: {errorStudents?.message || errorCourses?.message}
      </Alert>
    );
  }

  const students = studentsData?.students || [];
  const courses = coursesData?.courses || [];

  return (
    <div className="container-fluid pt-4">
      {showAlert && (
        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-gray-800">Student User List</h1>
        <Button variant="primary" onClick={() => navigate('/admin/student/create')}>
          <i className="bi bi-plus-circle me-1"></i> Add Student
        </Button>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Student Table</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="thead-light">
                <tr>
                  <th>Student Number</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Assigned Courses</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.studentNumber}</td>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.email}</td>
                      <td>
                        {student.courses && student.courses.length > 0 ? (
                          student.courses.map(course => (
                            <Badge key={course.id} bg="info" className="me-1 mb-1">
                              {course.courseCode}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-muted small">No courses</span>
                        )}
                      </td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => showDetail(student.id)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No students found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Student - {editingStudent?.firstName} {editingStudent?.lastName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingStudent && (
            <Form onSubmit={handleUpdate}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Student Number</Form.Label>
                    <Form.Control type="text" value={editingStudent.studentNumber} readOnly disabled />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={editingStudent.email} readOnly disabled />
                  </Form.Group>
                </div>
              </div>

              <div className="mb-4">
                <h5>Assign Courses</h5>
                <div className="border rounded p-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {courses.map((course) => (
                    <Form.Check
                      key={course.id}
                      type="checkbox"
                      id={`course-${course.id}`}
                      label={`${course.courseCode} - ${course.courseName}`}
                      checked={selectedCourses.includes(course.id)}
                      onChange={(e) => handleCourseSelection(course.id, e.target.checked)}
                      className="mb-2"
                    />
                  ))}
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={handleCloseModal} className="me-2">
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={updating}>
                  {updating ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Students;
