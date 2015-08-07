window.PostsIndex = React.createClass({
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
