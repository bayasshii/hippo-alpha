simulation1 = Simulation.create!(
    title: 'title⭐️test1',
    principal: 3000000,
)

# yearを30年分作成
(0..29).each do |i|
    AnnualSimulation.create!(
        simulation: simulation1,
        simulation_id: 1,
        year: i,
        monthly_deposit: 100000,
        rate: 5,
    )
end
