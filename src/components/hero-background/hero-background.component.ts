import {
  Component,
  type ElementRef,
  type OnDestroy,
  type OnInit,
  ViewChild,
} from '@angular/core';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

@Component({
  selector: 'app-hero-background',
  template: `<canvas
    #canvas
    class="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-950 to-blue-800 z-0"
  ></canvas>`,
  styles: [],
})
export class HeroBackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId!: number;
  private particles: Particle[] = [];
  private resizeObserver!: ResizeObserver;

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    this.setCanvasDimensions();
    this.initParticles();
    this.animate();

    this.resizeObserver = new ResizeObserver(() => {
      this.setCanvasDimensions();
      this.initParticles();
    });
    this.resizeObserver.observe(canvas);
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private setCanvasDimensions(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.8; // 80vh
  }

  private initParticles(): void {
    const canvas = this.canvasRef.nativeElement;
    this.particles = [];
    const numberOfParticles = Math.min(
      100,
      Math.floor((canvas.width * canvas.height) / 10000)
    );

    for (let i = 0; i < numberOfParticles; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
      });
    }
  }

  private animate(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    for (const particle of this.particles) {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Handle boundaries
      if (particle.x > canvas.width) particle.x = 0;
      else if (particle.x < 0) particle.x = canvas.width;

      if (particle.y > canvas.height) particle.y = 0;
      else if (particle.y < 0) particle.y = canvas.height;

      // Draw particle
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Connect particles with lines
    this.connectParticles();

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  private connectParticles(): void {
    const maxDistance = 150;

    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
          this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
          this.ctx.stroke();
        }
      }
    }
  }
}
