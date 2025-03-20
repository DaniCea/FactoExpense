class User < ApplicationRecord
  has_secure_password

  enum :role, [ :employee, :admin ]

  belongs_to :tenant
  validates :tenant, presence: true

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP, message: "is not a valid email address" }

  validates :role, presence: true

  # Set default role to 'employee' when a user is initialized
  after_initialize :set_default_role, if: :new_record?

  private

  def set_default_role
    self.role ||= :employee
  end
end
