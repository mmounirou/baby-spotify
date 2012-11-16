var TracksView = Backbone.View.extend({
    el:$("#tracks-result"),
    render : function(){
        var source   = $("#track-results-tpl").html();
        var template = Handlebars.compile(source);
        return this.$el.html(template(this.collection.first().toJSON()));
    }
});

var ArtistsView = Backbone.View.extend({
    el:$("#artists-result"),
    render : function(){
        var source   = $("#artist-results-tpl").html();
        var template = Handlebars.compile(source);
        return this.$el.html(template(this.collection.first().toJSON()));    }
});

var AlbumsView = Backbone.View.extend({
    el:$("#albums-result"),
    render : function(){
        var source   = $("#album-results-tpl").html();
        var template = Handlebars.compile(source);
        return this.$el.html(template(this.collection.first().toJSON()));    }
});