class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User

  # メタプロ
  # attributes :name, :email ← 内部でこれが行われている
  # だから user.name ができる

  has_many :simulations, dependent: :destroy
end

# class User
#   name: string
#   email: string
# end

# user.simulations => user に紐づくすべての simulations
# user.simulations.where(created_at: '2023-11-14')