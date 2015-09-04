window.PostEdit = React.createClass({
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

