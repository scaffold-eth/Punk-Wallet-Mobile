import React from 'react';
import styled from 'styled-components/native';

import { View } from 'react-native';

const SColumn = styled.View`
  flex: 1;
  justify-content: center;
`;

const Column = (props) => <SColumn {...props}>{props.children}</SColumn>;

export default Column;
