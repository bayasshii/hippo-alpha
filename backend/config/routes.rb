Rails.application.routes.draw do
  get 'assumed_yields/new'
  get 'simulation_results', to: 'simulation_results#index'
  post 'simulation_results', to: 'simulation_results#create'
  get 'assumed_yields', to: 'assumed_yields#index'
end