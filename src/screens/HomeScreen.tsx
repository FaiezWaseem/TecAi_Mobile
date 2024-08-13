import * as React from 'react';
import Text from '../components/Text';
import Box from '../components/Box';
import Button from '../components/Button';

export default function HomeScreen() {
  return (
    <Box flex justifyContent='center' alignItems='center'>
      <Text fontSize={22} color='black' >Home Screen</Text>
      <Button btnOutline color='red' >Click Me</Button>
    </Box>
  );
}