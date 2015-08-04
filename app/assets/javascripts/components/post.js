window.loadBlogEditor = function(posts) {var fluxBlogStore = {};
 
    fluxBlogStore.constants = {
        ADD_POST: "ADD_POST"
        UPDATE_POST: "UPDATE_POST",
        DELETE_POST: "DELETE_POST",
    };
    fluxBlogStore.store = Fluxxor.createStore({
        initialize: function(options) {
            this.postId = 0;
            this.posts = options.posts || [];
            this.bindActions(fluxBlogStore.constants.ADD_POST, this.onAddPost,fluxBlogStore.constants.UPDATE_POST, this.onUpdatePost, fluxBlogStore.constants.DELETE_POST, this.onDeletePost);
      },
        getState: function() {
            return {
              posts: this.posts,
        };
      },
        onAddPost: function(payload) {
            var id = this._nextPostId();
            var post = {
              id: id,
              text: payload.text,
              complete: false
            };
            this.posts[id] = post;
            this.emit("change");
      },
        onUpdatePost: function(payload) {
            payload.post.item = payload.text;
            this.emit("change")
      },
        onDeletePost: function(payload) {
            this.posts = this.posts.filter(function(post) {
            return post.id != payload.post.id
        });
            this.emit("change");
      },
        getState: function() {
            return {
                posts: this.posts
            };
      },

        _nextPostId: function() {
            return ++this.PostId;
      }
    });
    fluxBlogStore.actions = {
        addPost: function(text) {
            this.dispatch(constants.ADD_POST, {
                text: text
            });
        $.ajax({
            type: "POST",
            url: "/posts/" + post.id,
            data: {
                item: text
            },
            success: function() {
                $.growl.notice({
                    title: "Post added",
                });
            },
            failure: function() {
                $.growl.error({
                    title: "Error adding post",
                });
            }
          });
        },
        updatePost: function(post, text) {
            this.dispatch(fluxBlogStore.constants.UPDATE_POST, {
                post: post,
                text: text
          });
        $.ajax({
            type: "PUT",
            url: "/posts/" + post.id,
            data: {
                item: new_name
            },
            success: function() {
                $.growl.notice({
                    title: "Post updated",
                });
            },
            failure: function() {
                $.growl.error({
                    title: "Error updating post",
                });
            }
        });
    },
        deletePost: function(post) {
            this.dispatch(fluxBlogStore.constants.DELETE_POST, {
                post: post
          });
          $.ajax({
            type: "DELETE",
            url: "/posts/" + post.id,
            success: function(data) {
                $.growl.notice({
                    title: "Post deleted",
                });
            }.bind(this),
            failure: function() {
                $.growl.error({
                    title: "Error deleting post ",
                });
            }
          });
        }
      };
    fluxBlogStore.init = function(posts) {
        var tempStore = {
          BlogStore: new fluxBlogStore.store({
            posts: posts
          })
        };
        fluxBlogStore.flux = new Fluxxor.Flux(tempStore, fluxBlogStore.actions);
      }
var Post = React.createClass({
    getInitialState: function() {
        return {editing: false}
    },
    componentWillMount: function(){
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 450) + 'px',
            top: this.randomBetween(0, window.innerHeight - 450) + 'px',
            transform: 'rotate(' + this.randomBetween(-10, 10) + 'deg)'
        };
    },
    componentDidMount: function() {
        $(this.getDOMNode()).draggable();
    },
    randomBetween: function(min, max) {
        return(min + Math.ceil(Math.random() * max));
    },
    edit: function() {
        this.setState({editing: true});
    },
    save: function() {
        this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
        this.setState({editing: false});
    },
    remove: function() {
        this.props.onRemove(this.props.index);
    },
    renderDisplay: function() {
        return (
            <div className="post" 
                style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit}
                            className="btn btn-primary glyphicon glyphicon-pencil"/>
                    <button onClick={this.remove}
                            className="btn btn-danger glyphicon glyphicon-trash"/>
                </span>
            </div>
            );
    },
    renderForm: function() {
        return (
            <div className="post"
                style={this.style}>
            <textarea ref="newText" defaultValue={this.props.children} 
            className="form-control"></textarea>
            <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>
            )
    },
    render: function() {
        if (this.state.editing) {
            return this.renderForm();
        }
        else {
            return this.renderDisplay();
        }
    }
});
var Blog = React.createClass({
    propTypes: {
        count: function(props, propName) {
            if (typeof props[propName] !== "number"){
                return new Error('The count property must be a number');
            }
        }
    },
    getInitialState: function(){
        return {
            posts: []
        };
    },
    nextId: function() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    },
    componentWillMount: function() {
        var self = this;
        if(this.props.count) {
            $.getJSON("http://localhost:3000/posts.json" +
                this.props.count + "&callback=?", function(results){
                    results[0].split('. ').forEach(function(sentence){
                        self.add(sentence.substring(0,80));
                    });
                });
        }
    },
    add: function(text) {
        var arr = this.state.posts;
        arr.push({
            id: this.nextId(),
            post: text
        });
        this.setState({posts: arr});
    },
    update: function(newText, i) {
        var arr = this.state.posts;
        arr[i].post = newText;
        this.setState({posts: arr});
    },
    remove: function(i) {
        var arr = this.state.posts;
        arr.splice(i, 1);
        this.setState({posts: arr});
    },
   eachPost: function(post, i) {
    return (
            <Post key={post.id}
                index={i}
                onChange={this.update}
                onRemove={this.remove}
            >{post.post}</Post>
        );
    },
    render: function() {
        return (<div className="blog">
                    {this.state.posts.map(this.eachPost)}
                    <button className="btn btn-sm btn-success glyphicon glyphicon-plus" 
                            onClick={this.add.bind(null, "New Post")}/>
        </div>
        );
    }
}); 

    fluxBlogStore.init(posts);
        React.render(<Blog count={50}/>, document.getElementById('react-container'));
}
