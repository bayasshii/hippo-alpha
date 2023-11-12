class ApplicationController < ActionController::API
  # SetUserByTokenって拡張機能を使えるようにする
  include DeviseTokenAuth::Concerns::SetUserByToken
end
