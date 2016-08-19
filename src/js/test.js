define(function () {
    (function() {
        var test1 = document.getElementById('test1');
        test1.onclick = function(){this.style.color='red';};

        var test2 = document.getElementById('test2');
        test2.onclick = function(){this.style.color='yellow';};

    })();
})
