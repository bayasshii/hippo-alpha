Rails.application.routes.draw do
  resources :simulation_results
  post '/simulation_results/:id', to: 'simulation_results#update'
  resources :assumed_yields
end