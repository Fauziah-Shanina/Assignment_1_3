import * as React from "react";
import { RouteComponentProps } from "react-router";
import { SyntheticEvent } from "react";
import * as AriaModal from "react-aria-modal";
import { Post } from "../models/post";

interface AddPostDialogState {
    newPost: Post;
}

interface AddPostDialogProps {
    isOpenDialog: boolean;
    save(post: Post): void;
    closeDialog(): void;
}

export class AddPostDialog extends React.Component<AddPostDialogProps, AddPostDialogState> {
    constructor(props: AddPostDialogProps) {
        super(props);
        this.state = {
            newPost: this.initPost(),
        };
    }

    onChange(propName: keyof Post, event: SyntheticEvent<HTMLInputElement>) {
        let post = this.state.newPost;
        post[propName] = event.currentTarget.value;
        this.setState({
            newPost: post
        });
    }

    public render() {
        let post = this.state.newPost;
        return <AriaModal
            titleText="New Post"
            onExit={this.props.closeDialog}>

            <div className="panel panel-primary">
                <div className="panel-heading">
                    <button type="button" className="close" onClick={() => this.props.closeDialog()}>&times;</button>
                    <h4>New Post</h4>
                </div>
                <div className="panel-body" >
                    <div className="form-group">
                        <label>User Id:</label>
                        <input type="text" className="form-control" value={post.userId} onChange={e => this.onChange("userId", e)} />
                    </div>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" value={post.title} onChange={e => this.onChange("title", e)} />
                    </div>
                    <div className="form-group">
                        <label>Body</label>
                        <input type="text" className="form-control" value={post.body} onChange={e => this.onChange("body", e)} />
                    </div>
                </div>
                <div className="panel-footer">
                    <button type="button" className="btn btn-success" onClick={() => { this.save(post) }}>Save</button>
                    <button type="button" className="btn btn-danger" onClick={() => this.props.closeDialog()}>Close</button>
                </div>
            </div>
        </AriaModal>;
    }

    save(post: Post) {
        this.props.save(post);
        this.props.closeDialog();
        this.setState({
            newPost: this.initPost(),
        });
    }

    initPost(): Post {
        return {
            userId: 0,
            body: "",
            title: "",
            id: 0,
        };
    }
}

