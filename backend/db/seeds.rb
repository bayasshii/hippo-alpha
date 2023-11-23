user1 = User.create!(
    name: 'user1',
    email: 'hogehoge@hogehoge.com',
    password: 'testtest',
    confirmed_at: DateTime.now
)

simulation1 = Simulation.create!(
    title: 'title⭐️test1',
    principal: 3000000,
    user_id: 1
)

# yearを100年分作成
(0..99).each do |i|
    AnnualSimulation.create!(
        simulation: simulation1,
        simulation_id: 1,
        year: i,
        monthly_deposit: 100000,
        rate: 5,
    )
end
