class Auth::SessionsController < ApplicationController
  # 自分自身の情報を取りたい？
  # これは言いたいことはわかるが不要になる
  # front 側で叩いて、ログインしてるかどうかを確認したい？
  # 認証が切れてる = api(rails) の処理がうまく行かないべき = http status 401 を返す
  def index
    if current_user
      render json: {is_login: true, data: current_user }
    else
      render json: {is_login: false, message: "ユーザーが存在しません"}
    end
  end

  # current_user を返したい
  # Auth::SessionsController の命名が気になる
  # Auth は認証の操作をするものに思える
  # Sessions は ログイン/ログアウト するものに見える

  # User::MeController 
  # Mine
  # CurrentUserInfoController
end
