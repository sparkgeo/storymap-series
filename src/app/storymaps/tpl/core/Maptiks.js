define(["dojo/topic"],
  function(topic){
    topic.subscribe("story-loaded-map", function(){
      require(['maptiks'], function (mapWrapper) {
        if (!app.map.maptiks) {
          var container = app.map.container; // the current map div
          console.log(app.data.getWebAppData().getMaptiks());
          var maptiksSet = app.data.getWebAppData().getMaptiks().hasOwnProperty('maptiksTrackcode');
          var maptiksTrackcode = maptiksSet ? app.data.getWebAppData().getMaptiks().maptiksTrackcode : 'c311cf16-ad79-42b1-97f9-f433be6c8b00'; // replace with dev trackcode
          var maptiksId = maptiksSet ? app.data.getWebAppData().getMaptiks().maptiksId : "demo";
          var maptiksMapOptions = {
            extent: app.map.extent,
            maptiks_trackcode: maptiksTrackcode,
            maptiks_id: maptiksId + ':' + app.data.getCurrentEntry().title
          };
          mapWrapper(container, maptiksMapOptions, app.map);
          topic.publish("maptiks-ready");
        }
      });
    });
  }
);