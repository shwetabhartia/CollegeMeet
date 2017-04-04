import React, { Component } from 'react';
import { store } from '..';
import { FormGroup, ControlLabel, FormControl, Button, Collapse } from 'react-bootstrap';
import { createComment } from '../actions';

class CommentBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pid: props.pid,
            open: false,
            text: ''
        }

        this.toggleOpen = this.toggleOpen.bind(this)
        this.handleTextBoxChange = this.handleTextBoxChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    toggleOpen() {
        this.setState({open: !this.state.open})
    }

    handleTextBoxChange(e) {
        this.setState({text: e.target.value})
    }

    handleSubmit(e) {
        console.log(this.state.pid)
        console.log(store.getState().session.uid)
        console.log(store.getState().topicPage.name)
        store.dispatch(createComment(this.state.pid, store.getState().session.uid, this.state.text, store.getState().topicPage.name))
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggleOpen}>Make Comment</Button>
                <Collapse in={this.state.open}>
                <div>
                    <FormGroup>
                        <ControlLabel>Comment</ControlLabel>
                        <FormControl componentClass="textarea" placeholder="Comment Content" value={this.state.text} onChange={this.handleTextBoxChange} />
                        <Button onClick={this.handleSubmit}>Submit</Button>
                    </FormGroup>
                </div>
                </Collapse>
            </div>
        )
    }
}

export default CommentBox;