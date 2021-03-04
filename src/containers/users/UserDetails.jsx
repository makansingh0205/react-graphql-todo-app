import { Card, Container, Row, Col } from 'react-bootstrap';
import Avatar from 'react-avatar';
import PulseLoader from "react-spinners/PulseLoader";
import Header from '../../components/header/Header';
import NoDataFound from '../../components/no-data-found/NoDataFound';
import './style.scss';
import TodoList from '../../containers/todos/TodoList';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from "react-router-dom";

const GET_USER_DETAILS = gql`
  query User($id: ID!) {
    user(id: $id) {
        id
        name
        username
        email
        website,
        phone
        address {
          street
          suite
          city
          zipcode
        }
      todos(options:{paginate:{ page : 1, limit:8}}) {
        data {
          id
          title
          completed
        }
        meta {
          totalCount
        }
      }
    }
  }
`;

function UserDetails() {
    let params = useParams();
    let id = params.userID;
    const { loading, error, data } = useQuery(GET_USER_DETAILS, {
    variables: { id }
    });
    const userDetailData = data !== undefined ? data['user'] : null;
  return (
    <div className="page-body-wrapper">
        <Header title="Back to Users" showBackBtn={true} />       
        <div className="user-details-wrapper">  
        <Container>
            <Row>
                <Col md={8}>
                    <div className="user-details">
                    <Card>
                    {loading && <div className="loader-center">
                        <PulseLoader color={"#2ca5c2"} loading={true} size={15} />
                    </div>}

                    {!loading && userDetailData !== null && (
                        <Card.Body>                
                            <div className="user-details__item">
                                <Row>
                                    <Col md={12}>
                                        <div className="user-details__avtar">
                                            <Avatar name={userDetailData.name} size="60" textSizeRatio={3} color="#2ca5c2"  round={true} />
                                            <label className="user-details__list-label">{userDetailData.name}</label>
                                        </div>                            
                                    </Col>
                                </Row>
                            </div>     

                            <div className="user-details__item">
                                <Row>
                                    <Col md={4}>
                                        <div className="user-details__list">
                                            <label className="user-details__list-label">Username</label>
                                            <span className="user-details-list-value">{userDetailData.username}</span>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="user-details__list">
                                            <label className="user-details__list-label">Id</label>
                                            <span className="user-details-list-value">{userDetailData.id}</span>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="user-details__list">
                                            <label className="user-details__list-label">Website</label>
                                            <span className="user-details-list-value">{userDetailData.website}</span>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="user-details__list">
                                            <label className="user-details__list-label">Phone</label>
                                            <span className="user-details-list-value">{userDetailData.phone}</span>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="user-details__list">
                                            <label className="user-details__list-label">Phone</label>
                                            <span className="user-details-list-value">{userDetailData.phone}</span>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="user-details__list">
                                            <label className="user-details__list-label">Email</label>
                                            <span className="user-details-list-value">{userDetailData.email}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>         

                            <div className="user-details__item">
                                <Row>
                                    <Col md={12}>
                                        <div className="user-details__list">
                                            <h4>Address</h4>
                                        </div>
                                    </Col>
                                    <Col md={3}>
                                        <div className="user-details__list">
                                            <label className="user-details__list-label">Street</label>
                                            <span className="user-details-list-value">{userDetailData.address.street}</span>
                                        </div>
                                    </Col>
                                    <Col md={3}>
                                        <div className="user-details__list">
                                            <label className="user-details__list-label">Suite</label>
                                            <span className="user-details-list-value">{userDetailData.address.suite}</span>
                                        </div>
                                    </Col>
                                    <Col md={3}>
                                        <div className="user-details__list">
                                            <label className="user-details__list-label">City</label>
                                            <span className="user-details-list-value">{userDetailData.address.city}</span>
                                        </div>
                                    </Col>
                                    <Col md={3}>
                                        <div className="user-details__list">
                                            <label className="user-details__list-label">Zip Code</label>
                                            <span className="user-details-list-value">{userDetailData.address.zipcode}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>               
                        </Card.Body>)}
                        {!loading &&  userDetailData === null && (
                            <Card.Body>
                              <NoDataFound />
                            </Card.Body>
                        )}
                        </Card>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="todo-wrapper">
                        <Card>
                        {loading && <div className="loader-center">
                            <PulseLoader color={"#2ca5c2"} loading={true} size={15} />
                        </div>}
                            {!loading && userDetailData !== null && (
                                <Card.Body>
                                    <TodoList todoData={userDetailData.todos} />
                                </Card.Body>
                            )}
                            {!loading &&  userDetailData === null && (
                                <Card.Body>
                                <NoDataFound />
                                </Card.Body>
                            )}
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
        </div>
    </div>
  );
}

export default UserDetails;
