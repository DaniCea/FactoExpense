class User < ApplicationRecord
  has_secure_password

  belongs_to :tenant
  validates :tenant, presence: true
  validates :email, presence: true, uniqueness: true
end
