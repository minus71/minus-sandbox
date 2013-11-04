function init(){
    var WIDTH= 600;
    var HEIGHT= 300;
    var stage = new Kinetic.Stage({
        container: 'container',
        width: WIDTH,
        height: HEIGHT
      });




  var layer = new Kinetic.Layer();
  


  var sop_camel={
    plane : new Kinetic.Polygon({
      points:[0,0 , 20,0 , 15,-5 , 5,-5 , 0,-10],
      stroke: 'black',
      strokeWidth: 0.7}),
    speed:100,
    x:WIDTH/2,
    y:HEIGHT/2
  };
  // sop_camel.plane.move(sop_camel.x,sop_camel.y);

  // add the shape to the layer
  layer.add(sop_camel.plane);
  
  
  // add the layer to the stage
  stage.add(layer);
  sop_camel.plane.move(sop_camel.x,sop_camel.y);
  var orientation=0.0;
  
  var anim = new Kinetic.Animation(function(frame){
    var time = frame.time;
    var timeDiff = frame.timeDiff;
    var frameRate = frame.frameRate;
    
    $('#fps').text(Math.floor(frameRate));
    
    // sop_camel.x=sop_camel.x;// +sop_camel.speed*timeDiff/1000;
    var x = sop_camel.plane.getX();
    var y = sop_camel.plane.getY();
    
    // if(x>WIDTH-30){
    //     sop_camel.speed= - Math.abs(sop_camel.speed);
    //     sop_camel.plane.setScaleX(-1);
    // }
    // if(x<30){
    //     sop_camel.speed= Math.abs(sop_camel.speed);
    //     sop_camel.plane.setScaleX(1);
    // }

    
    var keys = KeyboardJS.activeKeys()
    // $('#key').text(keys);
    var rotation = 0;
    if(keys && keys.indexOf('w')>=0){
      rotation=360.0/2*timeDiff/1000;
    }else if(keys && keys.indexOf('s')>=0){
      rotation=-360.0/2*timeDiff/1000;
    }
    var orientation = sop_camel.plane.getRotationDeg()+rotation;
    if(orientation>=360){
      orientation-=360;
    }
    if(orientation<0){
      orientation+=360;
    }
    
    
    $('#key').text(orientation);
    
    if(x>WIDTH-30 || x<30){
        orientation=180-orientation;
        // sop_camel.plane.setScaleX(-1);
    }
    
    if(y>HEIGHT-30 || y<30){
        orientation=-orientation;
    }
    if(orientation>=360){
      orientation-=360;
    }
    if(orientation<0){
      orientation+=360;
    }
    sop_camel.plane.setRotationDeg(orientation);


    var vX=sop_camel.speed*Math.cos(Math.PI*orientation/180);
    var vY=sop_camel.speed*Math.sin(Math.PI*orientation/180);

    
    sop_camel.plane.move(vX/1000*timeDiff,vY/1000*timeDiff);
  },layer); 
  anim.addLayer(layer);
  anim.start();  
  console.info("Ok");

}
$(document).ready(init);