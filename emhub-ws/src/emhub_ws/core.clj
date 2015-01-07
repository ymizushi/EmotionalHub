(ns emhub-ws.core
  (:require [clojure.tools.logging :as logging]
            [lamina.core :refer :all]
            [aleph.http :refer :all]
            [environ.core :refer [env]]))

(def broadcast-channel (channel))

(defn handler [ch handshake]
  (receive-all ch (fn [msg] (do
                              (enqueue broadcast-channel msg)
                              (logging/info (str "message is " msg))
                              ))))

(defonce server (atom nil))

(defn start [port]
  (let [port (Integer. (or port (env :port) 5000))]
    (reset! server
            (start-http-server handler
                               {:port port
                                :websocket true}))
    (logging/info (str "Started with port " port))))

(defn stop []
  (when @server
    (@server)
    (reset! server nil)))

(defn -main [& [port]]
  (start port))
