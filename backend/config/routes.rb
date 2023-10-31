Rails.application.routes.draw do
  get 'simulation_results', to: 'simulation_results#index'
  post 'simulation_results', to: 'simulation_results#create'
end
