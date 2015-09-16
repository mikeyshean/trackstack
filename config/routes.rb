Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only: [:new, :create, :destroy]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show] do
      member do
        get "followers", to: "users#followers"
        post "followers", to: "users#start_following"
        delete "followers/:current_user_id", to: "users#stop_following"

        resources :tracks, param: :track_id
        resources :playlists, param: :playlist_id
      end
    end

  end
end
