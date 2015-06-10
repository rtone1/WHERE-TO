class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end
  def create
    user = User.create( user_params )
      if(user.save)
      
        redirect_to '/'
      else
        redirect_to '/'
      end
  end

  def destroy
    authenticate!
    User.destroy( params[:id] )
    redirect_to "/"
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
