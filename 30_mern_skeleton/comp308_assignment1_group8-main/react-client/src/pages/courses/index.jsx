import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';

// GraphQL Queries and Mutations
const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;

const GET_STUDENT_DATA = gql`
  query GetStudent($studentNumber: String!) {
    studentByNumber(studentNumber: $studentNumber) {
      id
      studentNumber
      firstName
      lastName
      courses {
        id
      }
    }
  }
`;

const REGISTER_COURSE = gql`
  mutation RegisterCourse($courseId: ID!, $studentNumber: String!) {
    registerCourse(courseId: $courseId, studentNumber: $studentNumber) {
      id
      courseCode
      courseName
    }
  }
`;

const DROP_COURSE = gql`
  mutation DropCourse($courseId: ID!, $studentNumber: String!) {
    dropCourse(courseId: $courseId, studentNumber: $studentNumber) {
      id
      courseCode
      courseName
    }
  }
`;

// student page for courses
function Courses() {
    // State for UI
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('success');

    // Modal state for course details
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    // Get student number from localStorage (set during login)
    const studentNumber = localStorage.getItem('studentNumber');

    // GraphQL Queries
    const { 
        loading: coursesLoading, 
        error: coursesError, 
        data: coursesData 
    } = useQuery(GET_COURSES);

    const { 
        loading: studentLoading, 
        error: studentError, 
        data: studentData,
        refetch: refetchStudent
    } = useQuery(GET_STUDENT_DATA, {
        variables: { studentNumber },
        skip: !studentNumber
    });

    // GraphQL Mutations
    const [registerCourse] = useMutation(REGISTER_COURSE, {
        onCompleted: () => {
            showAlertMessage('Successfully enrolled in course!', 'success');
            refetchStudent();
        },
        onError: (error) => {
            showAlertMessage(`Failed to enroll: ${error.message}`, 'danger');
        }
    });

    const [dropCourse] = useMutation(DROP_COURSE, {
        onCompleted: () => {
            showAlertMessage('Successfully unenrolled from course!', 'success');
            refetchStudent();
        },
        onError: (error) => {
            showAlertMessage(`Failed to unenroll: ${error.message}`, 'danger');
        }
    });

    // Helper: Check if student is enrolled in a course
    const isEnrolled = (courseId) => {
        if (!studentData?.studentByNumber?.courses) return false;
        return studentData.studentByNumber.courses.some(c => c.id === courseId);
    };

    // Actions
    const enrollInCourse = (courseId) => {
        if (!studentNumber) {
            showAlertMessage('Please log in to enroll in courses', 'warning');
            return;
        }
        registerCourse({ variables: { courseId, studentNumber } });
    };

    const unenrollFromCourse = (courseId) => {
        if (!studentNumber) return;
        dropCourse({ variables: { courseId, studentNumber } });
    };

    const showCourseDetails = (course) => {
        setSelectedCourse(course);
        setShowModal(true);
    };

    const showAlertMessage = (message, variant) => {
        setAlertMessage(message);
        setAlertVariant(variant);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    // Loading and Error handling
    const isLoading = coursesLoading || studentLoading;
    const hasError = coursesError || studentError;

    if (isLoading && !coursesData) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading data...</p>
            </div>
        );
    }

    if (hasError) {
        return (
            <div className="container mt-4">
                <Alert variant="danger">
                    Error loading data: {coursesError?.message || studentError?.message}
                </Alert>
            </div>
        );
    }

    const allCourses = coursesData?.courses || [];
    const currentStudent = studentData?.studentByNumber;
    const enrolledCourses = currentStudent?.courses || [];

    return (
        <div className="container mt-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2>Course Enrollment</h2>
                    {currentStudent && (
                        <p className="text-muted">
                            Welcome, {currentStudent.firstName} {currentStudent.lastName} 
                            ({currentStudent.studentNumber})
                        </p>
                    )}
                </div>
                <div>
                    <Badge bg="info" className="fs-6">
                        Enrolled in {enrolledCourses.length} course(s)
                    </Badge>
                </div>
            </div>

            {/* Alert Messages */}
            {showAlert && (
                <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                    {alertMessage}
                </Alert>
            )}

            {/* My Enrolled Courses */}
            <div className="mb-5">
                <h4>My Courses</h4>
                {enrolledCourses.length === 0 ? (
                    <Alert variant="info">
                        You are not enrolled in any courses yet. Browse available courses below to get started!
                    </Alert>
                ) : (
                    <Row>
                        {enrolledCourses.map((courseRef) => {
                            // Find full course details from allCourses
                            const course = allCourses.find(c => c.id === courseRef.id);
                            if (!course) return null;
                            
                            return (
                                <Col md={6} lg={4} key={course.id} className="mb-3">
                                    <Card className="h-100 border-success shadow-sm">
                                        <Card.Body>
                                            <Card.Title className="text-success">{course.courseCode}</Card.Title>
                                            <Card.Text className="fw-bold">{course.courseName}</Card.Text>
                                            <div className="mb-2">
                                                <small className="text-muted">
                                                    Section: {course.section || 'N/A'} | 
                                                    Semester: {course.semester || 'N/A'}
                                                </small>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <Button 
                                                    variant="outline-info" 
                                                    size="sm"
                                                    onClick={() => showCourseDetails(course)}
                                                >
                                                    View Details
                                                </Button>
                                                <Button 
                                                    variant="outline-danger" 
                                                    size="sm"
                                                    onClick={() => unenrollFromCourse(course.id)}
                                                >
                                                    Unenroll
                                                </Button>
                                            </div>
                                        </Card.Body>
                                        <Card.Footer className="bg-success text-white py-1 text-center">
                                            <small>✓ Enrolled</small>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                )}
            </div>

            {/* Available Courses */}
            <div>
                <h4>Available Courses</h4>
                {allCourses.length === 0 ? (
                    <Alert variant="warning">
                        No courses are currently available.
                    </Alert>
                ) : (
                    <Row>
                        {allCourses.map((course) => (
                            <Col md={6} lg={4} key={course.id} className="mb-3">
                                <Card className={`h-100 shadow-sm ${isEnrolled(course.id) ? 'border-success' : ''}`}>
                                    <Card.Body>
                                        <Card.Title className="d-flex justify-content-between align-items-center">
                                            <span className={isEnrolled(course.id) ? "text-success" : ""}>
                                                {course.courseCode}
                                            </span>
                                            {isEnrolled(course.id) && (
                                                <Badge bg="success" className="ms-2">Enrolled</Badge>
                                            )}
                                        </Card.Title>
                                        <Card.Text className="fw-bold">{course.courseName}</Card.Text>
                                        <div className="mb-3">
                                            <small className="text-muted">
                                                Section: {course.section || 'N/A'} | 
                                                Semester: {course.semester || 'N/A'}
                                            </small>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <Button 
                                                variant="outline-info" 
                                                size="sm"
                                                onClick={() => showCourseDetails(course)}
                                            >
                                                View Details
                                            </Button>
                                            {isEnrolled(course.id) ? (
                                                <Button 
                                                    variant="outline-danger" 
                                                    size="sm"
                                                    onClick={() => unenrollFromCourse(course.id)}
                                                >
                                                    Unenroll
                                                </Button>
                                            ) : (
                                                <Button 
                                                    variant="primary" 
                                                    size="sm"
                                                    onClick={() => enrollInCourse(course.id)}
                                                >
                                                    Enroll
                                                </Button>
                                            )}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>

            {/* Course Details Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedCourse?.courseCode} - {selectedCourse?.courseName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCourse && (
                        <div>
                            <p><strong>Course Code:</strong> {selectedCourse.courseCode}</p>
                            <p><strong>Course Name:</strong> {selectedCourse.courseName}</p>
                            <p><strong>Section:</strong> {selectedCourse.section || 'Not specified'}</p>
                            <p><strong>Semester:</strong> {selectedCourse.semester || 'Not specified'}</p>
                            
                            {isEnrolled(selectedCourse.id) ? (
                                <Alert variant="success">
                                    <strong>✓ You are enrolled in this course</strong>
                                </Alert>
                            ) : (
                                <Alert variant="info">
                                    Click "Enroll" to join this course
                                </Alert>
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    {selectedCourse && !isEnrolled(selectedCourse.id) && (
                        <Button 
                            variant="primary" 
                            onClick={() => {
                                enrollInCourse(selectedCourse.id);
                                setShowModal(false);
                            }}
                        >
                            Enroll Now
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Courses;
