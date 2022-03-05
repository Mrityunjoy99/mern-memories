import React, { useEffect, useState } from 'react'

import { Button, Paper, TextField, Typography } from '@material-ui/core'
import FileBase from 'react-file-base64'
import useStyles from './styles.js'
import { useDispatch, useSelector } from 'react-redux';
import { createPost,updatePost } from '../../Actions/posts.js';

const Form = ({CurrentId,setCurrentId}) => {
    const [postData, setPostData] = useState({ title: '', message: '', selectedFile: '', creator: '', tags: '' })
    const post = useSelector((state)=>(CurrentId ? (state.posts.find((data) => data._id === CurrentId)) : null));
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(post) setPostData(post);
    }, [post]);

    const clear = () => {
        // e.preventDefault();
        setCurrentId(0);
        setPostData({ title:'', message:'', selectedFile:'', creator:'', tags:'' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (CurrentId) {
            dispatch(updatePost(CurrentId,postData));
        } else {
            
            dispatch(createPost(postData));
        }
        clear();
    }

    
    return (
        <>
            <Paper elevation={3} className = {classes.paper}>
                <form onSubmit={handleSubmit} className = {`${classes.form} ${classes.root}`}>
                    <Typography varient='h1'>Creating a memory</Typography>
                    <TextField name="Creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                    <TextField required name="Title" variant="outlined" label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                    <TextField name="Tags" variant="outlined" label='Tags' fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                    <TextField name="Description" variant="outlined" label="Description" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                    <div className={classes.fileInput}><FileBase type='file' multiple = {false}  onDone = {({base64})=>{setPostData({...postData,selectedFile: base64})}}/></div>
                    <Button variant='contained' color='primary' className={classes.buttonSubmit} type='submit' fullWidth>Submit</Button>
                    <Button variant='outlined' color='secondary' className={classes.buttonSubmit} onClick = {clear} fullWidth>Clear</Button>
                    
                </form>
            </Paper>
        </>
    )
}

export default Form