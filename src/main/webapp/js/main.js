$(function () {    
    var AppView = Backbone.View.extend({
        el: $("#spotifyapp"),
        
        events:{
            "keypress #search": "search" 
        },
        search : function(e){
          if (e.keyCode != 13) return;
          if (!this.input.val()) return;

        var that = this;
        this.tracksResults.url = "http://ws.spotify.com/search/1/track.json?q="+this.input.val();
        this.tracksResults.fetch({ success: function(){that.tracksView.render();}});
            
        this.artistsResults.url = "http://ws.spotify.com/search/1/artist.json?q="+this.input.val();
        this.artistsResults.fetch({ success: function(){that.artistsView.render();}});
            
        this.albumsResults.url = "http://ws.spotify.com/search/1/album.json?q="+this.input.val();
        this.albumsResults.fetch({ success: function(){that.albumsView.render();}});
        
        },
        initialize: function() {
            console.log("test initialize");
            this.input = this.$("#search");
            this.tracksResults = new TracksResult();
            this.albumsResults = new AlbumsResult();
            this.artistsResults = new ArtistsResult();

            this.tracksView = new TracksView({collection : this.tracksResults});
            this.albumsView = new AlbumsView({collection : this.albumsResults});
            this.artistsView = new ArtistsView({collection : this.artistsResults});
 
        }
        ,clean : function(){
            this.tracksResults.reset();
            this.albumsResults.reset();
            this.artistsResults.reset();
        }
    }); 
    
    var AppRouter = Backbone.Router.extend({
          routes: {
            "track/:query":        "track",
            "album/:query":        "album", 
            "artist/:query":       "artist",
          },
        
          artist: function(query){
              var view = mainAppView;
              view.clean();
              var artist = new Backbone.Model({id:query});
              artist.url="http://ws.spotify.com/lookup/1/.json?uri="+query+"&extras=album"
              artist.fetch({ success: function(){
                  view.albumsResults.add(artist.get("artist").albums.map(function(album){
                      return album.album;
                  }));
                  view.albumsView.render();
              }}); 
          }
    });
    
    var mainAppView = new AppView;
    var mainRouter = new AppRouter;
    Backbone.history.start()
});