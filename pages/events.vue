<template>
  <div class="events-container">
    
    <div class="hero-section">
      
      <div class="hero-animation"></div>
      <div class="hero-title-container">
        
        <p class="hero-title">Our <span class="highlight">Technical Events</span></p>
      </div>
    </div>

    
    <div class="events-section">
      <div class="events-content">
        <div class="events-title-container">
          <p class="events-content-title highlight">EVENTS</p>
          <p class="events-content-description">
            Our FOSS Chapter unites people through impactful and captivating events, driven by a passion for open knowledge and collaborative development. We think that learning is most effective when it is shared, and our events embody that spirit of growth. Our calendar is jam-packed with chances to learn, develop, and contribute, whether it's a tech talk, a hands-on workshop, or a group coding event.
          </p>
        </div>
      </div>
    </div>

    
    <div class="timeline-container">
      <svg class="timeline-svg">
        <path
          d="M100,0 C100,150 300,150 300,300 C300,450 500,450 500,300 C500,150 700,150 700,300 C700,450 900,450 900,300 C900,150 1100,150 1100,300"
          fill="transparent"
          stroke="#999"
          stroke-width="4"
          stroke-dasharray="8,8"
        />
      </svg>

      
      <div class="event-point" style="left: 130px; top: 100px;"></div>
      <div class="event-box" style="left: -80px; top: 140px;">
        <div class="event-title">TechCanvas</div>
        <div>Feb 2024 – Technical event by FOSS Club.</div>
      </div>

      <div class="event-point" style="left: 300px; top: 300px;"></div>
      <div class="event-box" style="left: 240px; top: 190px;"><div class="event-title">Women's Day</div><div>Mar 2024 – AI Prompt event with 105 students.</div></div>

      <div class="event-point" style="left: 475px; top: 350px;"></div>
      <div class="event-box" style="left: 440px; top: 410px;"><div class="event-title">Ideathon</div><div>Mid Mar 2024 – Intercollege innovation event.</div></div>

      <div class="event-point" style="left: 700px; top: 300px;"></div>
      <div class="event-box" style="left: 640px; top: 190px;"><div class="event-title">Cipher Vault</div><div>Aug 2024 – Cryptography technical event.</div></div>

      <div class="event-point" style="left: 875px; top: 350px;"></div>
      <div class="event-box" style="left: 840px; top: 410px;"><div class="event-title">Make-A-thon</div><div>Sept 2024 – Intercollege creative build event.</div></div>

      <div class="event-point" style="left: 1100px; top: 300px; background-color: #28a745;"></div>
      <div class="event-box" style="left: 1040px; top: 190px;"><div class="event-title">Upcoming</div><div><strong>Git:</strong> Hands-on Git & collaboration.</div><div><strong>IOT:</strong> Real-world IoT guided sessions.</div></div>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;
}
.hero-animation {
  width: 100%;
  background: url('https://i.giphy.com/3o6Zt0EiSgr1cWE6WY.webp');
  height: 300px;
  background-size: cover;
}
.hero-title-container {
  font-size: 40px;
  font-weight: bold;
  margin-top: -240px;
  text-shadow: 2px 2px black;
}
.hero-title .highlight {
  color: #007bff;
}

.events-section {
  background-color: var(--color-primary, #007bff);
}
.events-content {
  padding: 48px;
  border-radius: 0.5rem;
  background-color: var(--color-primary, #007bff);
  border: 1px solid var(--color-border-primary, #ccc);
  margin: 0 200px;
  transform: translateY(-40px);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.events-title-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.events-content-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}
.events-content-description {
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  color: #d2cccc;
}

.timeline-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: auto;
}
.timeline-svg {
  width: 100%;
  height: 600px;
}
.event-point {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #007bff;
  border: 3px solid white;
}
.event-box {
  position: absolute;
  width: 200px;
  background: hsl(210, 53%, 58%);
  padding: 10px 14px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
}
.event-title {
  font-weight: bold;
  margin-bottom: 4px;
}
</style>
