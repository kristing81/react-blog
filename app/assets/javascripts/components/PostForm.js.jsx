window.PostForm = React.createClass({
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
      <form action={this.props.form_path} >
        {errors}
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="post[title]" defaultValue={this.props.title} />
        </div>
        <div className="field">
          <label htmlFor="body">Body:</label>
          <input type="textarea" id="body" name="post[body]" defaultValue={this.props.body} />
        </div>
        <div className="actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
});
