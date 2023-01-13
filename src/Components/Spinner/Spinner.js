import Spinner from 'react-bootstrap/Spinner';
import './spinner.css';

function GlobalSpinner() {
    return(
        <div id="spinner" className='spinner-container'>
            <Spinner animation="border" variant="secondary"/>
        </div>  
    );
}

export default GlobalSpinner;