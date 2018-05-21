import * as React from "react";
import { RouteComponentProps } from "react-router";
import "isomorphic-fetch";
import { Post } from "../models/post";
import { PostService } from "../service/postService";
import { AddPostDialog } from "./AddPostDialog";
import { CommentsGridDialog } from "./CommentsGridDialog";
import { Comment } from "../models/comment";

interface PostsGridState {
    posts: Post[];
    comments: Comment[];
    isLoading: boolean;
    isOpenNewPostDialog: boolean;
    isOpenCommentsDialog: boolean;
    error: string;
}

export class PostsGrid extends React.Component<RouteComponentProps<{}>, PostsGridState> {

    private service: PostService = new PostService();

    constructor() {
        super();
        this.state = this.getInitialState();
    }

    componentWillMount() {
        this.service.fetchPosts()
            .then(data => {
                this.setState({
                    posts: data,
                    isLoading: false,
                    error: ""
                });
            }).catch(error => {
                console.log(error);
                this.setState({ error: error });
            });

    }

    private getInitialState(): PostsGridState {
        return {
            posts: [],
            comments: [],
            isLoading: true,
            isOpenNewPostDialog: false,
            isOpenCommentsDialog: false,
            error: ""
        }
    }

    public render() {
        let contents = this.state.isLoading
            ? <p><em>Loading...</em></p>
            : this.renderPostsTable(this.state.posts);

        return <div>
            <h1>Posts</h1>
            <div className="pull-right">
                <button type="button" className="btn btn-primary btn-lg" onClick={() => this.openNewPostDialog()}>Add Post</button>
            </div>
            {contents}

            {this.state.isOpenNewPostDialog &&
                <AddPostDialog
                    isOpenDialog={this.state.isOpenNewPostDialog}
                    save={(post) => this.AddRow(post)}
                    closeDialog={() => this.closeNewPostDialog()} />}

            {this.state.isOpenCommentsDialog &&
                <CommentsGridDialog
                    comments={this.state.comments}
                    isOpenDialog={this.state.isOpenCommentsDialog}
                    closeDialog={() => this.closeCommentsDialog()} />
            }
        </div>;
    }

    openNewPostDialog(): void {
        this.setState({
            isOpenNewPostDialog: true
        });
    }

    closeNewPostDialog(): void {
        this.setState({
            isOpenNewPostDialog: false
        });
    }

    openCommentsDialog(postId: number): void {
        this.service.fetchCommnts(postId).then(data => {
            this.setState({
                comments: data,
                isOpenCommentsDialog: true
            });
        });
    }

    closeCommentsDialog(): void {
        this.setState({
            comments: [],
            isOpenCommentsDialog: false
        });
    }

    private renderPostsTable(posts: Post[]) {
        return <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>User Id</th>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Body</th>
                    <th>Delete</th>
                    <th>Show comments</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post, i) =>
                    <tr key={i}>
                        <td>{post.userId}</td>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => this.deleteRow(post)}>Delete</button>
                        </td>
                        <td>
                            <button className="btn btn-info" onClick={() => this.openCommentsDialog(post.id)}>Show comments</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }

    private deleteRow(post: Post) {
        this.service.deletePost(post.id)
            .then(response => {
                let posts = this.state.posts;
                var index = posts.indexOf(post);
                if (index > -1) {
                    posts.splice(index, 1);
                }
                this.setState({
                    posts: posts,
                    error: ""
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({ error: error });
            });
    }

    private AddRow(post: Post) {
        this.service.addPost(post)
            .then(addedPost => {
                let posts = this.state.posts;
                post.id = addedPost.id;
                posts.push(post);
                this.setState({
                    posts: posts,
                    error: ""
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({ error: error });
            });
    }
}
