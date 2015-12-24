(defproject emhub-ws "0.2.0"
  :description "The programming platform for education and amusement."
  :url "http://github.com/ymizushi/EmotionalHub"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [
                 [org.clojure/clojure "1.7.0"]
                 [org.clojure/tools.logging "0.3.1"]
                 [environ "1.0.1"]
                 [aleph "0.3.3"]]
  :main emhub-ws.core
  :profiles {:production {:env {:production true}}}
  :uberjar-name "emhub-ws.jar"
)
