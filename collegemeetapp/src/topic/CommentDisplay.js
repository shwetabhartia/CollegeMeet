import React, { Component } from 'react';
import { Button, Collapse } from 'react-bootstrap'
import CommentBox from './CommentBox';
import CommentList from '../lists/CommentList';

class CommentDisplay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            comments: props.comments,
            pid: props.pid,
            open: false,
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleClick}>Show Comments</Button>
                <Collapse in={this.state.open}>
                    <div>
                        <CommentBox pid={this.state.pid} />
                        <CommentList comments={this.state.comments} />
                    </div>
                </Collapse>
            </div>
        )
    }
}

export default CommentDisplay;