(defproject emohub "0.1.0"
  :description "The programming environment"
  :url "http://github.com/ymizushi/emohub"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [
                 [org.clojure/clojure "1.6.0"]
                 [org.clojure/tools.logging "0.2.6"]
                 [environ "0.4.0"]
                 [aleph "0.3.0"]]
  :main emohub.core
  :profiles {:production {:env {:production true}}}
  :uberjar-name "emohub.jar"
)
