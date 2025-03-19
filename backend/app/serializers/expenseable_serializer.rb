class ExpenseableSerializer < ActiveModel::Serializer
  # This is a fallback to ensure polymorphic relationships are serialized correctly
  def self.serializer_for(expenseable)
    case expenseable
    when TravelExpense
      TravelExpenseSerializer
    when MileageExpense
      MileageExpenseSerializer
    else
      ActiveModel::Serializer
    end
  end
end