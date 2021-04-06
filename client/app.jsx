import React from 'react';
import Search from './pages/search';
import Drawer from './components/drawer';
import PageContainer from './components/page-container';

export default class App extends React.Component {
  render() {
    return (
    <>
        <Drawer />
    <PageContainer>
          <Search />
    </PageContainer>
    </>
    );
  }
}
