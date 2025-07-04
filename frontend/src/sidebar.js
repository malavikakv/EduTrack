import './sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBook,
    faPlusCircle,
    faChartLine,
    faUserGraduate,
    faTasks
} from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar-links">
                <li>
                    <Link to="/courses">
                        <FontAwesomeIcon icon={faBook} />Courses
                    </Link>
                </li>
                <li>
                    <Link to="/create">
                        <FontAwesomeIcon icon={faPlusCircle} />Add New Course
                    </Link>
                </li>
                <li>
                    <Link to="/progress">
                        <FontAwesomeIcon icon={faChartLine} />Progress Tracker
                    </Link>
                </li>
                <li>
                    <Link to="/my-learning">
                        <FontAwesomeIcon icon={faUserGraduate} />My Learning
                    </Link>
                </li>
                <li>
                    <Link to="/notes">
                        <FontAwesomeIcon icon={faTasks} /> Notes
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
