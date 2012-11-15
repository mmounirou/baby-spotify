$(function () {
    var TrackView = Backbone.View.extend({
        template: _.template($('#track-template').html()),
        render: function() {
              this.$el.html(this.template(this.model.toJSON()));
              return this;
        }
    });

    var AlbumView = Backbone.View.extend({
        template: _.template($('#album-template').html()),
        render: function() {
              this.$el.html(this.template(this.model.toJSON()));
              return this;
        }
    });
    
    var ArtistView = Backbone.View.extend({
        template: _.template($('#artist-template').html()),
        render: function() {
              this.$el.html(this.template(this.model.toJSON()));
              return this;
        }
    });
    
    var TracksView = Backbone.View.extend({
        initialize : function(){
            this.collection.each(this.add);
            _(this).bindAll('add', 'remove');
        },
        add : function(track){
            var dv = new TrackView({
                tagName : 'li',
                model : track
            });
            $(this.el).append(dv.render().el);
        },
        el:$("#tracks-result"),
        render : function() {
            $(this.el).empty();
            this.collection.each(this.add);
            return this;
          }
    });
    
    var ArtistsView = Backbone.View.extend({
        initialize : function(){
            this.collection.each(this.add);
            _(this).bindAll('add', 'remove');
        },
        add : function(artist){
            var dv = new ArtistView({
                tagName : 'li',
                model : artist
            });
            $(this.el).append(dv.render().el);
        },
        el:$("#artists-result"),
        render : function() {
            $(this.el).empty();
            this.collection.each(this.add);
            return this;
          }
    });
    
    var AlbumsView = Backbone.View.extend({
        initialize : function(){
            this.collection.each(this.add);
            _(this).bindAll('add', 'remove');
        },
        add : function(album){
            var dv = new AlbumView({
                tagName : 'li',
                model : album
            });
            $(this.el).append(dv.render().el);
        },
        el:$("#albums-result"),
        render : function() {
            $(this.el).empty();
            this.collection.each(this.add);
            return this;
          }
    });
    
    var Tracks = Backbone.Collection.extend({
        parse: function(response) {
            return response.tracks;
        }
    });
    
    var Artists = Backbone.Collection.extend({
        parse: function(response) {
            return response.artists;
        }
    });
    
    var Albums = Backbone.Collection.extend({
        parse: function(response) {
            return response.albums;
        }
    });
    
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
            this.tracksResults = new Tracks();
            this.albumsResults = new Albums();
            this.artistsResults = new Artists();

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