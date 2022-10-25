import React from 'react';
import styled from 'styled-components/native';

import { Text } from 'react-native';

const SText = styled.Text`
    height: 40;
    borderWidth: 1;
`;

const STextt = (props) => <SText {...props}>{props.children}</SText>;

export default STextt;
