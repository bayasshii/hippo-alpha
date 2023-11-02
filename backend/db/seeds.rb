simulation_result1 = SimulationResult.create!(
    title: 'title test1',
    principal: 100000,
)
simulation_result2 = SimulationResult.create!(
    title: 'title test2',
    principal: 100000,
)



AssumedYield.create!(
    simulation_result: simulation_result1,
    simulation_result_id: 1,
    rate: 0.01,
    order: 1,
    year: 1,
)
AssumedYield.create!(
    simulation_result: simulation_result1,
    simulation_result_id: 1,
    rate: 0.3,
    order: 2,
    year: 3,
)
AssumedYield.create!(
    simulation_result: simulation_result2,
    simulation_result_id: 2,
    rate: 0.01,
    order: 1,
    year: 1,
)
AssumedYield.create!(
    simulation_result: simulation_result2,
    simulation_result_id: 2,
    rate: 0.3,
    order: 2,
    year: 3,
)