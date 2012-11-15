var TrackResult = Backbone.Model.extend({
});

var ArtistResult = Backbone.Model.extend({
});

var AlbumResult = Backbone.Model.extend({
});

var TracksResult = Backbone.Collection.extend({
    parse: function(response) {
        return response.tracks;
    }
});

var ArtistsResult = Backbone.Collection.extend({
    parse: function(response) {
        return response.artists;
    }
});

var AlbumsResult = Backbone.Collection.extend({
    parse: function(response) {
        return response.albums;
    }
});