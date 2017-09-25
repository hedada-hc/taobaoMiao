__myYoutubeTools={
    test:function(){
        alert("dsdsdsd")
    },
    getMP: function(){
        return document.getElementById('movie_player')
    }
    ,pauseVideo: function(){
        alert('hezone')
        var t=__myYoutubeTools
        t.clearPNSTo()
        t.getMP().pauseVideo()
        t.isPaused=true
    }
    ,playVideo: function(){
        var t=__myYoutubeTools
        t.clearPNSTo()
        t.getMP().playVideo()
        t.isPaused=false
    }
    ,clearPNSTo: function(){
        var t=__myYoutubeTools
        try{clearTimeout(t.toPNS);}catch(x){}
    }
    ,isPaused: true
    ,toPNS: null
    ,playNpauseVideo: function(){
        // debugger
        var t=__myYoutubeTools
        if(t.isPaused){
            t.playVideo()
        }else{
            t.pauseVideo()
        }
        t.toPNS = setTimeout("__myYoutubeTools.playNpauseVideo()",1000);
    }
}
