(defproject emhub "0.1.0-SNAPSHOT"
  :description "The interactive programming environment for education and entertainment."
  :url "https://github.com/ymizushi/EmotionalHub"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [lib-noir "0.8.9"]
                 [ring-server "0.3.1"]
                 [selmer "0.7.1"]
                 [com.taoensso/timbre "3.3.1"]
                 [com.taoensso/tower "3.0.1"]
                 [markdown-clj "0.9.47"]
                 [environ "1.0.0"]
                 [im.chit/cronj "1.4.2"]
                 [noir-exception "0.2.2"]
                 [prone "0.6.0"]]

  :repl-options {:init-ns emhub.repl}
  :jvm-opts ["-server"]
  :plugins [[lein-ring "0.8.10"]
            [lein-environ "0.5.0"]
            [lein-ancient "0.5.5"]]
  :ring {:handler emhub.handler/app
         :init    emhub.handler/init
         :destroy emhub.handler/destroy}
  :profiles
  {:uberjar {:omit-source true
             :env {:production true}
             :aot :all}
   :production {:ring {:open-browser? false
                       :stacktraces?  false
                       :auto-reload?  false}}
   :dev {:dependencies [[ring-mock "0.1.5"]
                        [ring/ring-devel "1.3.2"]
                        [pjstadig/humane-test-output "0.6.0"]]
         :injections [(require 'pjstadig.humane-test-output)
                      (pjstadig.humane-test-output/activate!)]
         :env {:dev true}}}
  :min-lein-version "2.0.0")
