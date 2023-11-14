Rails.application.routes.draw do
  resources :simulations
  post '/simulations/:id', to: 'simulations#update' # post は create。 update は PUT でやるのが通常
  resources :annual_simulations
  post '/annual_simulations/:id', to: 'annual_simulations#update' # 同上
  # ユーザー情報系
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations'
  }
  namespace :auth do
    resources :sessions, only: %i[index]
  end
end
