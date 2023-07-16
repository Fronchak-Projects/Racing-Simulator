import './style.css';

type Props = {
    onStartClick: () => void;
    onConfigClick: () => void
}

const Navbar = ({ onStartClick, onConfigClick }: Props) => {
    return (
        <nav className="navbar navbar-expand-md bg-dark" data-bs-theme="dark">
            <div className="container-fluid px-4">
                <a className="navbar-brand" href="#">
                    <img src="/imgs/f1_logo.png" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <button 
                                id="start-btn" 
                                className="btn btn-light"
                                onClick={onStartClick}    
                            >Start championship</button>
                        </li>
                    </ul>
                    <div className="config-icon-container" onClick={onConfigClick}>
                        <i className="bi bi-gear-fill"></i>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;