import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';

export default function Navbar() {
  return (
    <div className='navbar-container'>
      <NavLink
        exact
        to='/'
        style={({ isActive }) =>
          isActive ? { textDecoration: 'underline' } : undefined
        }
      >
        Expressão Regular
      </NavLink>
      <NavLink
        to='automato-finito'
        style={({ isActive }) =>
          isActive ? { textDecoration: 'underline' } : undefined
        }
      >
        Autômato Finito
      </NavLink>
      <NavLink
        to='gramatica-regular'
        style={({ isActive }) =>
          isActive ? { textDecoration: 'underline' } : undefined
        }
      >
        Gramática Regular
      </NavLink>
    </div>
  );
}
