define(["dojo/topic"],
  function(topic){
    require(["maptiks"], function (mapWrapper) {
      topic.subscribe("story-loaded-map", function(response){
        var curMap = app.maps[response.id].response.map;
        if (app.data.getWebAppData().getMaptiks().maptiksTrackcode) { // maptiks have been set in builder
          var id = app.data.getWebAppData().getMaptiks().maptiksId + ":" + app.data.getStoryEntries()[response.index].title; // from Builder Maptiks settings, ID:tabname
          if (!curMap.maptiks) {
            var container = curMap.container; // the current map div
            var maptiksMapOptions = {
              maptiks_trackcode: app.data.getWebAppData().getMaptiks().maptiksTrackcode, // from Builder Maptiks settings
              maptiks_id: id
            };
            mapWrapper(container, maptiksMapOptions, curMap);
          } else {
            curMap.maptiks._id = id;
          }
        }
        topic.publish('maptiks-ready',mapWrapper,response);
      });
    });
  }
);