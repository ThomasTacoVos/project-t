import { Component, OnInit, OnDestroy, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-three-scene',
  templateUrl: './three-scene.component.html',
  styleUrls: []
})
export class ThreeSceneComponent implements OnInit, OnDestroy {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Ensure we are in the browser platform
    if (isPlatformBrowser(this.platformId)) {
      // Set up the scene
      this.scene = new THREE.Scene();

      // Set up the camera
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

      // Set up the WebGL renderer
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.el.nativeElement.appendChild(this.renderer.domElement);

      // Create a cube
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      this.cube = new THREE.Mesh(geometry, material);
      this.scene.add(this.cube);

      // Set the camera position
      this.camera.position.z = 5;

      // Start the animation loop
      this.animate();

      // Add resize event listener
      window.addEventListener('resize', this.onResize.bind(this));
    }
  }

  ngOnDestroy(): void {
    // Only dispose if the renderer is defined
    if (this.renderer) {
      this.renderer.dispose();
    }
  
    // Clean up event listeners safely
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize.bind(this));
    }
  }
  

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    // Rotate the cube
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }

  private onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}
