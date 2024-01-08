Rails.application.routes.draw do
  resources :simulations
  resources :annual_simulations do
    collection do
      delete 'delete_all', to: 'annual_simulations#delete_all'
    end
  end
  
  # 一発でsimulationとannual_simulationsを作成/更新するためのルーティング
  post '/simulations/create_simulation_and_annual_simulations', to: 'simulations#create_simulation_and_annual_simulations'
  put '/simulations/update_simulation_and_annual_simulations/:id', to: 'simulations#update_simulation_and_annual_simulations'

  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations',
    confirmations: 'auth/confirmations'
  }
  namespace :auth do
    resources :sessions, only: %i[index]
  end
end