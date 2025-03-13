# app/controllers/tenants_controller.rb
class TenantsController < ApplicationController
  before_action :set_tenant, only: [:show, :update, :destroy]

  # GET /tenants
  def index
    @tenants = Tenant.all
    render json: @tenants
  end

  # GET /tenants/:id
  def show
    render json: @tenant
  end

  # POST /tenants
  def create
    @tenant = Tenant.new(tenant_params)

    if @tenant.save
      render json: @tenant, status: :created, location: @tenant
    else
      render json: @tenant.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tenants/:id
  def update
    if @tenant.update(tenant_params)
      render json: @tenant
    else
      render json: @tenant.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tenants/:id
  def destroy
    @tenant.destroy
  end

  private

  def set_tenant
    @tenant = Tenant.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Tenant not found' }, status: :not_found
  end

  def tenant_params
    params.require(:tenant).permit(:name)
  end
end
