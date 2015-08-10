window.PostForm = React.createClass({
    handleSubmit: function() {
        var title = this.refs.title.getDOMNode().value.trim();
        var body = this.refs.body.getDOMNode().value.trim();
        this.props.onPostSubmit({title: title, body: body});
        this.refs.title.getDOMNode().value = '';
        this.refs.body.getDOMNode().value = '';
        return false;
    },
    render: function() {
      var errors = null;
      if(this.props.errors.length > 0) {
        var errorsList = [];
        for(var i = 0; i < this.props.errors.length; ++i) {
          errorsList.push(<li key={"error-" + i}>{this.props.errors[i]}</li>)
        }

        errors = (
          <div id="error_explanation">
            <h2>Errors prohibited this post from being saved:</h2>
            <ul>
              {errorsList}
            </ul>
          </div>
        );
    }

    return (
      <div className="form-group">
          <form action={this.props.form_path} >
            {errors}
              <label htmlFor="title">Title:</label>
              <input type="text" className="form-control" id="title" name="post[title]" defaultValue={this.props.title} />
              <label htmlFor="body">Body:</label>
              <textarea className="form-control" rows="3"id="body" name="post[body]" defaultValue={this.props.body} />
            <div className="actions">
              <button type="submit" className='btn btn-success'>Submit</button>
            </div>
        </form>
    </div>
    );
  }
});



var CommentForm = React.createClass({
  handleSubmit: function() {
    var author = this.refs.author.getDOMNode().value.trim();
    var comment = this.refs.comment.getDOMNode().value.trim();
    this.props.onCommentSubmit({author: author, comment: comment});
    this.refs.author.getDOMNode().value = '';
    this.refs.comment.getDOMNode().value = '';
    return false;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="comment" />
        <input type="submit" value="Post" />
      </form>
      );
  }
});
