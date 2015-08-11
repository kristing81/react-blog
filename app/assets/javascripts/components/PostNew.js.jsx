window.PostNew = React.createClass({
    render: function() {
        return (
            <div>
                <h1>New Post</h1>
                <PostForm {...this.props} />
                <a href={this.props.back_path}  className='btn btn-default glyphicon glyphicon-chevron-left'>Back</a>
            </div>
        );
    }
});
