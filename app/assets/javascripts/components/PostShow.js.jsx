window.PostShow = React.createClass({
  render: function() {
    return (
      <div>
          <div className="row">
             <div className="col-md-10 col-md-offset-1">
                <p id="notice">{this.props.notice}</p>
                <h2>
                  {this.props.title}
                </h2>
                <p>
                   {this.props.body}
                </p>

                <a href={this.props.edit_path} className='btn btn-primary glyphicon glyphicon-pencil'>Edit</a>
                <a href={this.props.destroy_path} data-method="DELETE" data-confirm="Are you sure?" className="btn btn-danger glyphicon glyphicon-trash">Destroy</a>
                <a href={this.props.back_path} className='btn btn-default glyphicon glyphicon-chevron-left'>Back</a>
            </div>
            </div>
      </div>
    );
  }
});
