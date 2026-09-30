module.exports = {
  apps: [
    {
      name: "studyabroad-web",
      cwd: "/data/studyabroad/apps/web",
      script: "node_modules/next/dist/bin/next",
      args: "start --hostname 127.0.0.1 --port 3000",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
      },
      max_memory_restart: "512M",
    },
    {
      name: "studyabroad-outbox",
      cwd: "/data/studyabroad/apps/web",
      script: "scripts/outbox-worker.mjs",
      interpreter: "node",
      interpreter_args: "--env-file=.env.local",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
