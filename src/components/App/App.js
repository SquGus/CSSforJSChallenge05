import styled, { ThemeProvider } from 'styled-components/macro';

import { BREAKPOINTS } from '../../constants';
import Header from '../Header';
import React from 'react';
import ShoeIndex from '../ShoeIndex';

function debounce(fn, ms)  {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(_ => {
      timer = null;
      fn.apply(this, arguments)
    }, ms);
  };
}

const App = () => {
  const [sortId, setSortId] = React.useState('newest');

  const [theme, setTheme] = React.useState({
    size: 'laptop'
  });

  React.useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      if (width >= BREAKPOINTS.laptop) {
        setTheme({ size: "laptop" });
      } else if (width >= BREAKPOINTS.tablet) {
        setTheme({ size: "tablet" });
      } else {
        setTheme({ size: "phone" });
      }
    }, 500);

    window.addEventListener('resize', debouncedHandleResize);

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Main>
        <ShoeIndex sortId={sortId} setSortId={setSortId} />
      </Main>
    </ThemeProvider>
  );
};

const Main = styled.main`
  padding: 64px 32px;
  --size: ${props => props.theme.size};
`;

export default App;
