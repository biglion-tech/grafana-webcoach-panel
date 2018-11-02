## Webcoach performance advice list panel Plugin for Grafana

The Panel can show the current performance advice list from webcoach metrics

### Development

Using Docker:

1. Clone the repository and `cd` to it
1. Run a local Grafana instance with the development version of the plugin: `docker run -p 3000:3000 -d --name grafana-plugin-dev --volume $(pwd)/dist:/var/lib/grafana/plugins/webcoach-panel grafana/grafana`
1. Check the logs to see that Grafana has started up: `docker logs -f grafana-plugin-dev`
1. Make sure you have https://github.com/gruntjs/grunt-cli installed
1. Start the "watch" task: `grunt watch` in plugin folder
1. Open Grafana at http://localhost:3000/
1. Log in with username "admin" and password "admin"
1. Create new dashboard and add the plugin

Using golang

1. Clone the repository and `cd` to it
1. Run `yarn build` in root folder
1. Run ./bin/grafana-server
1. Place your plugin to data/plugins (or another dir if you have custom config.ini)
1. Add the plugin to dashboard
1. Run `grunt watch` in plugin root folder
1. Make dev, not war, have fun)