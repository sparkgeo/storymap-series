define(["dojo/topic"],
  function(topic){
    topic.subscribe("story-loaded-map", function(){
      require(["maptiks"], function (mapWrapper) {
        if (!app.map.maptiks) { // maptiks are not yet tracking this map
          if (app.data.getWebAppData().getMaptiks().maptiksTrackcode) { // maptiks have been set in builder
            var container = app.map.container; // the current map div
            var maptiksMapOptions = {
              maptiks_trackcode: app.data.getWebAppData().getMaptiks().maptiksTrackcode, // from Builder Maptiks settings
              maptiks_id: app.data.getWebAppData().getMaptiks().maptiksId + ":" + app.data.getCurrentEntry().title // from Builder Maptiks settings, ID:tabname
            };
            mapWrapper(container, maptiksMapOptions, app.map);
          }
          topic.publish("demo-ready", mapWrapper);
        }
      });
    });
  }
);