import Spinner from 'react-bootstrap/Spinner';
import './spinner.css';

function GlobalSpinner(props) {
    return(
        <div id="spinner" className='spinner-container' style={{display: props.display}}>
            <Spinner animation="border" variant="secondary"/>
        </div>  
    );
}

export default GlobalSpinner;