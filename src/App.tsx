import React from 'react';
import './App.css';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Button, CssBaseline, Grid, Menu, MenuItem, ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from './lib'
import * as Flows from './flows'
import * as Pages from './pages'

function App() {
  const [themeType, setThemeType] = React.useState<'dark' | 'light'>('light')
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const theme = createMuiTheme(
    {
      color: { type: themeType, primary: { main: '#008FB2' } },
    }
  )

  const toggleThemeType = (currentTheme: any) => {
    if (currentTheme === 'dark') {
      setThemeType('light')
    } else if (currentTheme === 'light') {
      setThemeType('dark')
    }
  }

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) return
    setOpen(false)
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Grid container style={{ padding: '2em' }}>
          <Grid container justify='space-between'>
            <Button variant='contained' color='primary' onClick={() => setOpen(true)}>☰</Button>
            <Menu open={open} onClose={handleClose}>
              <Link className='router-link' to='/pages/Home'>
                <MenuItem onClick={handleClose}>Home</MenuItem>
              </Link>
              <Link className='router-link' to='/flows/ShoppingFlow'>
                <MenuItem onClick={handleClose}>Shopping Flow</MenuItem>
              </Link>
            </Menu>
            <Button variant='contained' color='primary' onClick={() => toggleThemeType(themeType)}>Toggle Theme</Button>
          </Grid>

          <Switch>
            <Route path="/pages/Home" component={() => <Pages.Home />} />
            <Route path="/flows/ShoppingFlow" component={() => <Flows.ShoppingFlow />} />
          </Switch>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default App;
