import * as React from "react";
import { Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { PostsGrid } from "./components/PostsGrid";

export const routes = <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/posts" component={PostsGrid} />
    
</Layout>;
