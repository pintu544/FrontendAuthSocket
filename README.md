<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
 
  <link rel="stylesheet" href="https://stackedit.io/style.css" />
</head>

<body class="stackedit">
  <div class="stackedit__html"><h1 id="fruits-click-game-dashboard---frontend">Fruits Click Game Dashboard - Frontend</h1>
<p>This is the <strong>frontend</strong> portion of the Fruits Click Game Dashboard, a real-time dashboard application where players can engage in a “Banana Click” game and track their ranking in real-time. Admins can manage players and monitor player activity.</p>
<h2 id="features">Features</h2>
<ol>
<li><strong>User Authentication</strong>: Login and registration with JWT-based authentication.</li>
<li><strong>Admin Dashboard</strong>:
<ul>
<li>User management (create, edit, delete players).</li>
<li>Blocking and unblocking users.</li>
<li>Viewing active users with real-time updates on banana click counts.</li>
</ul>
</li>
<li><strong>Player Dashboard</strong>:
<ul>
<li>Banana click button to increase count.</li>
<li>Real-time click count updates.</li>
<li>Rank page with real-time ranking of players based on click counts.</li>
</ul>
</li>
<li><strong>Real-Time Updates</strong>: Integrated <a href="http://Socket.io">Socket.io</a> to ensure click counts and rankings update live.</li>
</ol>
<h2 id="tech-stack">Tech Stack</h2>
<ul>
<li><strong>React</strong> - Frontend framework</li>
<li><strong><a href="http://Socket.io">Socket.io</a></strong> - Real-time communication</li>
<li><strong>JWT</strong> - Authentication and authorization</li>
<li><strong>CSS</strong> - Styling</li>
</ul>
<h2 id="setup-and-installation">Setup and Installation</h2>
<h3 id="clone-the-repository">Clone the Repository</h3>
<p>bash</p>
<pre><code>`git clone https://github.com/pintu544/FrontendAuthSocket.git
cd FrontendAuthSocket` 
</code></pre>
<h3 id="install-dependencies">Install Dependencies</h3>
<p>bash</p>
<pre><code>
`npm install` 
</code></pre>
<h3 id="environment-variables">Environment Variables</h3>
<p>Create a <code>.env</code> file in the project root and configure the following environment variables:</p>
<pre><code>
`REACT_APP_BACKEND_URL=http://your-backend-url
REACT_APP_SOCKET_URL=http://your-socket-url` 
</code></pre>
<h3 id="running-the-application">Running the Application</h3>
<p>To start the development server, run:</p>
<p>bash</p>
<pre><code>
`npm run  dev` 
</code></pre>
<p>The frontend should be running at <code>http://localhost:5173</code>.</p>
<h3 id="live-demo">Live Demo</h3>
<p>The live frontend demo is available <a href="https://registrationloginsocket.netlify.app/">here</a>.</p>
<h2 id="project-structure">Project Structure</h2>
<p><code>FrontendAuthSocket/ ├── public/ # Public assets ├── src/ │ ├── assets/ │ ├── pages/ # Page components (register,login,Admin Dashboard, Player Dashboard) │ ├── services/ # API services and utilities │ ├── context/ # Socket.io client configuration ├── styles/ # css files │ └── App.js # Main app component └── package.json</code></p>
</div>
</body>

</html>
