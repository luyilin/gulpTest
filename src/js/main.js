require.config({
    paths: {
        'jquery': '01-jquery-1.11.3.min',
        'bootstrap': '02-bootstrap.min'
    },
    shim: {
        'bootstrap': ['jquery'] // 依赖关系
    }
});

if(Config.controller){
    require([Config.controller]);
}
