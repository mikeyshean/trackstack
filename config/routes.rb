Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only: [:new, :create, :destroy]
  get "/auth/facebook/callback", to: "api/sessions#omniauth"

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:index, :show, :update] do
      member do
        get "followers", to: "users#followers"
        post "followers", to: "followers#create"
        delete "followers/:current_user_id", to: "followers#destroy"
        get "feed", to: "feeds#index"

        resources :tracks, param: :track_id, only: [:index, :create, :show ]
        resources :playlists, param: :playlist_id
      end
    end
    resources :tracks, only: [:show, :create, :update, :destroy]
  end
end
