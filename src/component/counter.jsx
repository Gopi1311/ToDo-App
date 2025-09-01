import React, { useReducer } from 'react'
import { Button ,Alert,Breadcrumb, Table, Spinner, Placeholder, ProgressBar} from 'react-bootstrap'

const Counter = () => {
    const initialState={
        count:0,
    }

    const reducer=(state,action)=>{
        switch(action.type){
            case 'increment':
                return {count:state.count+1}
            case 'decrement':
                return {count:state.count-1}
            default:
                return state
        }
    }

    const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <div>
        <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item >
                Library
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
        </Breadcrumb>
        <Table striped bordered hover>
      <thead>
        <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
        </tr>
        <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
        </tr>
        </tbody>
    </Table>
    <Spinner animation="border" variant="primary" />
    <Spinner animation="border" variant="danger" />
    <Spinner animation="border" variant="success" />
    <Placeholder as="p" animation="glow">
      <Placeholder xs={10} />
    </Placeholder>
<ProgressBar now={70} label={`${60}%`} />

        <Alert variant='info'>Count: {state.count}</Alert>
      <button className='btn btn-success btn-lg' onClick={()=>dispatch({type:'increment'})}>+</button>
      {state.count}
      <Button variant='danger' size='lg' onClick={()=>dispatch({type:'decrement'})}>-</Button>
    </div>
  )
}

export default Counter
