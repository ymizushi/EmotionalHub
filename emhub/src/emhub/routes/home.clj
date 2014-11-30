(ns emhub.routes.home
  (:require [compojure.core :refer :all]
            [emhub.layout :as layout]
            [emhub.util :as util]))

(defn home-page []
  (layout/render
    "home.html" {:content (util/md->html "/md/docs.md")}))

(defn about-page []
  (layout/render "about.html"))

(defn login-page []
  (layout/render "login.html"))

(defroutes home-routes
  (GET "/" [] (home-page))
  (GET "/about" [] (about-page))
  (GET "/login" [] (login-page))
  )
