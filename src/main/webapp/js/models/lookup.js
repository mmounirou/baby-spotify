var Artist = Backbone.Model.extend({
	initialize : function () {
		this.albums_models = this.albums.map(function(album){return new Album(album);});
	},
	url : function() {
		return "http://ws.spotify.com/lookup/1/.json?uri="+this.href+"&extras=album";
	},
	own_albums : function () {
		var that = this;
		return this.albums_models.filter(function(album){return album.artist-id == that.href; });
	},
	feat_albums : function() {
		var that = this;
		return this.albums_models.filter(function(album){return album.artist-id != that.href; });
	}
});

var Album = Backbone.Model.extend({
	url:function () {
		return "http://ws.spotify.com/lookup/1/.json?uri="+this.href+"&extras=tracks";
	}
});