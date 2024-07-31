export default function HomePage() {
  return (
    <div className="py-20">
      <section className="mb-20">
        <h2 className="section-title neon-text">Welcome to the Matrix</h2>
        <p className="text-foreground text-lg mb-6">
          Dive into the realm of the Matrix, where the code defines reality and the dark theme rules. Experience a journey through expertly crafted design and transitions that push the boundaries of modern web aesthetics.
        </p>
      </section>
      <section className="matrix-grid">
        <div className="card matrix-border">
          <h3 className="card-title neon-text">Feature 1</h3>
          <p className="card-content">
            Explore the depths of our Matrix-themed features. Every interaction is designed to captivate and immerse you in this digital experience.
          </p>
        </div>
        <div className="card matrix-border">
          <h3 className="card-title neon-text">Feature 2</h3>
          <p className="card-content">
            Our design transitions are seamless and smooth, providing an experience that feels both natural and technologically advanced.
          </p>
        </div>
        <div className="card matrix-border">
          <h3 className="card-title neon-text">Feature 3</h3>
          <p className="card-content">
            Each feature is meticulously crafted to offer a unique glimpse into the world of the Matrix, showcasing our expertise in design and development.
          </p>
        </div>
      </section>
    </div>
  );
}
