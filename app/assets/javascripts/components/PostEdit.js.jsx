window.PostEdit = React.createClass({
    getInitialState: function () {
        return {posts: []};
     },
    componentDidMount: function () {
        this.loadPostsFromServer();
    },

    loadPostsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (posts) {
            this.setState({posts: posts});
            }.bind(this),
            error: function (xhr, status, err) {
            console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handlePostSubmit: function(post) {
    var posts = this.state.posts;
    var newPosts = posts.concat([post]);
    this.setState({posts: posts});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'PATCH',
      data: {"post": post},
      success: function(data) {
        this.loadCommentsFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
    render: function() {
        return (
            <div>
                 <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <h1>Editing Post</h1>
                        <PostForm {...this.props} />
                        <a href={this.props.show_path} className='btn btn-primary'>Show</a> 
                        <a href={this.props.back_path} className='btn btn-default glyphicon glyphicon-chevron-left'>Back</a>
                    </div>
                </div>
            </div>
        );
    }
});

