import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import * as THREE from 'three';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild ('rendererContainer', {static: false}) rendererContainer: ElementRef;
  public renderer = new THREE.WebGLRenderer({ alpha: true });
  public camera = null;
  public scene = null;
  public geometry = null;
  public material = null;
  public mesh = null;

  constructor(private _translateService: TranslateService) {
  }

  ngOnInit(): void {
    this._translateService.use(environment.defaultLocale);
  }

  ngAfterViewInit(): void {
    this.initMeshAnimation();
  }

  initMeshAnimation(): void {
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.camera.position.z = 6;
    this.scene = new THREE.Scene();
    this.geometry = new THREE.SphereGeometry( 1, 2, 2 );
    this.material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } );
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.mesh );
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
    this.meshScalingInit();
  }

  animate(): void {
    window.requestAnimationFrame(this.animate.bind(this));
    this.mesh.rotation.x += 0.005;
    this.mesh.rotation.y += 0.005;
    this.renderer.render(this.scene, this.camera);
  }

  meshScalingInit(): void {
    fromEvent(document.body, 'mousemove').subscribe(() => {
      if (Math.random() < 0.2) {
        this.mesh.scale.x = Math.random() + Math.random() * 1.5;
        this.mesh.scale.y = Math.random() + Math.random() * 1.3;
        this.mesh.scale.z = Math.random() + Math.random() * 1.1;
        this.mesh.rotation.z += 0.5;
        this.renderer.render(this.scene, this.camera);
      }
    });
  }

  onResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }
}
