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
        resources :playlists, param: :playlist_id, only: [:index, :show]
      end
    end
    resources :tracks, only: [:create, :update, :destroy] do
      member do
        get "likes", to: "tracks#likes"
        post "likes", to: "tracks#create_like"
        delete "likes/:liker_id", to: "tracks#destroy_like"
      end
    end

    resources :playlists, only: [:create, :update, :destroy] do
      member do
        get "likes", to: "playlists#likes"
        post "likes", to: "playlists#create_like"
        delete "likes/:liker_id", to: "playlists#destroy_like"
        get "tracks", to: "playlistings#index"
        post "tracks", to: "playlistings#create"
        delete "tracks/:track_id", to: "playlistings#destroy"
      end
    end
  end
end
