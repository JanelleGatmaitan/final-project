import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Libre Baskerville',
    body: 'Lato'
  },

  colors: {
    gray: '#f0f0f0',
    green: '#61b15a',
    darkGreen: '#367330',
    lightGreen: '#c4e3cb',
    lightRed: '#ed6666',
    darkRed: '#c43d48'
  },

  fixed: {
    position: 'fixed'
  },

  components: {
    Link: {
      variants: {
        navLink: {
          fontSize: '16px',
          fontWeight: 'bold'
        }
      }
    }
  }
});

export default theme;
