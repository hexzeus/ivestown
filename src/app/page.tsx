export default function HomePage() {
  return (
    <div className="py-20">
      <section className="mb-20">
        <h2 className="section-title neon-text">Welcome</h2>
        <p className="text-foreground text-lg mb-6">
          Welcome to our super dark goth Matrix-themed single-page website built with TypeScript and Tailwind CSS. This is a simple example of how to structure your application using only the necessary files.
        </p>
      </section>
      <section className="mb-20">
        <h2 className="section-title neon-text">About Us</h2>
        <p className="text-foreground text-lg mb-6">
          We are a team of passionate developers committed to creating amazing web experiences. Our goal is to provide users with the best possible experience through clean and efficient design.
        </p>
      </section>
      <section className="mb-20">
        <h2 className="section-title neon-text">Contact</h2>
        <form className="max-w-lg mx-auto">
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-2 border border-primary rounded bg-background text-foreground matrix-border"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border border-primary rounded bg-background text-foreground matrix-border"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="message"
              placeholder="Message"
              className="w-full p-2 border border-primary rounded bg-background text-foreground matrix-border"
              rows={4}
            ></textarea>
          </div>
          <button type="submit" className="btn-primary w-full">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
