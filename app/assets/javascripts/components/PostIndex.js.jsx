window.PostsIndex = React.createClass({
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
    render: function() {
        var posts = [];
        for(var i = 0; i < this.props.posts.length; ++i) {
            posts.push(
                <div key={this.props.posts[i].id}>
                    <h3>{this.props.posts[i].title}</h3>
                    <h6>Posted on: {this.props.posts[i].created_at}</h6>
                    <br/>
                    <p>{this.props.posts[i].body}
                        &nbsp;<a href={this.props.posts[i].show_path}>Show</a>
                    </p>
                </div>
            );
        }

        return (
            <div className="row">
                <div className="col-md-10 col-md-offset-1">            
                    <p id="notice">{this.props.notice}</p>
                    <h1>Recent Posts</h1>
                    <div>
                        {posts}
                    </div>
                    <br />
                    <a href={this.props.new_post_path} className='btn btn-success'>New post</a>
                </div>
            </div>
        );
    }
});

