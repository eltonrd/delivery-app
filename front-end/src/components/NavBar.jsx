import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { localStorageUser } from '../utils/localStorage/localStorage';

export default function BasicNavBar({ links, dataTestIds }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header>
      <nav>
        <ul>
          { links.map(({ testid, text, path }) => (
            <Link
              to={ path }
              data-testid={ testid }
              key={ testid }
            >
              { text }
            </Link>
          )) }
        </ul>
      </nav>
      <div>
        <h1
          data-testid={ dataTestIds.name }
        >
          { localStorageUser().name }
        </h1>
        <button
          data-testid={ dataTestIds.button }
          onClick={ logout }
          type="button"
        >
          Sair
        </button>
      </div>
    </header>
  );
}

BasicNavBar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      testid: PropTypes.string,
      path: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
  dataTestIds: PropTypes.shape({
    name: PropTypes.string,
    button: PropTypes.string,
  }).isRequired,
};

BasicNavBar.defaultProps = {
  links: [],
};
