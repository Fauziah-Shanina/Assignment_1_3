import { Post } from "../models/post";
import { Comment } from "../models/comment";

const apiUrl = "api/post";

export class PostService {

    fetchPosts(): Promise<Post[]> {
        return fetch(apiUrl + "/posts")
            .then(response => response.json() as Promise<Post[]>);
    }

    fetchCommnts(postId: number): Promise<Comment[]> {
        return fetch(apiUrl + "/post/" + postId + "/comments")
            .then(response => response.json() as Promise<Comment[]>);
    }

    addPost(post: Post): Promise<Post> {
        return fetch(apiUrl + "/post", {
            method: "POST",
            body: JSON.stringify({ post: post }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json() as Promise<Post>);
    }

    deletePost(id: number): Promise<Response> {
        return fetch(apiUrl + "/post/" + id, {
            method: "DELETE"
        });
    }
}