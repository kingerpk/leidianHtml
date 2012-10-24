OpenLayers.Layer.TiandituLayer = OpenLayers.Class(OpenLayers.Layer.Grid, {

    mapType: null,
    mirrorUrls: null,
    topLevel: null,
    bottomLevel: null,

    topLevelIndex: 0,
    bottomLevelIndex: 20,
    topTileFromX: -180,
    topTileFromY: 90,
    topTileToX: 180,
    topTileToY: -270,

    isBaseLayer: true,

    initialize: function (name,options) {

        options.topLevel = options.topLevel ? options.topLevel : this.topLevelIndex;
        options.bottomLevel = options.bottomLevel ? options.bottomLevel : this.bottomLevelIndex;
        options.maxResolution = this.getResolutionForLevel(options.topLevel);
        options.minResolution = this.getResolutionForLevel(options.bottomLevel);

        var newArguments = [name, {}, {}, options];
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);
    },

    clone: function (obj) {

        if (obj == null) {
            obj = new OpenLayers.Layer.TDTLayer(this.name, this.url, this.options);
        }

        obj = OpenLayers.Layer.Grid.prototype.clone.apply(this, [obj]);

        return obj;
    },

    getURL: function (bounds) {
        var level = this.getLevelForResolution(this.map.getResolution()); 
        var coef = 360 / Math.pow(2, level); 
        var x_num = this.topTileFromX < this.topTileToX ? Math.round((bounds.left - this.topTileFromX) / coef) : Math.round((this.topTileFromX - bounds.right) / coef);
        var y_num = this.topTileFromY < this.topTileToY ? Math.round((bounds.bottom - this.topTileFromY) / coef) : Math.round((this.topTileFromY - bounds.top) / coef);
		
		switch(level){
			case 8:
				url="http://tile6.tianditu.com/DataServer?T=tdt_vip_img_2_10_120627";
				break
			case 9:
				url="http://tile5.tianditu.com/DataServer?T=tdt_vip_img_2_10_120627";
				break
			case 10:
				url="http://tile5.tianditu.com/DataServer?T=tdt_vip_img_2_10_120627";
				break
			case 11:
				url="http://tile1.tianditu.com/DataServer?T=E11N";
				break
			case 12:
				url="http://tile6.tianditu.com/DataServer?T=E12N";
				break
			case 13:
				url="http://tile3.tianditu.com/DataServer?T=E13N";
				break
			case 14:
				url="http://tile2.tianditu.com/DataServer?T=E14N";
				break
			case 15:
				url="http://tile5.tianditu.com/DataServer?T=tdt_vip_img_120627_dyd"
				break
			case 16:
				url="http://tile2.tianditu.com/DataServer?T=tdt_vip_img_120627_dyd";
				break
			case 17:
				url="http://tile1.tianditu.com/DataServer?T=tdt_vip_img_120627_dyd";
				break
			case 18:
				url="http://tile0.tianditu.com/DataServer?T=tdt_vip_img_120627_dyd";
				break
		}

        return this.getFullRequestString({ T: null, X: x_num, Y: y_num, L: level }, url);
    },
    selectUrl: function (a, b) { return b[a % b.length] },
    getLevelForResolution: function (res) {
        var ratio = this.getMaxResolution() / res;
        if (ratio < 1) return 0;
        for (var level = 0; ratio / 2 >= 1; )
        { level++; ratio /= 2; }
        return level;
    },
    getResolutionForLevel: function (level) {
        return 360 / 256 / Math.pow(2, level);
    },
    getMaxResolution: function () {
        return this.getResolutionForLevel(this.topLevelIndex)
    },
    getMinResolution: function () {
        return this.getResolutionForLevel(this.bottomLevelIndex)
    },
    addTile: function (bounds, position) {
        var url = this.getURL(bounds);
        return new OpenLayers.Tile.Image(this, position, bounds, url, this.tileSize);
    },

    CLASS_NAME: "OpenLayers.Layer.TiandituLayer"
});