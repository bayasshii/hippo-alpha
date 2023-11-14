class Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

  # DeviseTokenAuth::RegistrationsController の sign_up_params を上書きしてる?
  # 必要ないようにも見える
  def sign_up_params
    params.require(:registration).permit(:email, :password, :password_confirmation, :name)
  end
end
