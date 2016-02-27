/// <reference path="../../typings/tsd.d.ts"/>


module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public zoom:string;
        
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationSpeed:number) {
           this.zoom = "ZoomOut";
        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        
        //Control Switch event action for Zoom In and ZoomOut the camera
          public zoomInEarth(): void {
               if (this.zoom == "Zoom In Earth") {
                    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                    camera.position.x = -50;
                    camera.position.y = 25;
                    camera.position.z = 20;
                    camera.lookAt(new Vector3(5, 0, 0));
                    console.log("Finished setting up Camera...");
                    this.zoom = "Zoom Out";
                } else {
                    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                    camera.position.x = -10;
                    camera.position.y = 0;
                    camera.position.z = 0;
                    camera.lookAt(new Vector3(5, 0, 0));
                    console.log("Finished setting up zoom Earth Camera...");
                    this.zoom = "Zoom In Earth";
                    mesh_earth.add(camera);
                }
            }
            
            public zoomInJupiter(): void {
               if (this.zoom == "Zoom In Jupiter") {
                    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                    camera.position.x = -50;
                    camera.position.y = 25;
                    camera.position.z = 20;
                    camera.lookAt(new Vector3(5, 0, 0));
                    console.log("Finished setting up Camera...");
                    this.zoom = "Zoom Out";
                } else {
                    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                    camera.position.x = -10;
                    camera.position.y = 0;
                    camera.position.z = 0;
                    camera.lookAt(new Vector3(5, 0, 0));
                    console.log("Finished setting up zoom Earth Camera...");
                    this.zoom = "Zoom In Jupiter";
                    mesh_jupiter.add(camera);
                }
            }
    }
}