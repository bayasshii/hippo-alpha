Rails.application.routes.draw do
  resources :simulations
  post '/simulations/:id', to: 'simulations#update'
  resources :annual_simulations
  post '/annual_simulations/:id', to: 'annual_simulations#update'
end