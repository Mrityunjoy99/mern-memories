import { AppBar, Container, Grid, Grow, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getPosts } from './Actions/posts';
import Form from './components/Forms/Form'
import Posts from './components/Posts/Posts'
import useStyles from './styles';
import memoryImg from './images/memories.png';

const App = () => {
    const dispatch = useDispatch();
    const [CurrentId, setCurrentId] = useState(0);
    const classes = useStyles();
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);
    return (
        <Container maxWidth='lg'>
            {/* <div>CurrentId = { CurrentId}</div> */}
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <Typography className={classes.heading} variant='h2' align='center'>MyMemorys</Typography>
                <img className={classes.image} src={memoryImg} alt='icon' height='60' />
            </AppBar>
            
            <Grow in>
                <Container>
                    <Grid container justify='space-between' alighItems='space-between' spacing={3}>
                        <Grid item xs={12} sm={8}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form CurrentId={CurrentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>


        </Container>
    )
}

export default App