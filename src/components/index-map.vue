<template>
    <div class="index-map" id="map"></div>
</template>

<script>
    import $ from 'jquery';
    var imgUrl = require('../assets/icon_building_1.png');
    // var imgUrl2 = require('../assets/icon_house_village.png');




    export default {
        name: "index-map",
        mounted(){
            mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlcmlzaGppYSIsImEiOiJjamFuYnFwcGwzYXFkMnFtaHVuaDBrNDNrIn0.lDLKOy6bwMnXPIONubyUvw';
            let map = new mapboxgl.Map({
                style: 'mapbox://styles/mapbox/dark-v9',
                // center: [-74.0066, 40.7135],
                center: [120.720148,31.138166],
                zoom: 12,
                pitch: 55,
                bearing: 0,
                container: 'map'
            });
            map.addControl(new MapboxLanguage({
                defaultLanguage:'zh'
            }));



            map.on('load', function() {
                let markerContent = `<img src="${imgUrl}">`;
                // let markerContent = `<img src="./img/">`;
                let el = document.createElement('div');
                $(el).append(markerContent);

                map.addLayer({
                    'id': '3d-buildings',
                    'source': 'composite',
                    'source-layer': 'building',
                    // 'filter': ['==', 'extrude', 'true'],  /* 过滤器 */
                    'type': 'fill-extrusion',
                    // 'minzoom': 12,
                    'paint': {
                        'fill-extrusion-color': '#fff',//颜色
                        'fill-extrusion-height': [
                            "interpolate", ["linear"], ["zoom"],
                            15, 0,
                            15.05, ["get", "height"]
                        ],
                        'fill-extrusion-base': [
                            "interpolate", ["linear"], ["zoom"],
                            15, 0,
                            15.05, ["get", "min_height"]
                        ],
                        'fill-extrusion-opacity': .6
                    }
                });

                // that.$http.get('http://localhost:8080/gridList.json').then(res => {
                //
                //     $.each(res.data.threeGridList, function (i, n) {
                //
                //
                //         map.addLayer({
                //             'id': 'maine' + i,
                //             'type': 'fill',
                //             'source': {
                //                 'type': 'geojson',
                //                 'data': {
                //                     'type': 'Feature',
                //                     'geometry': {
                //                         'type': 'Polygon',
                //                         "coordinates": JSON.parse(n.points)
                //                     }
                //                 }
                //             },
                //             'layout': {},
                //             'paint': {
                //                 'fill-color': '#088',
                //                 'fill-opacity': 0.1,
                //             }
                //         });
                //
                //         map.addLayer({
                //             "id": "route"+i,
                //             "type": "line",
                //             "source": {
                //                 "type": "geojson",
                //                 "data": {
                //                     "type": "Feature",
                //                     "properties": {},
                //                     "geometry": {
                //                         "type": "Polygon",
                //                         "coordinates": JSON.parse(n.points)
                //                     }
                //                 }
                //             },
                //             "layout": {
                //                 "line-join": "round",
                //                 "line-cap": "round"
                //             },
                //             "paint": {
                //                 "line-color": "#088",
                //                 "line-width": 4
                //             }
                //         });
                //
                //         let markerContent = `<img src="${imgUrl2}">`;
                //         let el = document.createElement('div');
                //         $(el).append(markerContent);
                //         let marker = new mapboxgl.Marker({
                //             element:el,
                //         })
                //             .setLngLat([n.lng,n.lat])
                //             .addTo(map);
                //
                //         $(el).on('click',function(e){
                //             alert('点击了marker');
                //             e.stopPropagation()
                //         });
                //
                //         map.on('click','maine'+i,function(e){
                //             alert('点击了围栏');
                //
                //         });
                //
                //         map.on('mouseenter','maine'+i,function(e){
                //             console.log('e',e);
                //             map.setPaintProperty('maine'+i, 'fill-color', '#faafee');
                //         });
                //
                //         map.on('mouseleave','maine'+i,function(e){
                //             map.setPaintProperty('maine'+i, 'fill-color', '#088');
                //         })
                //     })
                // });

            });
        }
    }
</script>

<style scoped>
    .index-map{
       position:absolute;
        width:3840px;
        height:1296px;
        top:0;
        left:0;
        z-index: 1;
    }
</style>