class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def index
    @posts = Post.all
    render :index, layout: 'application'
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

    respond_to do |format|
      if @post.save
        render json: @post
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end
  end

  def update
    respond_to do |format|
      if @post.update(post_params)
        render json: @post
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end
  end

  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to posts_url }
      format.json { head :no_content }
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
