window.PostsIndex = React.createClass({
    render: function() {
        var posts = [];
        for(var i = 0; i < this.props.posts.length; ++i) {
            posts.push(
                <tr key={this.props.posts[i].id}>
                    <td>{this.props.posts[i].title}</td>
                    <td>{this.props.posts[i].body}</td>
                    <td>
                        <a href={this.props.posts[i].show_path}>Show</a>
                    </td>
                    <td>
                        <a href={this.props.posts[i].edit_path}>Edit</a>
                    </td>
                    <td>
                        <a href={this.props.posts[i].destroy_path} data-method="DELETE" data-confirm="Are you sure?">Destroy</a>
                    </td>
                </tr>
            );
        }

        return (
            <div>
                <p id="notice">{this.props.notice}</p>
                <h1>Listing Posts</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Body</th>
                        <th colSpan="3"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts}
                    </tbody>
                </table>
                <br />
                <a href={this.props.new_post_path}>New post</a>
            </div>
        );
    }
});
