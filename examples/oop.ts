import { DockerCompose, Service } from "docker-compose-ts";

const dc = DockerCompose.fromObject({
  version: "3",
});

dc.addService(
  "redis",
  Service.new({
    image: "redis:latest",
    ports: ["6379"],
    healthcheck: {
      test: "redis-cli ping",
    },
  }),
);

console.log(dc.toYAML());
console.log("---");
console.log(dc.toString());
console.log("---");
console.log(dc.toJSON({ spaces: 2 }));
