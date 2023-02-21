import Alert from 'react-bootstrap/Alert';

export default function DisplayAlert(props) {
    return (
        <div className='popAlert'>
            <Alert variant={props.type}  style={{display: props.display}}>{props.title}</Alert>
        </div>
    );
}
