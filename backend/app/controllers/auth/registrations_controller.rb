class Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

  def sign_up_params
    # nameは一旦必要ぽい
    params.require(:registration).permit(:email, :password, :password_confirmation, :name)
  end
end
