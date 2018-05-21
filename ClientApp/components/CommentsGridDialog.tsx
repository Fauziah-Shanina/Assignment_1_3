import * as React from "react";
import { RouteComponentProps } from "react-router";
import "isomorphic-fetch";
import { Comment } from "../models/comment";
import { PostService } from "../service/postService";
import * as AriaModal from "react-aria-modal";

interface CommentsGridDialogState {
    comments: Comment[];
}

interface CommentsGridDialogProps {
    comments: Comment[];
    isOpenDialog: boolean;
    closeDialog(): void;
}

export class CommentsGridDialog extends React.Component<CommentsGridDialogProps, CommentsGridDialogState> {

    constructor(props: CommentsGridDialogProps) {
        super(props);
        this.state = { comments: this.props.comments };
    }

    public render() {
        let contents = !this.state.comments || !this.state.comments.length
            ? <p><em>Loading...</em></p>
            : this.renderCommentsTable(this.state.comments);

        return <AriaModal
            titleText="Comments"
            onExit={this.props.closeDialog}>
            <div className="panel panel-info">
                <div className="panel-heading">
                    <button type="button" className="close" onClick={() => this.props.closeDialog()}>&times;</button>
                    <h1>Comments</h1>
                </div>
                <div className="panel-body">
                    {contents}
                </div>
                <div className="panel-footer">
                    <button type="button" className="btn btn-danger" onClick={() => this.props.closeDialog()}>Close</button>
                </div>
            </div>
        </AriaModal>;
    }

    private renderCommentsTable(comments: Comment[]) {
        return <table className="table table-striped table-condensed">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Body</th>
                </tr>
            </thead>
            <tbody>
                {comments.map((comment, i) =>
                    <tr key={i}>
                        <td>{comment.id}</td>
                        <td>{comment.name}</td>
                        <td>{comment.email}</td>
                        <td>{comment.body}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

