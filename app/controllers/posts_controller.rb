class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  respond_to :html, :json
  
  def index
    @posts = Post.all
    render "index", layout: 'application'
  end

  def show
    render :show, layout: 'application'
  end

  def new
    @post = Post.new
    render :new, layout: 'application'
  end

  def edit
    render :edit, layout: 'application'
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @post.destroy
      respond_to do |format|
      format.html { redirect_to posts_url }
      format.json { head :no_content }
      end
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  private
    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:title, :body, :user_id)
    end

end
