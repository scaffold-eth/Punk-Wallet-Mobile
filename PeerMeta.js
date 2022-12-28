import React from 'react';
import { Image, Text, View } from 'react-native';

import styled from 'styled-components/native';

import Anchor from "./Anchor";

const SCenter = styled.Text`
  text-align: center;
`;

const SName = styled(SCenter)`
  font-weight: bold;
  margin-bottom: 25px;
`;

const SIcon = styled.Image`
  width: 55px;
  height: 55px;
  margin: 0 auto;
`;

export default function PeerMeta({ peerMeta, connected }) {
  console.log("connectedconnecteddd", connected);
  return (
      <>
        <SIcon 
          source={{uri: peerMeta.icons[0]}} 
         />
         <SName>{peerMeta.name}</SName>
         {!connected && <SCenter>{peerMeta.description}</SCenter>}
         {!connected && <Anchor href={peerMeta.url}>{peerMeta.url}</Anchor>}
      </>
    );
}

