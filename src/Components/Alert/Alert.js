import Alert from 'react-bootstrap/Alert';

export default function DisplayAlert(props) {
    return (
        <Alert variant={props.variant}  style={{display: props.display}}>{props.title}</Alert>
    );
}
