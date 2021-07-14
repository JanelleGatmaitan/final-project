import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Libre Baskerville',
    body: 'Lato'
  },

  colors: {
    gray: '#f0f0f0',
    green: '#61b15a',
    red: '#c43d48'
  }
});

export default theme;
