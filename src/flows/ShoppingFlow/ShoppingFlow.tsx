import React from 'react'
import type { FC } from 'react'
import { Grid } from '@material-ui/core'

export const ShoppingFlow: FC<{}> = () => {
  const style = {
    padding: '4em',
    border: '1px solid #5565FD',
    borderRadius: '8px'
  }

  return (
    <Grid container style={{ margin: '4em 0' }} spacing={3} >
      <Grid item>
        <div style={style}>Grid Item 1</div>
      </Grid>
      <Grid item>
        <div style={style}>Grid Item 2</div>
      </Grid>
      <Grid item>
        <div style={style}>Grid Item 3</div>
      </Grid>
      <Grid item>
        <div style={style}>Grid Item 4</div>
      </Grid>
    </Grid >
  )
}
