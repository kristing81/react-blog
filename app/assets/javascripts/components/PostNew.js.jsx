window.PostNew = React.createClass({
    render: function() {
        return (
            <div>
                <h1>New Post</h1>
                <PostForm {...this.props} />
                <a href={this.props.back_path}>Back</a>
            </div>
        );
    }
});