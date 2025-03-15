class User < ApplicationRecord
  has_secure_password

  belongs_to :tenant
  validates :tenant, presence: true

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP, message: "is not a valid email address" }

  validates :role, inclusion: { in: %w[employee admin] }
end
