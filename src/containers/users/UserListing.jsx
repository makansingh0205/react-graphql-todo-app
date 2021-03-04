import { Table, Card, Container, Row, Col } from 'react-bootstrap';
import PulseLoader from "react-spinners/PulseLoader";
import Header from '../../components/header/Header';
import NoDataFound from '../../components/no-data-found/NoDataFound';
import './style.scss';
import { NavLink } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_USER_LIST = gql `
query UsersPage {
    users {
     data {
        id
        name
        username
        email
        address {
            city
        }
        company {
            name
        }
        phone
        website
        }
    }    
  }
`

function UserListing() {
    const {loading, data } = useQuery(GET_USER_LIST);
    const userListingData = data !== undefined ? data['users'].data : [];
  return (
    <div className="page-body-wrapper">
        <Header  title="Users List" showBackBtn={false}  />       
        <div className="user-details-wrapper">  
        <Container>
            <Row>
                <Col md={12}>
                    <div className="user-details">
                    <Card>
                    {loading && <div className="loader-center">
                        <PulseLoader color={"#2ca5c2"} loading={true} size={15} />
                    </div>}

                    {!loading && userListingData.length > 0 && (
                        <Card.Body>  
                            <div className="user-details__item user-listing">
                                <Table responsive="md">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Username</th>
                                        <th>Name/Email</th>
                                        <th>Company</th>
                                        <th>Website</th>
                                        <th>City</th>                                        
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {userListingData.map((user, index) =>(
                                            <tr>
                                              <td>{user.id}</td>
                                              <td>{user.username}</td>
                                              <td>{user.name}<span className="small-text">({user.email})</span></td>
                                              <td>{user.company.name}</td>
                                              <td>{user.website}</td>
                                              <td>{user.address.city}</td>
                                              <td><NavLink to={'/user/'+user.id}>View more</NavLink></td>
                                            </tr>
                                        ))}
                                    </tbody>                                    
                                </Table>  
                              </div>              
                        </Card.Body>)}
                        {!loading &&  userListingData > 0 && (
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

export default UserListing;
