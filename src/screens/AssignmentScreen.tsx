import * as React from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';
import {BACKEND_URL} from '../utility/constants';

export default function AssignmentScreen({ route } : any) {

  const { id } = route?.params;

  const token = route?.params?.token;


  return (<View style={{ flex : 1}}>

    <WebView
      source={{ uri: `${BACKEND_URL}/assignments/${id}?token=${token}` }}
    />

  </View>);
}

