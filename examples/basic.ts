import { DockerCompose } from "docker-compose-ts";

const dc = DockerCompose.fromObject({
  services: {
    redis: {
      image: "redis:latest",
      ports: ["6379"],
      healthcheck: {
        test: "redis-cli ping",
      },
    },
  },
});

console.log(dc.toYAML());
console.log("---");
console.log(dc.toString());
console.log("---");
console.log(dc.toJSON({ spaces: 2 }));
