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
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      courseCode
      courseName
      section
      semester
      students {
        id
        firstName
        lastName
        studentNumber
      }
    }
  }
`;

const ADD_COURSE = gql`
  mutation AddCourse($courseCode: String!, $courseName: String!, $section: String, $semester: String) {
    addCourse(courseCode: $courseCode, courseName: $courseName, section: $section, semester: $semester) {
      id
      courseCode
      courseName
    }
  }
`;

const UPDATE_COURSE = gql`
  mutation UpdateCourse($id: ID!, $courseCode: String, $courseName: String, $section: String, $semester: String) {
    updateCourse(id: $id, courseCode: $courseCode, courseName: $courseName, section: $section, semester: $semester) {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;

const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id) {
      id
    }
  }
`;

function AdminCourses() {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('success');
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [modalType, setModalType] = useState('view');
    const [activeTab, setActiveTab] = useState('list');

    const [newCourse, setNewCourse] = useState({
        courseCode: '',
        courseName: '',
        section: '',
        semester: ''
    });

    const [editCourse, setEditCourse] = useState({
        courseCode: '',
        courseName: '',
        section: '',
        semester: ''
    });

    const { loading, error, data, refetch } = useQuery(GET_COURSES);

    const [addCourseMutation, { loading: adding }] = useMutation(ADD_COURSE, {
        onCompleted: () => {
            showAlertMessage('Course created successfully!', 'success');
            setNewCourse({ courseCode: '', courseName: '', section: '', semester: '' });
            refetch();
            setActiveTab('list');
        },
        onError: (err) => showAlertMessage(err.message, 'danger')
    });

    const [updateCourseMutation, { loading: updating }] = useMutation(UPDATE_COURSE, {
        onCompleted: () => {
            showAlertMessage('Course updated successfully!', 'success');
            setShowModal(false);
            refetch();
        },
        onError: (err) => showAlertMessage(err.message, 'danger')
    });

    const [deleteCourseMutation, { loading: deleting }] = useMutation(DELETE_COURSE, {
        onCompleted: () => {
            showAlertMessage('Course deleted successfully!', 'success');
            setShowModal(false);
            refetch();
        },
        onError: (err) => showAlertMessage(err.message, 'danger')
    });

    const handleCreate = (e) => {
        e.preventDefault();
        addCourseMutation({ variables: { ...newCourse } });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        updateCourseMutation({ 
            variables: { 
                id: selectedCourse.id,
                ...editCourse 
            } 
        });
    };

    const handleDelete = () => {
        deleteCourseMutation({ variables: { id: selectedCourse.id } });
    };

    const showCourseDetails = (course) => {
        setSelectedCourse(course);
        setModalType('view');
        setShowModal(true);
    };

    const editCourseAction = (course) => {
        setSelectedCourse(course);
        setEditCourse({
            courseCode: course.courseCode,
            courseName: course.courseName,
            section: course.section || '',
            semester: course.semester || ''
        });
        setModalType('edit');
        setShowModal(true);
    };

    const deleteCourseAction = (course) => {
        setSelectedCourse(course);
        setModalType('delete');
        setShowModal(true);
    };

    const showAlertMessage = (message, variant) => {
        setAlertMessage(message);
        setAlertVariant(variant);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCourse(null);
    };

    if (loading && activeTab === 'list') return <div className="text-center mt-5"><Spinner animation="border" /></div>;

    const courses = data?.courses || [];

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2>Course Management</h2>
                    <p className="text-muted">Manage and create courses in the system</p>
                </div>
                <Badge bg="info" className="fs-6">Total: {courses.length}</Badge>
            </div>

            {showAlert && (
                <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                    {alertMessage}
                </Alert>
            )}

            <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
                <Tab eventKey="list" title={<span>📋 Manage Courses <Badge bg="primary" className="ms-2">{courses.length}</Badge></span>}>
                    <div className="mt-4">
                        <Button variant="outline-secondary" onClick={() => refetch()} className="mb-4">🔄 Refresh List</Button>
                        <Row>
                            {courses.map((c) => (
                                <Col md={6} lg={4} key={c.id} className="mb-3">
                                    <Card className="h-100 shadow-sm">
                                        <Card.Body>
                                            <Card.Title className="text-primary">{c.courseCode}</Card.Title>
                                            <Card.Text className="fw-bold">{c.courseName}</Card.Text>
                                            <div className="small text-muted mb-3">
                                                Section: {c.section || 'N/A'} | Sem: {c.semester || 'N/A'}
                                            </div>
                                            <Badge bg="secondary" className="mb-3">{c.students?.length || 0} enrolled</Badge>
                                            <div className="d-flex justify-content-between">
                                                <Button variant="outline-info" size="sm" onClick={() => showCourseDetails(c)}>View</Button>
                                                <Button variant="outline-warning" size="sm" onClick={() => editCourseAction(c)}>Edit</Button>
                                                <Button variant="outline-danger" size="sm" onClick={() => deleteCourseAction(c)}>Delete</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Tab>

                <Tab eventKey="create" title="➕ Create New Course">
                    <div className="mt-4 row">
                        <div className="col-md-8">
                            <Form onSubmit={handleCreate}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Course Code *</Form.Label>
                                    <Form.Control type="text" value={newCourse.courseCode} onChange={e => setNewCourse({...newCourse, courseCode: e.target.value})} required placeholder="e.g., COMP308" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Course Name *</Form.Label>
                                    <Form.Control type="text" value={newCourse.courseName} onChange={e => setNewCourse({...newCourse, courseName: e.target.value})} required placeholder="e.g., Emerging Technologies" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Section</Form.Label>
                                    <Form.Control type="text" value={newCourse.section} onChange={e => setNewCourse({...newCourse, section: e.target.value})} placeholder="e.g., 001" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Semester</Form.Label>
                                    <Form.Select value={newCourse.semester} onChange={e => setNewCourse({...newCourse, semester: e.target.value})}>
                                        <option value="">Select Semester</option>
                                        <option value="Fall 2024">Fall 2024</option>
                                        <option value="Winter 2025">Winter 2025</option>
                                        <option value="Summer 2025">Summer 2025</option>
                                    </Form.Select>
                                </Form.Group>
                                <Button variant="primary" type="submit" disabled={adding}>{adding ? 'Creating...' : 'Create Course'}</Button>
                            </Form>
                        </div>
                    </div>
                </Tab>
            </Tabs>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalType === 'view' && 'Course Details'}
                        {modalType === 'edit' && 'Edit Course'}
                        {modalType === 'delete' && 'Delete Course'}
                        {selectedCourse && ` - ${selectedCourse.courseCode}`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCourse && modalType === 'view' && (
                        <div>
                            <p><strong>Code:</strong> {selectedCourse.courseCode}</p>
                            <p><strong>Name:</strong> {selectedCourse.courseName}</p>
                            <p><strong>Section:</strong> {selectedCourse.section || 'N/A'}</p>
                            <p><strong>Semester:</strong> {selectedCourse.semester || 'N/A'}</p>
                            <h6 className="mt-4">Enrolled Students ({selectedCourse.students?.length || 0})</h6>
                            <div className="mt-2">
                                {selectedCourse.students?.map(s => (
                                    <Badge key={s.id} bg="primary" className="me-1 mb-1">{s.firstName} {s.lastName} ({s.studentNumber})</Badge>
                                ))}
                                {(!selectedCourse.students || selectedCourse.students.length === 0) && <p className="text-muted small">No students enrolled</p>}
                            </div>
                        </div>
                    )}

                    {selectedCourse && modalType === 'edit' && (
                        <Form onSubmit={handleUpdate}>
                            <Form.Group className="mb-3">
                                <Form.Label>Course Code *</Form.Label>
                                <Form.Control type="text" value={editCourse.courseCode} onChange={e => setEditCourse({...editCourse, courseCode: e.target.value})} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Course Name *</Form.Label>
                                <Form.Control type="text" value={editCourse.courseName} onChange={e => setEditCourse({...editCourse, courseName: e.target.value})} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Section</Form.Label>
                                <Form.Control type="text" value={editCourse.section} onChange={e => setEditCourse({...editCourse, section: e.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Semester</Form.Label>
                                <Form.Select value={editCourse.semester} onChange={e => setEditCourse({...editCourse, semester: e.target.value})}>
                                    <option value="">Select Semester</option>
                                    <option value="Fall 2024">Fall 2024</option>
                                    <option value="Winter 2025">Winter 2025</option>
                                    <option value="Summer 2025">Summer 2025</option>
                                </Form.Select>
                            </Form.Group>
                            <div className="d-flex justify-content-end gap-2">
                                <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                                <Button variant="primary" type="submit" disabled={updating}>{updating ? 'Updating...' : 'Save Changes'}</Button>
                            </div>
                        </Form>
                    )}

                    {selectedCourse && modalType === 'delete' && (
                        <div>
                            <Alert variant="danger">Warning: This action cannot be undone!</Alert>
                            <p>Are you sure you want to delete <strong>{selectedCourse.courseCode}</strong>?</p>
                            <div className="d-flex justify-content-end gap-2">
                                <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                                <Button variant="danger" onClick={handleDelete} disabled={deleting}>{deleting ? 'Deleting...' : 'Confirm Delete'}</Button>
                            </div>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AdminCourses;
