Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only: [:new, :create, :destroy]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show] do
      get "followers", on: :member, to: "users#followers"
      post "followers", on: :member, to: "users#start_following"
      delete "followers/:current_user_id", on: :member, to: "users#stop_following"
    end

  end
end
