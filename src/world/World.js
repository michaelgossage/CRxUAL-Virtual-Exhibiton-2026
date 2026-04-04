import { Mesh, MeshStandardMaterial, SphereGeometry, Vector3 } from "three";
import { makeProximityRevealMaterial, ProximityRevealSystem } from "../shaders/proximityRevealMaterial.js";
import { addDefaultLights } from "./lights.js";
import { BoxGeometry } from "three";
import { ScreenManager } from "./ScreenManager.js";
import { makeTextPlane } from "./makeTextPlane.js";
import { ControlsFPS } from "./ControlsFPS.js";
import { CameraFocus } from "./CameraFocus.js";
import { makeTween01 } from "../utils/tween.js";

import { loadGLTFWithAnimations } from "../utils/gltfLoader.js"; 
import { applyHDRI } from "./hdri.js";

import { LocationManager } from "./LocationManager.js";
import { makeArchGridMaterial } from "../shaders/gridShader.js";
import { InfoPanel } from "../ui/InfoPanel.js";




export class World {
  constructor({ scene, camera, renderer, sizes }) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.sizes = sizes;
    this.controls = new ControlsFPS({ camera: this.camera, domElement: this.renderer.domElement, autoRotate: true, autoRotateSpeed: -0.05 });
    // focus helper for smoothly moving camera to screens
    this.focus = new CameraFocus({ camera: this.camera });
    this._artworkRegistry = [];
    this._currentArtworkIndex = -1;
    this.infoPanel = new InfoPanel({
      onClose: () => this.screenManager.onMiss?.(),
      onNav: (dir) => this._navigateArtwork(dir),
      onJumpTo: (idx) => this._navigateToIndex(idx)
    });
    this._controlsSaved = null;
    this._focusState = "idle"; // idle | focusing | focused | returning
    this._focusCooldown = 0;
    this._focusedScreen = null;
    this._lastfocusedScreen = null;
    this._lastRevealedScreen = null;

    //tween animations
    this._tweens = [];

    // location-based visibility
    this._currentLocation = 'lobby';
    this._pendingLocation = null;
    this._pendingFocusIndex = null; // set when cross-location jump is triggered from list

    // proximity reveal system for environment geometry
    this.proximityReveal = new ProximityRevealSystem();
    

    // initialise the screen manager for adding artworks
    this.screenManager = new ScreenManager({
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer,
      domElement: this.renderer.domElement,
      makeTextPlane,
      debugOn: true // set to true to show clickable podiums
    });

    this.screenManager.onHit = (obj) => {
      const target = obj.userData.focusTarget || obj;
      // If already focused on this artwork, tap toggles video play/pause
      if (this._focusState === "focused" && this._focusedScreen === target) {
        const video = obj.userData.video;
        if (video) {
          if (video.paused) video.play().catch(() => {});
          else video.pause();
        }
        return;
      }
      this._focusOnObj(obj);
    };

    this.screenManager.onMiss = () => {
      // click empty space to return
      
      if (this._focusCooldown > 0) return;
      if (this.focus.isMoving) return;
      if (this._focusState === "idle") return;

      this._focusState = "returning";
      this._focusCooldown = 0.2;

      this.focus.returnHome(0.7);

      // Pause any playing video and restore poster
      this.screenManager.deactivateVideo(this._focusedScreen);
      this.infoPanel.hide();
      this.infoPanel.hideVideoControls();

      // 🔥 HIDE animation
      this._animateReveal(this._focusedScreen, 0.0, 1.0, 0.3);
      this._animateReveal(this._lastRevealedScreen, 0.0, 1.0, 0.3);
      // clear focused screen immediately so you can click the same one again if you want
      this._focusedScreen = null;
      this._lastRevealedScreen = null;
      
    };

  

    //set camera locaitons
    this.locations = new LocationManager({ camera: this.camera });
    this.locations.setLocations({
      lobby:   { camera: { pos:[0,0.8,0], lookAt:[0,0.8,-1] } },
      WestPavillion:{ camera: { pos:[-29,0.8,-20], lookAt:[-14,1.2,-6] } },
      EagleBar:{ camera: { pos:[ 1,21,16], lookAt:[ 1,21,17] } },
      //winners: { camera: { pos:[0, 12, 24], lookAt:[0, 0, -1] } }
      winners: { camera: { pos:[0, 0.8, 0], lookAt:[0, 0, -1] } }
    });

    // start location
    this.locations.goTo("lobby", { duration: 0.01 });

      // make a path between 2 lodcations
  this.locations.setPathBidirectional("lobby", "EagleBar", [   
    { pos: [0, 10, 0], lookAt: [0, 21, 0] },                                                                                                                                                      
    { pos: [0, 21, 0], lookAt: [10, 21, 0] },
    { pos: [10, 21, 0], lookAt: [10, 21, 8] },
    { pos: [10, 21, 8], lookAt: [7, 21, 8] },
    { pos: [7, 21, 8], lookAt: [ 1,21,16] },                                                                                                                                                             
  ],
{duration: 5.0, distanceWeighted: true}); 

      // make a path between 2 lodcations
  this.locations.setPathBidirectional("lobby", "WestPavillion", [
    { pos: [3, 0.8, -8], lookAt: [-10, 0.8,-15] },                                                                                                                                                      
    { pos: [-10, 0.8, -15], lookAt: [-12, 0.8, -18] },
    { pos: [-12, 0.8, -18], lookAt: [-28, 0.8, -18] },
    { pos: [-28, 0.8, -18], lookAt: [-15, 0.8, -15] }
  ],
{duration: 5.0, distanceWeighted: true}); 

    // Arrow key navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft")  this._navigateArtwork(-1);
      if (e.key === "ArrowRight") this._navigateArtwork(1);
    });

    
    

    // add lights
    addDefaultLights(this.scene);

    // add environment (a simple room for now, but could be more complex later)
    applyHDRI({
      renderer: this.renderer,
      scene: this.scene,
      url: import.meta.env.BASE_URL + "art/hdri/qwantani_dusk_2_puresky_4k Medium.jpeg",
      background: true,   // keep your room/fog background
      envIntensity: 0.0
    });
    /**/

    //add geometry
    const room = new Mesh(
      new BoxGeometry(30, 1, 30),
      new MeshStandardMaterial({ color: 0x108080, side: 2 })
    );
    room.position.set(0, -1.5, 0);
    room.receiveShadow = true;
    const envMat1 = makeProximityRevealMaterial({ color: 0x808080, fogColor: 0x000000, side: 2 });
          this.proximityReveal.registerMaterial(envMat1);
          room.material = envMat1;
    //this.scene.add(room);

    //add walls to the room in a loop
    const wallMaterial = new MeshStandardMaterial({ color: 0x808080, side: 2 });
    const wallThickness = 0.5;
    const wallHeight = 6;
    const halfSize = 30;
    const walls = [
      new BoxGeometry(wallThickness, wallHeight, halfSize * 2), // left
      new BoxGeometry(wallThickness, wallHeight, halfSize * 2), // right
      new BoxGeometry(halfSize * 2, wallHeight, wallThickness), // back
      new BoxGeometry(halfSize * 2, wallHeight, wallThickness)  // front
    ];
    const wallPositions = [
      [-halfSize - wallThickness / 2, wallHeight / 2 - 1.5, 0], // left
      [halfSize + wallThickness / 2, wallHeight / 2 - 1.5, 0], // right
      [0, wallHeight / 2 - 1.5, -halfSize - wallThickness / 2], // back
      [0, wallHeight / 2 - 1.5, halfSize + wallThickness / 2]  // front
    ];
    for (let i = 0; i < walls.length; i++) {
      const wall = new Mesh(walls[i], wallMaterial);
      wall.position.set(...wallPositions[i]);
      wall.receiveShadow = true;
      //this.scene.add(wall);
    }




    //Test box
    const ball = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshStandardMaterial({ roughness: 0.4, metalness: 0.1 })
    );
    ball.position.set(0, 0, -3);
    ball.castShadow = true;
    //this.scene.add(ball);

    this.ball = ball;

    //import environment model
    const envMat = makeProximityRevealMaterial({ color: 0x808080, fogColor: 0x000000, side: 2 });
    this.proximityReveal.registerMaterial(envMat);
    const gridMat = makeArchGridMaterial({ });

    const room01 = loadGLTFWithAnimations(import.meta.env.BASE_URL + "/art/test3d/Chancery Rosewood_V4_Reduce.glb").then((gltf) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if (child.isMesh) {
          //child.castShadow = true;
          child.receiveShadow = true;
          child.material = envMat;
          child.material = new MeshStandardMaterial({ color: 0x808080, side: 2 });  
          
          //child.material = gridMat;
        }
      });
      model.scale.set(1.0, 1.0, 1.0);
      model.position.set(0.0, -4.0, 16.0);
      this.scene.add(model);
    }).catch(console.error);

    const WestPavillion = loadGLTFWithAnimations(import.meta.env.BASE_URL + "/art/test3d/WestPavillion_V2.glb").then((gltf) => {
      const model1 = gltf.scene;
      model1.traverse((child) => {
        if (child.isMesh) {
          //child.castShadow = true;
          child.receiveShadow = true;
          child.material = envMat;
          child.material = new MeshStandardMaterial({ color: 0x808080, side: 2 });  
          
          //child.material = gridMat;
        }
      });
      model1.scale.set(1.0, 1.0, 1.0);
      model1.position.set(0.0, -4.0, 16.0);
      this.scene.add(model1);
    }).catch(console.error);


      //base URL
      const baseURL = import.meta.env.BASE_URL;
    //screens

    //above the fireplace
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/birdcage_jichu zhang/IMG_1571-1.jpeg`,
      width: 2,
      height: 1.85,
      position: [0.0, 1.4, -6.0],   // e.g. on/near carousel A
      rotation: [0, 0, 0],
      clickable: true,
      offsetClick: .1,
      clickableSize: [2.0, 2.0], // make click area bigger than screen size to include podium
      text: "",
      plinthVisible: false,
      location: 'lobby',
      artworkInfo: {
        title: "birdcage",
        artist: "Jichu Zhang",
        description: "My paintings are spaces of suspended narration, where the relationship between people and their surroundings is never fixed, but constantly shifting — between intimacy and distance, memory and control. Inspired by familial experiences, everyday interpersonal patterns, and the lingering structures of myth, I seek to construct visual environments that do not illustrate stories, but evoke atmospheres — spaces where something is felt before it is understood. Visually, my compositions follow drifting, current-like rhythms — inspired by the unseen movement of oceanic flows, as a way to mirror the subtle undercurrents of perception and emotional experience."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

      //Right of fireplace
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/EMBODIED_VeepraMishra/20251114_Veepra0132-1-1.webp`,
      width: 1.3,
      height: 1.74,
      position: [4.65, 0.9, -6.0],   // e.g. on/near carousel A
      rotation: [0, -35, 0],
      clickable: true,
      offsetClick: .1,
      clickableSize: [2.0, 2.0], // make click area bigger than screen size to include podium
      text: "",
      plinthVisible: true,
      location: 'lobby',
      artworkInfo: {
        title: "EMBODIED: Reclaiming Assistive Devices as Culturally Expressive Fashion",
        artist: "Veepra Mishra",
        description: "It began with the slightest gesture: my mother hiding her cane behind her back every time a camera appeared, as if the object were never meant to speak for her. This project turns toward that silence and wonders how assistive devices might become sites of cultural expression rather than symbols of concealment. In the realm of assistive design and fashion, such moments reveal how deeply aesthetics and embodiment intertwine, particularly for disabled people of colour whose identities are shaped through layered histories of visibility and belonging. Guided by co-design conversations with two South Asian participants and informed by critical disabilities, material culture, and cultural symbolism, I developed usable prototypes that merge function with cultural resonance. These artefacts, rooted in traditions, memory, agency, and empowerment, ask what happens when assistive devices are culturally expressive artefacts that hold beauty, heritage, and emotional truth. The work demonstrates that when disabled people of colour shape the instruments that support them, assistive devices shift from clinical symbols into objects of affirmation and pride. The process illuminated both the challenges and possibilities of designing across distance, culture, and lived experience. It reveals how identity and functionality are inseparable. Ultimately, the project suggests that inclusive futures emerge when design listens closely, honours complexity, and treats assistive devices not as objects that should be hidden, but as sites of beauty, cultural identity, and empowerment.  "
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

    /*
    this._registerArtwork(this.screenManager.addScreen({
      url: "https://picsum.photos/id/1011/900/900",
      width: 2,
      height: 1.25,
      position: [5.0, 1.0, -10.0],   // e.g. on/near carousel A
      rotation: [0, 0, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      artworkInfo: {
        title: "Untitled II",
        artist: "Placeholder Artist 2",
        description: "A test artwork to demonstrate the info panel functionality. This description will be read aloud for accessibility."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));
    */

    //right side, left front desk
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/BlackSwan-JieunSung/IMG_5414-2.png.avif`,
      width: 1.5,
      height: 2,
      position: [7.2, .5, -4.35],   // e.g. on/near carousel A
      rotation: [0, -45, 0],
      clickable: true,
      clickableSize: [2.0, 2.0], // make click area bigger than screen size to include podium
      offsetClick: 0.0,
      text: "Image Screen",
      plinthVisible: false,
      location: 'lobby',
      artworkInfo: {
        title: "Black Swan",
        artist: "Jieun Sung",
        description: "This project is about the black swan. Of all animals, I’ve always been particularly afraid of birds, but swans are the only ones that have ever helped me overcome that fear. So, I was intrigued to research them. I didn’t even know that black swans existed before, and I was fascinated to discover this species of swan. The black swan, with its dark mood and colour, really appealed to me, so I decided to make it the focus of my project."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

    /*
    this.screenManager.addScreen({
      url: "https://picsum.photos/id/1011/900/900",
      width: 1,
      height: 2.25,
      position: [8.4, 1.0, -2.5],   // e.g. on/near carousel A
      rotation: [0, -90, 0],
      clickable: true,
      offsetClick: 1.0,
      clickableSize: [2.2, 3.25],
      text: "Image Screen",
      plinthVisible: false,
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    });
    */

    //right side, right front desk
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/Nailed_Genevieve Carr/nailed.webp`,
      width: 1.5,
      height: 2.0,
      position: [7.2, 0.5, 1.55],
      rotation: [0, -135, 0],
      clickable: true,
      offsetClick: 0.5,
      clickableSize: [2.2, 2.5],
      text: "Image Screen",
      plinthVisible: false,
      location: 'lobby',
      artworkInfo: {
        title: "Nailed",
        artist: "Genevieve Carr",
        description: "\"Nailed\" transforms nail salon waste into a 3D printing filament, used to create sculptural nails inspired by botanical drawings. The project explores beauty, waste, and material reuse—reimagining synthetic leftovers as future design materials."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

      
      //right side, middle front desk
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/Dehumanized_ChiAnChou/IMG_7018-Large.jpeg.avif`,
      width: 1.8,
      height: 1.3,
      position: [8.4, 0.8, -1.5],
      rotation: [0, -90, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      location: 'lobby',
      artworkInfo: {
        title: "Dehumanized",
        artist: "Chi An Chou",
        description: "In this era of artificial intelligence, automation and highly mature technology, the definition of human is gradually disintegrating, and machines and technology are infiltrating and dominating our daily lives. Dehumanized is a conceptual exploration of a future world in which technology no longer centers on human nature, but instead gradually controls, holds power, and eventually replaces humanity. When digital systems take over judgment, aesthetics become algorithmically defined, and the body is transformed into a tool that prioritizes efficiency, emotions and individual consciousness begin to be seen as redundant residues. This project want to use visual language to present a imaginary future worldview: redesigned organisms, individuality erased, and a void beneath the human shell. Is Dehumanized a dystopian fantasy world, or is it a mirror held up to our present? In the wave of rapid innovation, what may ultimately be sacrificed is the very essence of what makes us human."
      },
      plinthVisible: false,
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

    //above front door
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/Pseudosynthesis_LeonLin/Vertical_comp-1.png.avif`,
      width: 5,
      height: 2.25,
      position: [0.0, 0.8, 13.8],   // e.g. on/near carousel A
      rotation: [0, -180, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      plinthVisible: false,
      location: 'lobby',
      artworkInfo: {
        title: "Pseudosynthesis",
        artist: "Leon Lin",
        description: "This project investigates whether AI-generated performers can authentically replicate human emotional expression in dance and performance. Through interviews with dancers and motion-capture experiments, it identifies three stages of human emotion (raw, mechanical, controlled) and argues that AI is limited to mimicry due to its lack of consciousness, embodiment, and lived experience. Drawing on Judith Butler’s theories, it contrasts human performativity (fluid, culturally embedded) with AI’s programmed rigidity. The work also explores queering digital avatars, critiques the commodification of bodies, and uses a 3D fashion film to visualize the human-machine divide."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

    
    /*
    this._registerArtwork(this.screenManager.addScreen({
      url: "public/art/film/-46631048878830026754dgs_social_v5.MP4",
      poster: "https://picsum.photos/id/1011/900/900",
      width: 3,
      height: 3,
      position: [2.0, 0.5, 13.8],   // e.g. on/near carousel A
      rotation: [0, -180, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      plinthVisible: false,
      artworkInfo: {
        title: "Untitled II",
        artist: "Placeholder Artist 2",
        description: "A test artwork to demonstrate the info panel functionality. This description will be read aloud for accessibility."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));
    */

    //right side hallway next to stairs
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/film/-46631048878830026754dgs_social_v5.MP4`,
      poster: "https://picsum.photos/id/1011/900/900",
      width: 1.4,
      height: 2.4,
      position: [7.0, 0.6, 4.0],   // e.g. on/near carousel A
      rotation: [0, -135, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      plinthVisible: false,
      location: 'lobby',
      artworkInfo: {
        title: "Untitled II",
        artist: "Placeholder Artist 2",
        description: "A test artwork to demonstrate the info panel functionality. This description will be read aloud for accessibility."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

      //atrium left wall, above front desk
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/EmbodiedMemories_YoonJuChung/B0009341-1-1.webp`,
      width: 4,
      height: 2.1,
      position: [-7.5, 3.6, -1.5],
      rotation: [0, 90, 0],
      clickable: true,
      plinthVisible: false,
      offsetClick: 0.0,
      text: "Image Screen",
      location: 'lobby',
      artworkInfo: {
        title: "Embodied Memories",
        artist: "Yoon Ju Chung",
        description: "Embodied Memories explores Hangul, the Korean alphabet, as an embodied and relational language through modular wearable artefacts. Originating from experiences of non-verbal communication with the artist’s hearing-impaired aunt, the project approaches gesture and movement as fundamental forms of language. Drawing on Hangul’s geometric structure, linguistic principles are translated into a modular system that functions as words, sculptural forms, or wearable objects. Grounded in Korean emotional philosophies—Jeong (connection), Han (endurance), and Heung (vitality)—the work informs processes of alignment, tension, play, and repair. Rather than treating language as a fixed visual system, meaning emerges through bodily movement, touch, and reconfiguration. The final artefacts are constructed using Korean textiles such as Mosi (ramie) and Oksa (silk), combined with transparent acrylic structures, magnetic connections, and traditional techniques including Gamchimgil hand-stitching and Pusae (rice starch stiffening).  Language is not only spoken or written; it is sensed, worn, and remembered. "
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/SynestheticSkin_JianingDing/Screenshot 2026-03-22 at 17.33.20.png`,
      width: 3,
      height: 1.5,
      position: [7.5, 3.5, -1.0],
      rotation: [0, -90, 0],
      clickable: true,
      plinthVisible: false,
      offsetClick: 0.0,
      text: "Image Screen",
      location: 'lobby',
      artworkInfo: {
        title: "Synesthetic Skin：A Posthuman Visual Narrative",
        artist: "Jianing Ding",
        description: "A conceptual and experimental platform—an art-philosophy construct designed to utilize digital space as a medium for examining the interplay between reality and virtuality, embodied and digital identities"
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

    //left side, left front desk
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/Unrendered_MarieLisetteCropp/25.10.17.-Marie-cropp-2-1.jpg.avif`,
      width: 1.4,
      height: 1.8,
      position: [-7.15, 0.7, 1.6],   // e.g. on/near carousel A
      rotation: [0, 135, 0],
      clickable: true,
      plinthVisible: false,
      offsetClick: 0.0,
      text: "Image Screen",
      location: 'lobby',
      artworkInfo: {
        title: "Unrendered",
        artist: "Marie-Lisette Cropp",
        description: "A test artwork to demonstrate the info panel functionality. This description will be read aloud for accessibility."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

      //right side, middle front desk
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/SelfFinish_BeatriceElAsmar/SF_02.jpg.avif`,
      width: 1.8,
      height: 1.3,
      position: [-8.4, 0.8, -1.5],
      rotation: [0, 90, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      location: 'lobby',
      artworkInfo: {
        title: "Self-Finish",
        artist: "Beatrice El Asmar",
        description: "This series of self-portraits was created using slit scan technology, mostly known for its use for photo-finish in racing sports, thus reclaiming a patriarchal automation which judges, measures and commodifies linear speed and \‘progress\'. Subverting our expectations of how time and space occupy the photographic image, the work highlights how the supposedly linear progression of human rights, especially for cis and trans women, is being eroded to the extent that it is actually moving backwards. A fragmented portrait of one of the two female photo-finish operators in the UK, this work invites a different kind of embodied photographic seeing."
      },
      plinthVisible: false,
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

    /*
    this._registerArtwork(this.screenManager.addContentScreen({
      content: {
        title: "Artist Name",
        artist: "Chancery Rosewood",
        bio: "Long bio goes here...lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        images: [
          "https://picsum.photos/id/1011/900/900",
          "https://picsum.photos/id/1015/900/900",
          "https://picsum.photos/id/1025/900/900"
        ]
      },
      width: 2,
      height: 2.25,
      position: [-5, 1.4, -6],
      rotation: [0, 30, 0],
      offsetClick: .2,
      infoWidth: 1.6,
      infoHeight: 1.2,
      infoOffset: [0, -1.7, 0.55],
      clickableSize: [2.2, 2.2],
      clickable: true,
      plinthVisible: false,

      //transition
      transitionDuration: 0.35,
    }).screenMesh);
    //test model url
    */
    
    //3d models

    //entrance way
    const Experiment58 = import.meta.env.BASE_URL + "/art/Experimentn58-2PositioninSpace_MarieSaintYves/Eperiment58.glb";

    this.screenManager.addModel({
      url: Experiment58,
      position: [0, -1.0, 8.5],
      rotation: [0, -35, 0],
      normalizeTo: 2.0,
      clickable: true,
      onClick: (obj, hit) => console.log("Model clicked:", obj),
      text: "STATUE_01",
      textOffset: [0, -0.1, 0.9],
      hitboxSize: [2.0, 2.0, 2.0],
      offsetClick: -0.4,
      plinthVisible: false,
      playAnimation: "first",
      location: 'lobby',
      artworkInfo: {
        title: "Experiment n°58-2: Position in Space",
        artist: "Marie Saint-Yves",
        description: "An exploration of space, physical forces of the Earth and the theory of material agency. Binding air and helium with low materials (surival blankets, salvaged sack trolley, nylon thread), I aimed to challenge our perception of the World via a contrasting piece, engaging viewers' personal sensory experience while inviting them to take a step back from their daily lives. Interested in leaving work open to individual interpretations, I wonder: What's yours?"
      }
    }).then((modelRoot) => {
      this.statue = modelRoot;
      this._registerArtwork(modelRoot);
    }).catch(console.error);

    const a=import.meta.env.BASE_URL + "/art/test3d/8 Ultra High Quality Scan_low poly DRACO jpeg (1024).glb";
    //central coffee table
    this.screenManager.addModel({
    url: a,
    position: [.7, -.5, -4.5],
    rotation: [0, 35, 0],
    normalizeTo: 1.0,
    clickable: true,
    onClick: (obj, hit) => console.log("Model clicked:", obj),
    text: "STATUE_01",
    textOffset: [0, -0.1, 0.9],
    hitboxSize: [.5, 1.0, .5],
    offsetClick: -0.4,
    plinthVisible: false,
    playAnimation: "first",
    location: 'lobby',
    artworkInfo: {
      title: "Statue 01",
      artist: "Placeholder Sculptor",
      description: "A 3D sculptural work rendered in real-time. Rotate and explore the form from any angle."
    }
  }).then((modelRoot) => {
    this.statue = modelRoot;
    this._registerArtwork(modelRoot);
  }).catch(console.error);


    //left front desk
    const b=import.meta.env.BASE_URL + "public/art/LetMeEatCake_SuzannaTeal/LetMeEatCake01.glb";

  this.screenManager.addModel({
    url: b,
    position: [-6.7, .5, -3],
    rotation: [0, -90, 0],
    normalizeTo: 0.8,
    clickable: true,
    onClick: (obj, hit) => console.log("Model clicked:", obj),
    text: "STATUE_01",
    textOffset: [0, -0.5, 0.9],
    hitboxSize: [0.6, 1.4, 0.6],
    offsetClick: -0.0,
    plinthVisible: false,
    playAnimation: "first",
    location: 'lobby',
    artworkInfo: {
      title: "Statue 01",
      artist: "Placeholder Sculptor",
      description: "A 3D sculptural work rendered in real-time. Rotate and explore the form from any angle."
    }
  }).then((modelRoot) => {
    this.statue = modelRoot;
    this._registerArtwork(modelRoot);
  }).catch(console.error);



  this.screenManager.addModel({
    url: a,
    position: [4.8, 0, 3.8],
    rotation: [0, 235, 0],
    normalizeTo: 1.4,
    clickable: true,
    onClick: (obj, hit) => console.log("Model clicked:", obj),
    text: "STATUE_01",
    textOffset: [0, -0.1, 0.9],
    offsetClick: -0.1,
    hitboxSize: [1.0, 3.0, 1.0],
    plinthVisible: true,
    playAnimation: "first"
  }).then((modelRoot) => {
    // optional: store reference
    this.statue = modelRoot;
  }).catch(console.error);

 
  this.screenManager.addModel({
    url: a,
    position: [-4.8, 0, 3.8],
    rotation: [0, 135, 0],
    normalizeTo: 1.4,
    clickable: true,
    onClick: (obj, hit) => console.log("Model clicked:", obj),
    text: "STATUE_01",
    textOffset: [0, -0.1, 0.9],
    hitboxSize: [1.0, 3.0, 1.0],
    plinthVisible: true,
    playAnimation: "first"
  }).then((modelRoot) => {
    // optional: store reference
    this.statue = modelRoot;
  }).catch(console.error);

  //left of fireplace
this._registerArtwork(this.screenManager.addFluidContentScreen({
      location: 'lobby',
      content: {
        title: "No Longer Us",
        artist: "Jun Shya",
        bio: "By putting a mask on, we begin to play different versions of ourselves. Intrigued by the process of unbalancing composition through distinct colours, crackled textures, and seemingly incongruous references, this series of paintings explores the theme of reality versus illusion in relation to the coexistence of present and past. By capturing the intimate gesture of push and pull in a ballet performance, each dancer becomes a version of another. It reflects the idea that a different version of you exists in the mind of everyone who knows you. Curious images emerge through a process of patient layering and excavation. Parts of the human body and face are either left blank or slightly concealed, yet we, as viewers, are still able to make sense of them. ",
        images: [
          "public/art/NoLongerUs_JunShya/Jun-Shya-1-1.jpg",
          "https://picsum.photos/id/1015/900/900",
          "https://picsum.photos/id/1025/900/900"
        ]
      },
      width: 2,
      height: 2.25,
      position: [-4.6, 1.4, -6],
      rotation: [0, 30, 0],
      offsetClick: .2,
      infoWidth: 1.6,
      infoHeight: 1.2,
      infoOffset: [0, -1.7, 0.55],
      clickableSize: [2.2, 2.2],
      clickable: true,
      plinthVisible: false,

      //transition
      transitionDuration: 0.35,
    }).screenMesh);

    // Hide artworks that don't belong to the starting location
    // (runs after sync artworks; async models hide themselves on first transition)
    for (const entry of this._artworkRegistry) {
      const loc = entry.obj.userData.location;
      if (loc && loc !== this._currentLocation) {
        entry.obj.visible = false;
        (entry.obj.userData.associatedMeshes ?? []).forEach(m => { m.visible = false; });
      }
    }

  }



  

  update(dt) {
    //test rotation
    this.ball.rotation.y += dt * 0.6;

    // update focus cooldown
    this._focusCooldown = Math.max(0, this._focusCooldown - dt);

    const wasLocMoving = this.locations.isMoving;
    this.locations.update(dt);

    // goTo() may be called between frames (click handler), so isMoving can be true
    // before update() sees the false→true edge. Instead, detect a new transition by
    // checking whether _pendingLocation is out-of-sync with the current activeId.
    const justStarted = this.locations.isMoving && this._pendingLocation !== this.locations.activeId;
    const justArrived = wasLocMoving && !this.locations.isMoving;

    if (justStarted) {
      // Show destination artworks — camera hasn't arrived yet
      this._pendingLocation = this.locations.activeId;
      this._setLocationVisibility(this._pendingLocation, true);
    }

    if (justArrived && this._pendingLocation) {
      // Hide previous location artworks — camera has left
      // Skip if travelling to the same location (e.g. initial goTo on load)
      if (this._currentLocation !== this._pendingLocation) {
        this._setLocationVisibility(this._currentLocation, false);
      }
      this._currentLocation = this._pendingLocation;
      this._pendingLocation = null;
    }

    if (justArrived && this._pendingFocusIndex !== null) {
      const pidx = this._pendingFocusIndex;
      this._pendingFocusIndex = null;
      const pending = this._artworkRegistry[pidx];
      // Only focus if we actually arrived at the correct location
      if (pending && pending.obj.userData.location === this._currentLocation) {
        this._focusOnObj(pending.obj);
      }
    }

    // Sync controls orientation when a location transition finishes,
    // otherwise controls.update() would snap the camera back to the old direction.
    if (justArrived) {
      this.camera.rotation.order = "YXZ";
      this.controls.yawTotal = this.camera.rotation.y;
      this.controls.pitch = this.camera.rotation.x;
      this.controls.yawVel = 0;
      this.controls.pitchVel = 0;
    }

    // if not moving between locations and in idle focus state, allow controls to update (e.g. for auto-rotate or user input)
    if (!this.locations.isMoving && this._focusState === "idle") {
      this.controls.update(dt);
    }

    // update camera focus movement
    this.focus.update(dt);

    // state transitions after focus movement
    if (this._focusState === "focusing" && !this.focus.isMoving) {
      this._focusState = "focused";
    }
    if (this._focusState === "returning" && !this.focus.isMoving) {
      this._focusState = "idle";
      this._exitFocusMode();
    }
    
    // update tweens
    // iterate backwards in case any get removed mid-loop
    for (let i = this._tweens.length - 1; i >= 0; i--) {
      const t = this._tweens[i];
      t.update(dt);
      if (t.done) this._tweens.splice(i, 1);
    }

    // update fluid carousel sims
    this.screenManager.update(dt);
  }

  onResize() {
    // optional: any world-specific resize logic
  }

  _isInFocusMode() {
    return this.focus.isFocused || this.focus.isMoving; // either focused or returning
  }

  _enterFocusMode() {
    if (this._controlsSaved) return; // already in focus mode

    // save controls state so we can restore later
    this._controlsSaved = {
      autoRotate: this.controls.autoRotate,
      dragToLook: this.controls.dragToLook
    };

    // immediately stop any auto-rotation or dragging to prevent conflicts with focus movement
    this.controls.resetDrag();
    this.controls.dragToLook = false;
    this.controls.autoRotate = false;
  }

  _exitFocusMode() {
    if (!this._controlsSaved) return;

    // restore controls state
    this.controls.dragToLook = this._controlsSaved.dragToLook;
    this.controls.autoRotate = this._controlsSaved.autoRotate;

      // ✅ important: clear any stuck drag state
    this.controls.resetDrag();
    this._controlsSaved = null;
  }


  _focusOnObj(obj) {
    if (this._focusCooldown > 0) return;
    if (this.focus.isMoving) return;

    const target = obj.userData.focusTarget || obj;
    const revealTarget = obj.userData.revealTarget || obj;

    if (this._focusState === "idle") {
      this.focus.setHomeFromCurrent?.();
    }
    this._enterFocusMode();
    this._focusState = "focusing";
    this._focusCooldown = 0.2;

    if (this._focusedScreen && this._focusedScreen !== target) {
      this._animateReveal(this._focusedScreen, 0.0, 1.0, 0.25);
      this._animateReveal(this._lastRevealedScreen, 0.0, 1.0, 0.25);
    }

    this._focusedScreen = target;
    this._lastRevealedScreen = revealTarget;

    // Permanently reveal colour around this artwork in the environment
    const artworkWorldPos = new Vector3();
    target.getWorldPosition(artworkWorldPos);
    this.proximityReveal.addPermanentReveal(artworkWorldPos);

    if (this._focusedScreen !== this._lastfocusedScreen) {
      this._animateReveal(target, 1.0, 0.0, 0.4);
      this._animateReveal(revealTarget, 1.0, 0.0, 0.4);
      this._lastfocusedScreen = this._focusedScreen;
    }

    // Animate grayscale → colour — only if not already colourised
    const revealMat = revealTarget?.userData?.revealMaterial;
    const currentColor = revealMat?.uniforms?.uColorReveal?.value ?? 0;
    if (currentColor < 1.0) {
      this._animateColorReveal(revealTarget, currentColor, 1.0, 1.5);
    }

    this.focus.focusOn({ targetObject: target, distance: "fit", heightOffset: 0.0, duration: 0.7, padding: 1 });

    const info = obj.userData.artworkInfo;
    if (info) this.infoPanel.show(info);

    // Activate video if this is a film screen (stops any previously playing video)
    const video = this.screenManager.activateVideo(obj);
    if (video) this.infoPanel.showVideoControls(video);
    else       this.infoPanel.hideVideoControls();

    const idx = this._artworkRegistry.findIndex(r => r.obj === obj);
    if (idx !== -1) {
      this._currentArtworkIndex = idx;
      this.infoPanel.setActiveIndex(idx, this._artworkRegistry.length);
    }
  }

  _setLocationVisibility(locationId, visible) {
    for (const entry of this._artworkRegistry) {
      if (entry.obj.userData.location !== locationId) continue;
      if (!visible && entry.obj === this._focusedScreen) continue;
      entry.obj.visible = visible;
      (entry.obj.userData.associatedMeshes ?? []).forEach(m => { m.visible = visible; });
    }
  }

  _registerArtwork(mesh) {
    // For screens: focusTarget is the hitBox; for models: userData.hitBox is set
    const clickable = mesh.userData?.hitBox || mesh.userData?.focusTarget || mesh;
    const info = clickable.userData?.artworkInfo || mesh.userData?.artworkInfo;
    if (!info) return;
    // Propagate location and associatedMeshes from source mesh to the registered object
    if (clickable !== mesh) {
      if (clickable.userData.location === undefined) clickable.userData.location = mesh.userData.location ?? null;
      if (!clickable.userData.associatedMeshes) clickable.userData.associatedMeshes = mesh.userData.associatedMeshes ?? [];
    }
    this._artworkRegistry.push({ info, obj: clickable });
    this.infoPanel.setRegistry(this._artworkRegistry);
  }

  _navigateArtwork(dir) {
    // Only cycle through artworks in the current location (or always-visible null-location ones)
    const activeIndices = this._artworkRegistry
      .map((entry, i) => ({ entry, i }))
      .filter(({ entry }) => {
        const loc = entry.obj.userData.location;
        return loc === this._currentLocation || loc === null;
      })
      .map(({ i }) => i);

    if (!activeIndices.length) return;

    const posInActive = activeIndices.indexOf(this._currentArtworkIndex);
    const nextPos = posInActive === -1
      ? 0
      : ((posInActive + dir) % activeIndices.length + activeIndices.length) % activeIndices.length;

    this._navigateToIndex(activeIndices[nextPos]);
  }

  _navigateToIndex(idx) {
    const entry = this._artworkRegistry[idx];
    if (!entry) return;

    const targetLocation = entry.obj.userData.location;
    const needsTravel = targetLocation && targetLocation !== this._currentLocation;

    if (needsTravel) {
      // Exit focus mode immediately — location transition takes over the camera
      if (this._focusState !== "idle") {
        this.screenManager.deactivateVideo(this._focusedScreen);
        this.infoPanel.hide();
        this.infoPanel.hideVideoControls();
        this._animateReveal(this._focusedScreen, 0.0, 1.0, 0.15);
        this._animateReveal(this._lastRevealedScreen, 0.0, 1.0, 0.15);
        this._focusedScreen = null;
        this._lastRevealedScreen = null;
        this._exitFocusMode();
        this._focusState = "idle";
      }
      this.locations.goTo(targetLocation, { duration: 3.0 });
      this._pendingFocusIndex = idx;
      return;
    }

    this._focusOnObj(entry.obj);
  }

  goToLocation(id, options = {}) {
    // If currently focused on an artwork, clean up focus state before travelling
    if (this._focusState !== "idle") {
      this.screenManager.deactivateVideo(this._focusedScreen);
      this.infoPanel.hide();
      this.infoPanel.hideVideoControls();
      this._animateReveal(this._focusedScreen, 0.0, 1.0, 0.15);
      this._animateReveal(this._lastRevealedScreen, 0.0, 1.0, 0.15);
      this._focusedScreen = null;
      this._lastRevealedScreen = null;
      this._exitFocusMode();
      this._focusState = "idle";
      // Stop any in-progress focus tween and clear saved home so returnHome
      // won't snap back to the old location after travelling
      this.focus.isMoving = false;
      this.focus.isFocused = false;
      this.focus._hasHome = false;
    }
    this.locations.goTo(id, options);
  }

  _setReveal(mesh, v) {
    const mat = mesh?.userData?.revealMaterial;
    if (!mat) return;
    mat.uniforms.uReveal.value = v;
     console.log("Set reveal", v, "on", mesh, "material", mat);
  }

  _animateReveal(mesh, from, to, duration = 0.35) {
    if (!mesh) return;
    if (mesh.userData.skipReveal) return;

    // cancel existing reveal tweens on this mesh
    this._tweens = this._tweens.filter(t => t.mesh !== mesh);

    const tween = makeTween01({
      from,
      to,
      duration,
      onUpdate: (v) => this._setReveal(mesh, v)
    });

    tween.mesh = mesh;
    this._tweens.push(tween);
  }

  _setColorReveal(mesh, v) {
    const mat = mesh?.userData?.revealMaterial;
    if (!mat?.uniforms?.uColorReveal) return;
    mat.uniforms.uColorReveal.value = v;
  }

  _animateColorReveal(mesh, from, to, duration = 1.2) {
    if (!mesh) return;
    this._tweens = this._tweens.filter(t => t.colorMesh !== mesh);
    const tween = makeTween01({
      from,
      to,
      duration,
      onUpdate: (v) => this._setColorReveal(mesh, v)
    });
    tween.colorMesh = mesh;
    this._tweens.push(tween);
  }


  

}

