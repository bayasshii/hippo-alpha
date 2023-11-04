simulation1 = Simulation.create!(
    title: 'title⭐️test1',
    principal: 100000,
)


AssumedYield.create!(
    
    simulation: simulation1,
    simulation_id: 1,
    rate: 3,
    order: 1,
    year: 10,
)
AssumedYield.create!(
    simulation: simulation1,
    simulation_id: 1,
    rate: 5,
    order: 1,
    year: 5,
)

MonthlyDeposit.create!(
    simulation: simulation1,
    simulation_id: 1,
    amount: 10000,
    order: 1,
    year: 8,
)
MonthlyDeposit.create!(
    simulation: simulation1,
    simulation_id: 1,
    amount: 500,
    order: 1,
    year: 3,
)
MonthlyDeposit.create!(
    simulation: simulation1,
    simulation_id: 1,
    amount: 5000,
    order: 1,
    year: 4,
)