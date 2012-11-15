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
            tagName : 'tr',
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
            tagName : 'tr',
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
            tagName : 'tr',
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