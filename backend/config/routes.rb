Rails.application.routes.draw do
  resources :simulations
  post '/simulations/:id', to: 'simulations#update'
  resources :annual_simulations
  post '/annual_simulations/:id', to: 'annual_simulations#update'
  # ユーザー情報系
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations'
  }
  namespace :auth do
    resources :sessions, only: %i[index]
  end
end
