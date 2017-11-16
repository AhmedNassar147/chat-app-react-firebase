/**
*
* RegisterContainer
*
*/

import React, { PropTypes } from 'react';
import { Paper } from 'material-ui';
// import styled from 'styled-components';

function RegisterContainer({ children, title }) {
  return (
    <div style={movepaper}>
      <Paper style={paddingPaper}>
        <div style={centerizeElement}>
          <h2>{title}</h2>
        </div>
        <div>{children}</div>
      </Paper>
    </div>
  );
}

const movepaper = {
  margin: '0 auto',
  marginTop: 50,
  maxWidth: 400,
};
const centerizeElement = {
  textAlign: 'center',
};
const paddingPaper = {
  padding: 32,
};

RegisterContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default RegisterContainer;
