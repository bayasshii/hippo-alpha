Rails.application.routes.draw do
  resources :simulations
  resources :annual_simulations do
    collection do
      delete 'delete_all', to: 'annual_simulations#delete_all'
    end
  end
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations',
    confirmations: 'auth/confirmations'
  }
  namespace :auth do
    resources :sessions, only: %i[index]
  end
end