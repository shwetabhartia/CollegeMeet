import React, { Component } from 'react';
import { store } from '..';
import { FormGroup, ControlLabel, FormControl, Button, Collapse } from 'react-bootstrap';
import { createPost } from '../actions';

class PostBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            title: '',
            text: ''
        }

        this.toggleOpen = this.toggleOpen.bind(this)
        this.handleTextBoxChange = this.handleTextBoxChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    toggleOpen() {
        this.setState({open: !this.state.open})
    }

    handleTitleChange(e) {
        this.setState({title: e.target.value})
    }

    handleTextBoxChange(e) {
        this.setState({text: e.target.value})
    }

    handleSubmit(e) {
        store.dispatch(createPost(store.getState().topicPage.name, store.getState().session.uid, this.state.title, this.state.text))
        this.setState({title: '', text: ''})
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggleOpen}>Make Post</Button>
                <Collapse in={this.state.open}>
                <div>
                    <FormGroup>
                        <ControlLabel>Title</ControlLabel>
                        <FormControl componentClass="input" placeholder="Post Title" value={this.state.title} onChange={this.handleTitleChange} />
                        <ControlLabel>Text</ControlLabel>
                        <FormControl componentClass="textarea" placeholder="Post Content" value={this.state.text} onChange={this.handleTextBoxChange} />
                        <Button onClick={this.handleSubmit}>Submit</Button>
                    </FormGroup>
                </div>
                </Collapse>
                
            </div>
        )
    }
}

export default PostBox;