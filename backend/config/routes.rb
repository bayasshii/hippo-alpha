Rails.application.routes.draw do
  resources :simulations
  post '/simulations/:id', to: 'simulations#update'
  resources :assumed_yields
  resources :monthly_deposits
end