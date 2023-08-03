Rails.application.routes.draw do

  resources :users, except: [:show] 
  resources :playlists, except: [:show]
  resources :posts
  resources :songs, except: [:index]

  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
  get '/me', to: "users#show"
  get '/songs/:title/:artist', to: "songs#show_match"
  get '/playlists/:title', to: "playlists#show"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
